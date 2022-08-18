import Vue from 'vue'
import App from './App.vue'

// 将三级联动组件注册为全局组件
import TypeNavIndex from './components/TypeNav/TypeNavIndex'
// 第一个参数是这个全局组件的名字，第二个参数是要注册的组件
Vue.component(TypeNavIndex.name, TypeNavIndex)

// 将轮播图组件注册为全局组件
import CarouselIndex from './components/Carousel/CarouselIndex'
// 第一个参数是这个全局组件的名字，第二个参数是要注册的组件
Vue.component(CarouselIndex.name, CarouselIndex)

// 将分页器组件注册为全局组件
import PaginationIndex from './components/Pagination/PaginationIndex'
// 第一个参数是这个全局组件的名字，第二个参数是要注册的组件
Vue.component(PaginationIndex.name, PaginationIndex)

// 注册button和MessageBox element-ui组件
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入vuex仓库store
import store from './store/index'

// 引入mockServe.js
import '../src/mock/mockServe.js'

// 引入swiper样式
import 'swiper/css/swiper.css';

// 引入所有的请求数据接口
import * as API from './api/index'

Vue.config.productionTip = false

// 引入路由
import router from './router'

new Vue({
  render: h => h(App),
  // 注册路由（组件身上多了$router和$route属性）
  router,
  // 注册仓库（组件身上多了$store属性）
  store,
  beforeCreate() {
    // 配置全局事件总线$bus
    Vue.prototype.$bus = this
    // 将引入的接口函数放到vm的原型对象上形成方法，便于调用
    Vue.prototype.$API = API
  }
}).$mount('#app')
