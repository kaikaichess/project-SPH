// 引入mockjs
import Mock from 'mockjs'
// 把要用到的JSON数据格式引入(webpack默认对外暴露图片、JSON，所以可以直接引入)
import banner from './banner'
import floor from './floor'

// mock数据: Mock对象身上有一个mock方法，要传递两个参数，第一个是参数请求地址，第二个是请求数据
Mock.mock('/mock/banner', {code: 200, data: banner})
Mock.mock('/mock/floor', {code: 200, data: floor})