// 登录与注册的仓库

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '../api/index'
import { setToken, getToken, removeToken } from '../utils/token'

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const actions = {
    // 获取验证码
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone)
        if(result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async userRegister({commit}, user) { // eslint-disable-line no-unused-vars
        let result = await reqUserRegister(user)
        if(result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    /*
        登录(token)，token一般称为令牌，是内容唯一的一个字符串，用于向服务器要数据，登录之后，
        服务器会返回用户唯一的token，之后不管跳转到哪一个页面，都会通过token获取到用户的数据
        注意：vuex仓库中的数据不是持久化的，一刷新就没了
    */ 
    async userLogin({commit}, data) { 
        let result = await reqUserLogin(data)
        if(result.code === 200) {
            commit('USERLOGIN', result.data.token)
            // 将token持久化存储(如果只存到vuex中，一刷新就没了)
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        if(result.code === 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userlogout({commit}) {
        // 向服务器发请求，请求清除用户登录数据
        let result = await reqLogout()
        if(result.code === 200) {
            // actions中不能操作state，要到mutations中操作
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        // 把仓库中和localStorage中的token清除
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}