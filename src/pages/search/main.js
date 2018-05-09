import Vue from 'vue'
import App from './search'

const app = new Vue(App)
app.$mount()
export default {
    config : {
        navigationBarTitleText: '云档',
        navigationBarBackgroundColor:"#ffffff",
        navigationBarTextStyle:"black",
        enablePullDownRefresh:false,
        backgroundTextStyle:"dark"
    }
}