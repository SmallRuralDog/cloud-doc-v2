import Vue from 'vue'
import Vuex from 'vuex'
import user from '../../../utils/user'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: user.get_user(),
        token: user.get_token()
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