import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '云档',
        backgroundColorTop:"#fff",
        backgroundColorBottom:"#f7f7f7",
        //navigationBarBackgroundColor:"#1a82d2",
        //navigationBarTextStyle:"white"
    }
}
