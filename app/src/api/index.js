// 当前模块对API进行统一管理
import requests from "./request.js"
import mockRequest from './mockRequest.js'

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
// 发请求，并返回，返回的是Promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 产品详情的接口，请求地址'/item/{skuId}'
export const reqDetail = (skuId) => requests.request({url: `/item/${skuId}`, method: 'get'})

// 轮播图的接口
export const reqBanner = () => mockRequest.get('/banner')
// floor的接口
export const reqFloor = () => mockRequest.get('/floor')

// search的接口，请求地址('/api/list)，请求方式post，需要带参数
// 注意：给服务器传递的params参数，至少是一个空对象（默认参数）
export const reqSearch = (params) => requests({url: '/list', method: 'post', data: params})
