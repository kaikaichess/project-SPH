import { reqCartList, reqDeletCart,reqChecked } from "../api/index"

const state = {
    cartList: []
}
const actions = {
    // 获取购物车列表
    async getCarList({commit}) {
        let result = await reqCartList()
        if(result.code === 200) {
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车商品
    async deleteCart({commit}, skuId) { // eslint-disable-line no-unused-vars
        let result = await reqDeletCart(skuId)
        if(result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车商品选中状态
    async updateCheck({commit}, {skuId, isChecked}) { // eslint-disable-line no-unused-vars
        let result = await reqChecked(skuId, isChecked)
        if(result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject('faile')
        }
    },
    // 删除购物车中所有的选中商品
    deleteAllCheckedCart({dispatch, getters}) {
        // 准备一个数组用于处理删除选中商品后的返回值
        let PromiseAll = []
        // 获取购物车中的商品数据
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : ''
            // 将每一次返回的删除结果(Promise对象)存入数组中
            PromiseAll.push(promise)
        })
        // 返回删除的结果
        return Promise.all(PromiseAll)
    },
    // 修改全选
    updateAllCartChecked({dispatch, state}, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise =  dispatch('updateCheck', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        return state.cartList = cartList || []
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}