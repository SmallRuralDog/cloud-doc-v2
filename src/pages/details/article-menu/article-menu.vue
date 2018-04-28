<template>
  <div class="article-menu-view">
    <div class="article-menu-view-list" v-if="init">
      <div>
        <item v-for="(item,index) in data.data" :doc="doc" :item="item" :key="index" />
      </div>
      <load-more :meta="data.meta" :page="page" :error="page_error" :loading="page_loading" @page-reload="page_reload"
                 @load-more="load_more" />
    </div>
    <div v-else>
      <status-view :status="status" @re_load="re_load" />
    </div>
  </div>
</template>

<script>
  import { http } from '../../../utils';
  import LoadMore from "../../../components/load-more";
  import StatusView from "../../../components/status-view";
  import Item from './item';

  export default {
    name: "article-menu",
    components: {
      LoadMore,
      StatusView,
      Item
    },
    data() {
      return {
        doc_id:'',
        init: false,
        status: "loading",
        page: 1,
        page_loading: false,
        page_error: false,
        doc:{},
        data: {}
      }
    },
    mounted() {
      this.doc_id = this.$root.$mp.query.id || "";
      this.getData();
    },
    methods: {
      load_more() {
        if (this.loading) return;
        this.page_loading = true;
        this.getData(this.page + 1);
      },
      re_load() {
        this.status = "loading";
        this.getData();
      },
      page_reload() {
        if (this.loading) return;
        this.page_loading = true;
        this.page_error = false;
        this.getData(this.page + 1);
      },
      getData(page = 1) {
        http.get("v1/article-menu?id="+this.doc_id+"&page=" + page).then(res => {
          if (page === 1) {
            if (res.data.menu.data.length <= 0) {
              this.status = "no-data";
              return;
            }
            this.doc = res.data.doc;
            this.data = res.data.menu;
          } else {
            let oldData = this.data.data;
            res.data.menu.data.map(item => {
              oldData.push(item);
            });
            this.data = {
              data: oldData,
              meta: res.data.menu.meta
            };
          }
          this.init = true;
          this.page_loading = false;
          this.page = res.data.meta.current_page;
        }).catch(err => {
          this.status = "error";
          this.page_loading = false;
          if (page > 1) {
            this.page_error = true;
          }
        });
      }
    },
    onPullDownRefresh() {
      this.page = 1;
      this.page_error = false;
      this.getData();
    }
  }
</script>

<style lang="less">

</style>
