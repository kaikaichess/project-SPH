// 当前模块对API进行统一管理
import requests from "./request.js"
import mockRequest from './mockRequest.js'

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
// 发请求，并返回，返回的是Promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// 轮播图的接口
export const reqBanner = () => mockRequest.get('/banner')
// floor的接口
export const reqFloor = () => mockRequest.get('/floor')
