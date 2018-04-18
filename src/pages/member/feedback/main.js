import Vue from 'vue'
import App from './feedback.vue'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '反馈',
        backgroundColor: "#f7f7f7",
        backgroundColorTop:"#f7f7f7",
        backgroundColorBottom:"#f7f7f7",
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black"
    }
}