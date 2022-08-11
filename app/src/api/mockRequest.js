// 对于axios进行二次封装

import axios from 'axios'

// 引入nprogress进度条
import nprogress from 'nprogress'
// star方法代表加载开始，done方法代表加载结束
// 引入进度条相关样式
import 'nprogress/nprogress.css'

// 利用axios对象的方法create创建一个axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径中会出现mock
    baseURL: '/mock',
    // 代表请求超时的时间(毫秒)
    timeout: 5000,
})

// 请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事
requests.interceptors.request.use((config) => {
    // 进度条开始加载
    nprogress.start()
    // config是一个配置对象，其中有一个header(请求头)属性很重要
    return config
})
// 响应拦截器：服务器返回数据后，响应拦截器可以监测到，可以做一些事
requests.interceptors.response.use((res) => {
    // 进度条加载完毕
    nprogress.done()
    // 服务器响应成功的回调
    return res.data
}, () => {
    // 服务器响应失败的回调
    return Promise.reject(new Error('faile')) // 终止Promise链
})

// 对外暴露
export default requests