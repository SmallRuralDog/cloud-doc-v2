import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config : {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main', 'pages/member/index/main', 'pages/details/doc/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '云档',
      navigationBarTextStyle: 'black',
      backgroundColor: "#f7f7f7"
    },
    "tabBar": {
      "backgroundColor": "#ffffff",
      "color": "#999999",
      //borderStyle:"white",
      selectedColor: "#1a82d2",
      "list": [
        {
          "pagePath": "pages/index/main",
          "text": "首页",
          "iconPath": "static/images/house-no.png",
          "selectedIconPath": "static/images/house-yes.png"
        }, {
          "pagePath": "pages/member/index/main",
          "text": "我的",
          "iconPath": "static/images/tabbar-home.png",
          "selectedIconPath": "static/images/tabbar-home.png"
        }
      ]
    }
  }
}
