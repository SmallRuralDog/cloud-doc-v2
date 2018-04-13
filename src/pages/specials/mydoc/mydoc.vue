<template>
    <div class="page-view">
        <block v-if="token">
            <div class="doc-list" v-if="init">
                <div>
                    <item v-for="(item,index) in data.data" :data="item" :key="index" />
                </div>
                <load-more :meta="data.meta" :page="page" :error="page_error" :loading="page_loading" @page-reload="page_reload" @load-more="load_more" />
            </div>
            <div v-else>
                <status-view :status="status" @re_load="re_load" />
            </div>
        </block>
        <div v-else class="no-login">
            <img :src="login_img" alt="" srcset="">
            <p>登录后查看更多</p>
            <div class="btns">
                <a href="/pages/member/login/main" class="btn">立即登录</a>
            </div>
        </div>

    </div>
</template>
<script>
import store from "../../member/login/store";
import { http, user } from "../../../utils";
import Item from "./item";
import LoadMore from "../../../components/load-more";
import StatusView from "../../../components/status-view";
export default {
  components: {
    Item,
    LoadMore,
    StatusView
  },
  data() {
    return {
      login_img: require("../../../../static/images/login.png"),
      init: false,
      status: "loading",
      page: 1,
      page_loading: false,
      page_error: false,
      data: {}
    };
  },
  mounted() {
    if (this.token) {
      this.getData();
    }
  },
  watch: {
    token(v, ov) {
      if (v) {
        this.getData();
      }
    }
  },
  methods: {
    load_more() {
      if (this.loading) return;
      this.page_loading = true;
      this.get_comment(this.page + 1);
    },
    re_load() {
      this.status = "loading";
      this.getData();
    },
    page_reload() {
      if (this.loading) return;
      this.page_loading = true;
      this.page_error = false;
      this.get_comment(this.page + 1);
    },
    getData(page = 1) {
      http
        .get("v1/user-listened", { page: page })
        .then(res => {
          if (page == 1) {
            if (res.data.data.length <= 0) {
              this.status = "no-data";
              return;
            }
            this.data = res.data;
          } else {
            let oldData = this.data.data;
            res.data.data.map(item => {
              oldData.push(item);
            });
            this.data = {
              data: oldData,
              meta: res.data.meta
            };
          }
          this.init = true;
          this.page_loading = false;
          this.page = res.data.meta.current_page;
        })
        .catch(err => {
          this.status = "error";
          this.page_loading = false;
          if (page > 1) {
            this.page_error = true;
          }
        });
    }
  },
  computed: {
    user() {
      return store.state.user;
    },
    token() {
      return store.state.token;
    }
  },
  onPullDownRefresh() {
    this.page = 1;
    this.page_error = false;
    this.getData();
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.no-login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 120px;
    height: 120px;
    margin-bottom: 15px;
  }
  p {
    font-size: 14px;
    color: #999;
  }
  .btns {
    .btn {
      text-align: center;
      color: @blue;
      font-size: 14px;
      padding: 0 60px;
      margin-top: 30px;
      line-height: 45px;
    }
  }
}
</style>
