import Vue from 'vue'
import App from './doc-page-info.vue'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '',
        backgroundColorTop:"#fff",
        backgroundColorBottom:"#fff",
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black"
    }
}