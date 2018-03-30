<template>
    <div class="login-view">
        <div class="logo-view">
            <img :src="logo" />
        </div>
        <div class="app-name">云档 2.0</div>
        <div class="btn-view">
            <button v-if="!bind_phone" class="login-btn" :loading="loading" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoCallBack">立即登录</button>

            <button v-else class="login-btn bind-phone" :loading="loading" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumberCallBack">立即绑定手机</button>
        </div>
        <div class="bind-phone-tip" v-if="bind_phone">{{bind_text}}</div>
        <p class="copyright">小程序由云档提供技术支持</p>
    </div>
</template>
<script>
import user from "../../../utils/user";
import http from "../../../utils/http";
export default {
  data() {
    return {
      logo: require("../../../../static/images/logo.png"),
      loading: false,
      bind_phone: false,
      bind_text: "为了您的账户安全，请先绑定手机",
      bind_id: ""
    };
  },
  methods: {
    getUserInfoCallBack(detail) {
      let data = detail.target;
      if (data.iv && data.encryptedData) {
        this.loading = true;
        user
          .login(data.iv, data.encryptedData)
          .then(res => {
            this.loading = false;
            if (res.data.bind_phone) {
              //绑定手机
              this.bind_phone = true;
              this.bind_text = res.data.bind_text;
              this.bind_id = res.data.id;
            } else {
              //登录成功
              this.login_ok()
            }
          })
          .catch(err => {
            this.loading = false;
          });
      }
    },
    getPhoneNumberCallBack(detail) {
      let data = detail.target;
      if (data.iv && data.encryptedData) {
        this.loading = true;
        user
          .bind_login(this.bind_id, data.iv, data.encryptedData)
          .then(res => {
            this.loading = false;
            //登录成功
            this.login_ok()
          })
          .catch(err => {
            this.loading = false;
          });
      }
    },
    login_ok(){
        wx.navigateBack()
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.login-view {
  width: 100vw;
  height: 100vh;
  .logo-view {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0 10px 0;
    img {
      width: 130px;
      height: 130px;
    }
  }
  .app-name {
    padding: 0px 0;
    text-align: center;
    color: @blue;
    font-size: 16px;
    text-shadow: 0 0 2px @blue;
    margin-bottom: 60px;
  }
  .btn-view {
    flex: 1;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 0 8px @blue;
    margin: 0 20px;
    .login-btn {
      background-color: @blue;
      color: white;
    }
  }
  .copyright {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
  .bind-phone-tip {
    margin-top: 20px;
    text-align: center;
    color: #666;
    font-size: 12px;
    line-height: 25px;
  }
}
</style>
