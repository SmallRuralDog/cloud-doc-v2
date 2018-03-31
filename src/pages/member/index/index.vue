<template>
  <div class="page-view">
    <div class="header">
      <a :href="user_info.href" class="user-info">
        <div class="avatar">
          <img :src="user_info.avatar" :class="{is_login_avatar:token}" />
        </div>
        <div class="content">
          <div class="name">{{user_info.name}}</div>
          <div class="info">{{user_info.intro}}</div>
        </div>
        <div class="right">
          <i class="iconfont icon-moreinfo-copy"></i>
        </div>
      </a>
      <div class="grid-list">
        <div class="grid-item">
          <p class="number">36</p>
          <p class="name">文档</p>
        </div>
        <div class="grid-item">
          <p class="number">36</p>
          <p class="name">文档</p>
        </div>
        <div class="grid-item">
          <p class="number">36</p>
          <p class="name">文档</p>
        </div>
        <div class="grid-item">
          <p class="number">36</p>
          <p class="name">文档</p>
        </div>
      </div>
    </div>
    <div class="created-view">
      <div class="btn-view">
        <a class="btn" :href="token?page_url.created_doc:page_url.login">创建</a>
      </div>
    </div>
    <div class="cell-list">
      <div class="cell bg-fff" hover-class="hover">
        <div class="left">
          <i class="iconfont icon-qianbao"></i>
        </div>
        <div class="body">钱包</div>
        <div class="right">
          <i class="iconfont icon-moreinfo-copy"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../login/store";
import { user, http } from "../../../utils";
export default {
  data() {
    return {
      page_url: {
        login: "/pages/member/login/main",
        setting: "/pages/member/setting/main",
        created_doc: "/pages/created/doc/main"
      }
    };
  },
  computed: {
    user() {
      return store.state.user;
    },
    token() {
      return store.state.token;
    },
    user_info() {
      if (this.token) {
        return {
          is_login: true,
          href: this.page_url.setting,
          avatar: this.user.avatar,
          name: this.user.name,
          intro: this.user.intro || "这家伙很懒，什么也没留下"
        };
      } else {
        return {
          is_login: false,
          href: this.page_url.login,
          avatar: require("../../../../static/images/logo.png"),
          name: "未登录",
          intro: "立即登录，开启您的云档之旅"
        };
      }
    }
  },
  mounted() {},
  methods: {
    getData() {
      http.get("v1/member-index").then(res => {
        user.set_user(res.data.user);
        store.commit("set_user", res.data.user);
      });
    }
  },
  onPullDownRefresh() {
    this.getData();
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
@avatar-size: 50px;
.header {
  background: @blue;
  color: white;
  //box-shadow: 0 1px 6px @blue;
  //border-radius: 0 0 15px 15px;
  overflow: hidden;
  .user-info {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    .avatar {
      width: @avatar-size;
      height: @avatar-size;
      margin-right: 10px;
      img {
        width: @avatar-size;
        height: @avatar-size;
      }
      .is_login_avatar {
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      .name {
        font-size: 16px;
        font-weight: bold;
      }
      .info {
        font-size: 12px;
        line-height: 18px;
        margin-top: 3px;
        max-height: 36px;
        overflow: hidden;
      }
    }
    .right {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      i {
        font-size: 25px;
      }
    }
  }

  .grid-list {
    height: 55px;
    display: flex;
    .grid-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .number {
        font-size: 16px;
        line-height: 26px;
        font-weight: bold;
      }
      .name {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
.created-view {
  height: 30px;
  background: @blue;
  position: relative;
  margin-bottom: 40px;
  box-sizing: border-box;
  box-shadow: 0 1px 6px @blue;
  //border-radius: 0 0 5px 5px;
  .btn-view {
    width: 150px;
    height: 40px;
    background: @blue;
    border-radius: 20px;
    position: absolute;
    bottom: -20px;
    left: 50%;
    margin-left: -75px;
    box-shadow: 0 1px 6px @blue;
    overflow: hidden;
    .btn {
      color: @blue;
      width: 150px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      background: white;
    }
  }
}
.cell-list {
  .cell {
    margin: 15px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    color: #666;
    .left {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      i {
        font-size: 22px;
        color: @blue;
      }
    }
    .body {
      flex: 1;
      font-size: 16px;
    }
    .right {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 22px;
        color: #999;
      }
    }
  }
}
</style>

