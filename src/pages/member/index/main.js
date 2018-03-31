import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '我的',
        backgroundColorTop:"#1a82d2",
        backgroundColorBottom:"#ffffff",
        navigationBarBackgroundColor:"#1a82d2",
        navigationBarTextStyle:"white",
        enablePullDownRefresh:true,
        backgroundTextStyle:"light"
    }
}