// 当前模块对API进行统一管理
import requests from "./request.js"
import mockRequest from './mockRequest.js'

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
// 发请求，并返回，返回的是Promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// search的接口，请求地址('/api/list)，请求方式post，需要带参数
// 注意：给服务器传递的params参数，至少是一个空对象（默认参数）
export const reqSearch = (params) => requests({url: '/list', method: 'post', data: params})
// 产品详情的接口，请求地址'/item/{skuId}'
export const reqDetail = (skuId) => requests({url: `/item/${skuId}`, method: 'get'})
// 添加购物车成功的接口，请求地址'/api/cart/addToCart/{skuId}/{skuNum}'，POST请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})
// 购物车的接口，请求地址'/api/cart/cartList'，GET请求
export const reqCartList = () => requests({url: '/cart/cartList', method: 'get'})
// 从购物车中删除商品的接口，请求地址/api/cart/deletCart/{skuId}，DELETE请求
export const reqDeletCart = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
// 修改商品选中状态的接口，请求地址/api/cart/checkCart/{skuId}/{isChecked}，请求方式GET
export const reqChecked = (skuId, isChecked) => requests({url: `cart/checkCart/${skuId}/${isChecked}`, method: 'get'})
// 获取验证码的接口，请求地址/api/user/passport/sendCode/{phone}，get请求
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})
// 注册的接口，请求地址/api/user/passport/register，post方法，携带参数phone、code、password
export const reqUserRegister = (data) => requests({url: '/user/passport/register', data, method: 'post'})
// 登录的接口，请求地址/api/user/passport/login，post方法，携带参数phone、password
export const reqUserLogin = (data) => requests({url: '/user/passport/login', data, method: 'post'})
// 获取用户信息[需要带着token向服务器要数据]，请求地址：/api/user/passport/auth/getUserInfo，get方法
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})
// 退出登录的接口，请求地址：/api/user/passport/logout，get方法
export const reqLogout = () => requests({url: '/user/passport/logout', method: 'get'})
// 获取用户地址信息的接口，请求地址：/api/user/userAddress/auth/findUserAddressList，get方法
export const reqAddressInfo = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})
// 获取用户交易订单的接口，请求地址：/api/order/auth/trade，get方法
export const reqOrderInfo = () => requests({url: '/order/auth/trade', method: 'get'})
// 提交订单的接口，请求地址：/api/order/auth/submitOrder?tradeNo={tradeNo}，post方法
export const reqSubmitOrder = (tradeNo, data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post'})
// 获取支付信息的接口，请求地址：/api/payment/weixin/createNative/{orderId}，get方法
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})
// 获取订单支付卿凯的接口，请求地址：/api/payment/weixin/queryPayStatus/{orderId}，get方法
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})



// 轮播图的接口
export const reqBanner = () => mockRequest.get('/banner')
// floor的接口
export const reqFloor = () => mockRequest.get('/floor')

