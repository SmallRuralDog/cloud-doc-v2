import Vue from 'vue'
import App from './mydoc'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '我的文档',
        //backgroundColorTop:"#1a82d2",
        //backgroundColorBottom:"#f7f7f7",
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black",
        enablePullDownRefresh:true,
        backgroundTextStyle:"dark"
    }
}