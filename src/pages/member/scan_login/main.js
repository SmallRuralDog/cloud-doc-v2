import Vue from 'vue'
import App from './scan-login'
const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: 'PC端登录',
        backgroundColorTop:"#fff",
        backgroundColorBottom:"#fff",
        navigationBarBackgroundColor:"#fff",
        navigationBarTextStyle:"black"
    }
}