import Vue from 'vue'
import App from './edit-articles-text.vue'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '编辑文字',
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black"
    }
}