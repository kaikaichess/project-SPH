// Home组件的小仓库

import { reqCategoryList, reqBanner, reqFloor } from "../api/index"

const state = {
    // state中的数据初始值要根据服务器返回值初始化
    categoryList: [],
    banner: [],
    floor: []
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if(result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}) {
        let result = await reqBanner()
        if(result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取首页floor的数据
    async getFloorList({commit}) {
        let result = await reqFloor()
        if(result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const mutations = {
    // 这里形参categoryList其实就是actions中传过来的result.data
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, banner) {
        state.banner = banner
    },
    GETFLOORLIST(state, floor) {
        state.floor = floor
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}