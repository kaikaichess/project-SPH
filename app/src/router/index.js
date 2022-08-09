// 配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import HomeIndex from '../pages/Home/HomeIndex'
import LoginIndex from '../pages/Login/LoginIndex'
import SearchIndex from '../pages/Search/SearchIndex'
import RegisterIndex from '../pages//Register/RegisterIndex'

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
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: HomeIndex,
            meta: {show: true}
        },
        {
            path: '/login',
            component: LoginIndex,
            meta: {show: false}
        },
        {
            name: 'search',
            path: '/search/:keyWord',
            component: SearchIndex,
            meta: {show: true}
        },
        {
            path: '/register',
            component: RegisterIndex,
            meta: {show: false}
        },
        // 重定向，在项目跑起来的时候，访问/，立马定向到主页
        {
            path: '/',
            redirect: '/home'
        }

    ]
})