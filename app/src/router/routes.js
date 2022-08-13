// 引入路由组件
import HomeIndex from '../pages/Home/HomeIndex'
import LoginIndex from '../pages/Login/LoginIndex'
import SearchIndex from '../pages/Search/SearchIndex'
import RegisterIndex from '../pages//Register/RegisterIndex'
import DetailIndex from '../pages/Detail/DetailIndex'

export default [
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
        path: '/search/:keyword?',
        component: SearchIndex,
        meta: {show: true}
    },
    {
        path: '/register',
        component: RegisterIndex,
        meta: {show: false}
    },
    {
        path: '/detail/:skuId',
        component: DetailIndex,
        meta: {show: true}
    },
    // 重定向，在项目跑起来的时候，访问/，立马定向到主页
    {
        path: '/',
        redirect: '/home'
    }

]