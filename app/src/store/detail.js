import { reqDetail, reqAddOrUpdateShopCart } from '../api/index'
// 引入封装游客临时身份的模块
import { getUUID } from '../utils/uuid_token'

const state = {
    detail: {},
    skuInfo: {},
    spuSaleAttrList: [],
    uuid_token: getUUID()
}
const actions = {
    // 获取产品详情action
    async getDetail({commit}, skuId) {
        let result = await reqDetail(skuId)
        if(result.code === 200) {
            commit('GETDETAIL', result.data)
        }
    },
    // 将产品添加到购物车action
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) { // eslint-disable-line no-unused-vars
        // 加入购物车以后，发送请求了，将参数带给服务器，但是服务器并没有返回其他数据(只返回code==200代表请求成功)
        // 因为服务器没返回数据，所以不需要commit将数据存进仓库中
        // 但是发起dispatch的组件在等待响应成功与否的结果，所以这里成功返回OK，失败返回一个Promise失败
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if(result.code === 200) {
            // 返回成功标记
            return 'ok'
        } else {
            // 返回失败标记
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETDETAIL(state, detail) {
        state.detail = detail
    },
}
const getters = {
    categoryView(state) {
        // 这里detail默认是空对象，"空对象.属性"会返回undefined，所以之后DetailIndex中再"undefined.属性"调用会报(假)错(但不影响数据和运行)
        // return state.detail.categoryView
        // 这里让categoryView至少是一个空对象，这样DetailIndex中再调用就是"{}.属性"，也就是undefined，也就不会报错
        return state.detail.categoryView || {}
    },
    skuInfo(state) {
        return state.detail.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detail.spuSaleAttrList || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}