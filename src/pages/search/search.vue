<template>
    <div class="search-page">
        <div class="search-bar">
            <div class="input-view">
                <i class="iconfont icon-search"></i>
                <input @focus="focus" @confirm="confirm" v-model="query" confirm-type="search" :focus="true" placeholder="看文档，搜云档" />
                <i @click="del_click" v-show="del_show" class="iconfont icon-shibai del-all"></i>
            </div>
            <navigator open-type="navigateBack" class="btn-view">
                <div>取消</div>
            </navigator>
        </div>
        <div class="search-body">
            <div class="searct-tip" v-if="!show_items && query">
                <search-tips @tip-click='tip_click' :tips="tips" :query="query" />
            </div>
            <div class="item-list" v-if="show_items">
                <div class="doc-list" v-if="init">
                    <div class="data-info text-12">
                        <span>找到相关结果</span>
                        <span class="color-danger">{{data.data.total}}</span>条（用时{{data.data.searchtime}}秒）</div>
                    <div>
                        <item v-for="(item,index) in data.data.items" :item="item" :key="index" />
                    </div>
                    <load-more :meta="data.meta" :page="page" :error="page_error" :loading="page_loading" @page-reload="page_reload" @load-more="load_more" />
                </div>
                <div v-else>
                    <status-view :status="status" @re_load="re_load" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { http } from "../../utils";
import LoadMore from "../../components/load-more";
import StatusView from "../../components/status-view";
import Item from "./item";
import SearchTips from "./search-tip";
export default {
  components: {
    Item,
    SearchTips,
    LoadMore,
    StatusView
  },
  data() {
    return {
      tips: [],
      data: {},
      query: "",
      page: 1,
      show_items: false,
      init: false,
      status: "loading",
      page_loading: false,
      page_error: false,
      edit_time: 0
    };
  },
  watch: {
    query(val) {
      const n_time = new Date().getTime();
      if (val.length > 0 && n_time - this.edit_time > 500) {
        this.edit_time = n_time;
        this.get_tip();
      }
    }
  },
  onUnload() {
      this.init = false;
      this.status = "loading";
      this.query = "";
      this.show_items = false;
    },
  methods: {
    del_click() {
      this.query = "";
      this.show_items = false;
      this.init = false;
    },
    focus() {
      this.show_items = false;
      this.init = false;
    },
    confirm() {
      this.getData();
    },
    load_more() {
      if (this.loading) return;
      this.page_loading = true;
      this.getData(this.page + 1);
    },
    re_load() {
      this.status = "loading";
      this.getData();
    },
    tip_click(query) {
      this.query = query;
      this.getData();
    },
    page_reload() {
      if (this.loading) return;
      this.page_loading = true;
      this.page_error = false;
      this.getData(this.page + 1);
    },
    getData(page = 1) {
      this.show_items = true;
      http
        .post("v1/search", { key: this.query, page: page })
        .then(res => {
          if (page === 1) {
            if (res.data.data.length <= 0) {
              this.status = "no-data";
              return;
            }
            this.data = res.data;
          } else {
            let oldData = this.data.data.items;
            res.data.data.items.map(item => {
              oldData.push(item);
            });
            this.data.data.items = oldData;
            this.data.meta = res.data.meta;
          }
          this.init = true;
          this.page_loading = false;
          this.show_items = true;
          this.page = res.data.meta.current_page;
        })
        .catch(err => {
          this.status = "error";
          this.show_items = true;
          this.page_loading = false;
          if (page > 1) {
            this.page_error = true;
          }
        });
    },
    get_tip() {
      http.post("v1/search-tip", { key: this.query }).then(res => {
        console.log(res);
        this.tips = res.data;
      });
    }
  },
  computed: {
    del_show() {
      return this.query.length > 0;
    }
  }
};
</script>
<style lang="less">
.search-page {
  .search-bar {
    height: 48px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 0.5px solid #f0f0f0;
    background: white;
    overflow: hidden;
    .input-view {
      display: flex;
      position: relative;
      flex: 1;
      align-items: center;
      background: #f3f4f0;
      margin-left: 15px;
      padding: 4px 10px;
      border-radius: 50px;
      i {
        font-size: 18px;
        margin-right: 5px;
      }
      input {
        font-size: 13px;
        flex: 1;
      }
      .del-all {
        margin-right: 0;
        margin-left: 5px;
      }
    }
    .btn-view {
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .search-body {
    margin-top: 48px;
    .item-list {
      .data-info {
        padding: 8px 15px;
        color: #666;
        font-size: 12px;
      }
    }
  }
  .color-danger {
    color: red;
  }
}
</style>
