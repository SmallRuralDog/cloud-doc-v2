<template>
    <div class="s-login">
        <img class="avatar" :src="user.avatar" />
        <p class="name">{{user.name}}</p>
        <p class="title">使用云档账户授权登录PC端</p>
        <button :loading="loading" :disabled="loading" @tap="login">确认登录</button>
    </div>
</template>
<script>
import store from "../login/store";
import { http, toast } from "../../../utils";
export default {
  data() {
    return {
      key: "",
      loading: false
    };
  },
  mounted() {
    this.key = this.$root.$mp.query.key;
  },
  computed: {
    user() {
      return store.state.user;
    },
    token() {
      return store.state.token;
    }
  },
  methods: {
    login() {
      this.loading = true;
      http
        .get("v1/consent_login", { key: this.key })
        .then(res => {
          this.loading = false;
          toast.show("授权成功");
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
.s-login {
  padding: 15px;
  text-align: center;
  margin-top: 50px;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .name {
    font-size: 16px;
    color: #333;
    margin-top: 5px;
  }
  .title {
    font-size: 12px;
    color: #999;
    margin-top: 30px;
    margin-bottom: 20px;
  }
}
</style>
