// 引入路由组件(一级路由)
// import HomeIndex from '../pages/Home/HomeIndex'
import LoginIndex from '../pages/Login/LoginIndex'
import SearchIndex from '../pages/Search/SearchIndex'
import RegisterIndex from '../pages//Register/RegisterIndex'
import DetailIndex from '../pages/Detail/DetailIndex'
import AddCarSuccess from '../pages/AddCartSuccess/AddCartSuccess'
import ShopCart from '../pages/ShopCart/ShopCart'
import TradeIndex from '../pages/Trade/TradeIndex'
import PayIndex from '../pages/Pay/PayIndex'
import PaySuccessIndex from '../pages/PaySuccess/PaySuccessIndex'
import CenterIndex from '../pages/Center/CenterIndex'
// 引入二级路由
import MyOrder from '../pages/Center/MyOrder/MyOrder'
import GroupIndex from '../pages/Center/Group/GroupIndex'


export default [
    {
        path: '/home',
        // 路由懒加载，在访问该页面时才会加载该路由
        component: () => import('../pages/Home/HomeIndex'),
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
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCarSuccess,
        meta: {show: true}
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: '/trade',
        component: TradeIndex,
        meta: {show: true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 如果要去交易页，必须是从购物车而来，或者是从pay页面返回
            if(from.path === '/shopcart'||from.path === '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: PayIndex,
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            if(from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccessIndex,
        meta: {show: true}
    },
    {
        path: '/center',
        component: CenterIndex,
        meta: {show: true},
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'group',
                component: GroupIndex
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马定向到主页
    {
        path: '/',
        redirect: '/home'
    }
]