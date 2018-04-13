import Vue from 'vue'
import App from './doc-menu.vue'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '文档目录',
        backgroundColorTop:"#fff",
        backgroundColorBottom:"#fff",
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black"
    }
}