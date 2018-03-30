import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
        token: false
    },
    mutations: {
        set_user: (state, data) => {
            state.user = data
        },
        set_token: (state, token) => {
            state.token = token
        }
    }
})

export default store