import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '',
        backgroundColorTop:"#1a82d2",
        backgroundColorBottom:"#fff",
        navigationBarBackgroundColor:"#1a82d2",
        navigationBarTextStyle:"white"
    }
}