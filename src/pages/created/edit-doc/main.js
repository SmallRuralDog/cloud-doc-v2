import Vue from 'vue'
import App from './edit-doc.vue'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '编辑文档',
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black"
    }
}