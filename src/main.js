import Vue from 'vue'
import App from './App'
import Http from './utils/http'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config : {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/index/main', //首页
      //member
      '^pages/member/index/main', //个人中心
      'pages/member/login/main', //登录
      'pages/member/scan_login/main', //扫码登录pc端
      'pages/member/setting/main', //设置
      //details
      'pages/details/doc/main', //文档首页
      'pages/details/doc-page-info/main', //文档详情页
      'pages/details/doc-menu/main', //文档目录
      //specials
      'pages/specials/mydoc/main', //我的文档
      //created
      'pages/created/doc/main',//创建文档
      //web
      'pages/web/main'//浏览器
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '云档',
      navigationBarTextStyle: 'black',
      backgroundColor: "#ffffff"
    },
    "tabBar": {
      "backgroundColor": "#ffffff",
      "color": "#999999",
      //borderStyle:"white",
      selectedColor: "#333333",
      "list": [
        {
          "pagePath": "pages/index/main",
          "text": "发现",
          "iconPath": "static/images/home-no.png",
          "selectedIconPath": "static/images/home-yes.png"
        }, {
          "pagePath": "pages/specials/mydoc/main",
          "text": "我的学习",
          "iconPath": "static/images/docs-no.png",
          "selectedIconPath": "static/images/docs-yes.png"
        }, {
          "pagePath": "pages/member/index/main",
          "text": "个人中心",
          "iconPath": "static/images/user-no.png",
          "selectedIconPath": "static/images/user-yes.png"
        }
      ]
    }
  }
}
