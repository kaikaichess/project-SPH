// Home组件的小仓库

import { reqCategoryList } from "../api/index"

const state = {
    // state中的数据初始值要根据服务器返回值初始化
    categoryList: []
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if(result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    }
}
const mutations = {
    // 这里形参categoryList其实就是actions中传过来的result.data
    CATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}