// Search组件的小仓库

import { reqSearch } from "../api"

const state = {
    searchList: {}
}
const actions = {
    // 获取search组件数据
    // params形参是dispatch时传递过来的，这里我们设置它的默认值为空对象
    async getSearch({commit}, params={}) {
        let result = await reqSearch(params)
        if(result.code === 200) {
            commit('GETSEARCH',result.data)
        }
    }
}
const mutations = {
    GETSEARCH(state, searchList) {
        state.searchList = searchList
    }
}
// 用于简化仓库中的数据，类似于计算属性
const getters = {
    // 这里的state是当前search仓库中的state，不是大仓库index中的state
    goodsList(state) {
        // 如果网速慢，组件开始遍历但数据还没回来，要让数据为空数组，如果不指定空数组，数据没回来遍历的就是undefined，会报错
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}