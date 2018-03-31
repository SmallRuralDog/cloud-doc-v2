import Vue from 'vue'
import App from './setting'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '设置',
        //backgroundColorTop:"#1a82d2",
        //backgroundColorBottom:"#ffffff",
        navigationBarBackgroundColor:"#1a82d2",
        navigationBarTextStyle:"white"
    }
}