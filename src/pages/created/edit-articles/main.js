import Vue from 'vue'
import App from './edit-articles.vue'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '编辑文章',
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black"
    }
}