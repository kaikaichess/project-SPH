import { reqDetail } from '../api/index'

const state = {
    detail: {}
}
const actions = {
    async getDetail({commit}, skuId) {
        let result = await reqDetail(skuId)
        if(result.code === 200) {
            commit('GETDETAIL', result.data)
        }
    }
}
const mutations = {
    GETDETAIL(state, detail) {
        state.detail = detail
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}