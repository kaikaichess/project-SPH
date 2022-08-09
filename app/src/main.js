import Vue from 'vue'
import App from './App.vue'

// 将三级联动组件注册为全局组件
import TypeNavIndex from './components/TypeNav/TypeNavIndex'
// 第一个参数是这个全局组件的名字，第二个参数是要注册的组件
Vue.component(TypeNavIndex.name, TypeNavIndex)

// 测试请求数据
import {reqCategoryList} from './api/index'
reqCategoryList()

// 引入vuex仓库store
import store from './store/index'

Vue.config.productionTip = false

// 引入路由
import router from './router'

new Vue({
  render: h => h(App),
  // 注册路由（组件身上多了$router和$route属性）
  router,
  // 注册仓库（组件身上多了$store属性）
  store
}).$mount('#app')
