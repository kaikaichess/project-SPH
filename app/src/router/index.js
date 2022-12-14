// 配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../router/routes'
import store from '../store/index'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter.prototype上的push和replace方法保存一份,因为最后实现跳转还是要靠原本的push和replace方法
// 注意：push和replace方法原来的上下文是VueRouter的实例对象，所以在调用originPush时也要保证这一点
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push和replace方法，并且需要传参
// location参数，告诉原来的push方法向哪里跳转以及传递哪些参数
// 为保证originPush的上下文为VueRouter的实例，所以通过call函数对originPush的上下文指定
// resolve和reject参数用来处理Promise，如果传递了resolve和reject则利用call将其传递，若没有传递resolve和rejec或仅传递了一个，则手动补上
VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if(resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior() {
        // y:0代表路由跳转之后，滚动条在最上方
        return {y: 0}
    }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    // 用户信息，注意不能直接判断userInfo因为userInfo最少是一个空对象，空对象也是true
    let name = store.state.user.userInfo.name
    if(token) {
        // 用户已经登录了就不能再去登录页面了
        if(to.path == '/login') {
            next('/home')
        } else {
            // 用户登陆了但是去的不是login
            // 如果已有用户信息
            if(name) {
                next()
            } else {
                // 没有用户信息，派发action获取用户信息后再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了，清除token
                    await store.dispatch('userlogout')
                    // 回到登录页面重新登录
                    next('/login')
                }
            }
            
        }
    } else {
        // 未登录: 不能去交易相关页面、支付相关页面、个人中心，如果去会跳转到登录页面，去其他页面则放行
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
            // 把未登录时想去却没去成的信息存储在地址栏中
            next('/login?redirect='+toPath)
        } else {
            next()
        }
    }
})

export default router