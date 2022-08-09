// 当前模块对API进行统一管理
import requests from "./request"

// 三级联动的接口
// /api/product/getBaseCategoryList  GET  无参数
// 发请求，并返回，返回的是Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
