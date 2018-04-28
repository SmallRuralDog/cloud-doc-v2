import Vue from 'vue'
import App from './articles'

const app = new Vue(App);
app.$mount()
export default {
  config: {
    navigationBarTitleText: '',
    backgroundColorTop: "#fff",
    backgroundColorBottom: "#fff",
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: "black",
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark"
  }
}
