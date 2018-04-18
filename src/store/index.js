import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        system_info: wx.getSystemInfoSync(),
    },
    mutations: {

    }
})

export default store