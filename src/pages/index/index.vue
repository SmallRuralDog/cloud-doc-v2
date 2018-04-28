<template>
  <div>
    <block v-if="init">
      <banner :banners="data.banner" v-if="data.banner.length>0"></banner>
      <grid-menu :menus="data.grid_menu" v-if="data.grid_menu.length>0"></grid-menu>
      <rec-channel :items="data.hot"></rec-channel>
      <class-channel :list="data.class_rec"></class-channel>
      <home-list :list="data.home_list.data"></home-list>
      <load-more :meta="data.home_list.meta" :page="page" :error="page_error" :loading="page_loading"
                 @load-more="load_more" @page-reload="page_reload" />
    </block>
    <div v-else>
      <status-view :status="status" @re_load="re_load" />
    </div>
  </div>
</template>
<script>
  import { http, navigate } from "../../utils";
  import NavBar from "../../components/NavBar";
  import Banner from "./banner";
  import GridMenu from "./grid-menu";
  import RecChannel from "./rec-channel";
  import ClassChannel from "./class-channel";
  import HomeList from "./home-list";
  import LoadMore from "../../components/load-more";
  import StatusView from "../../components/status-view";

  export default {
    components: {
      NavBar,
      Banner,
      GridMenu,
      RecChannel,
      ClassChannel,
      HomeList,
      LoadMore,
      StatusView
    },
    data() {
      return {
        init: false,
        status: "loading",
        data: {},
        page: 1,
        page_loading: false,
        page_error: false
      };
    },
    mounted() {
      this.getData();
      try {
        const scene = decodeURIComponent(this.$root.$mp.query.scene) || decodeURIComponent(this.$root.$mp.appOptions.scene);

        const scene_data = scene.split('#');
        let type = scene_data[0];
        let id = scene_data[1];
        switch (type) {
          case 'docs':
            navigate.open_doc_index(id);
            break;
          case 'articles':
            navigate.open_articles_index(id);
            break;
          case 'article':
            navigate.open_article_page(id);
            break;
        }
      } catch (e) {
        console.log('scene error')
      }
    },
    methods: {
      load_more() {
        if (this.loading) return;
        this.page_loading = true;
        this.getData(this.page + 1);
      },
      page_reload() {
        if (this.loading) return;
        this.page_loading = true;
        this.page_error = false;
        this.getData(this.page + 1);
      },
      re_load() {
        this.status = "loading";
        this.getData();
      },
      getData(page = 1) {
        http
          .get("v1/index", { page: page })
          .then(res => {
            this.init = true;
            this.page_loading = false;
            if (page == 1) {
              this.data = res.data;
            } else {
              let oldData = this.data.home_list.data;
              res.data.home_list.data.map(item => {
                oldData.push(item);
              });
              this.data.home_list.data = oldData;
              this.data.home_list.meta = res.data.home_list.meta;
            }
            this.page = res.data.home_list.meta.current_page;
          })
          .catch(err => {
            this.status = "error";
            this.page_loading = false;
            this.page_error = true;
          });
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
  @import '../../styles/common.less';
</style>


