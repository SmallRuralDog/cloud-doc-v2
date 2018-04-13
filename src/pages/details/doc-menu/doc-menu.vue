<template>
    <div v-if="init">
        <div v-for="(item,index) in doc_menu" :key="index">
            <menu-item :menu="item" :doc="doc" :host="host" />
            <div v-if="item.children" v-for="(item2,index2) in item.children" :key="index2">
                <menu-item :menu="item2" :doc="doc" :host="host" />
                <div v-if="item2.children" v-for="(item3,index3) in item2.children" :key="index3">
                    <menu-item :menu="item3" :doc="doc" :host="host" />
                    <div v-if="item3.children" v-for="(item4,index4) in item3.children" :key="index4">
                        <menu-item :menu="item4" :doc="doc" :host="host" />
                        <div v-if="item4.children" v-for="(item5,index5) in item4.children" :key="index5">
                            <menu-item :menu="item5" :doc="doc" :host="host" />
                            <div v-if="item5.children" v-for="(item6,index6) in item5.children" :key="index6">
                                <menu-item :menu="item6" :doc="doc" :host="host" />
                                <div v-if="item6.children" v-for="(item7,index7) in item6.children" :key="index7">
                                    <menu-item :menu="item7" :doc="doc" :host="host" />
                                    <div v-if="item7.children" v-for="(item8,index8) in item7.children" :key="index8">
                                        <menu-item :menu="item8" :doc="doc" :host="host" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <status-view :status="status" @re_load="re_load" />
    </div>

</template>
<script>
import { http, toast } from "../../../utils";
import MenuItem from "./menu-item";
import StatusView from "../../../components/status-view";
export default {
  components: {
    MenuItem,
    StatusView
  },
  data() {
    return {
      init: false,
      status: "loading",
      doc: {},
      doc_menu: [],
      host: "",
      id: ""
    };
  },
  onUnload() {
    this.init = false;
    this.status = "loading";
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getData();
  },
  methods: {
    re_load() {
      this.status = "loading";
      this.getData();
    },
    getData() {
      http
        .get("v1/doc-menu", { id: this.id })
        .then(res => {
          if (res.data.doc_menu <= 0) {
            this.status = "no-data";
          } else {
            this.init = true;
            this.doc = res.data.doc;
            this.doc_menu = res.data.doc_menu;
            this.host = res.data.host;
          }
        })
        .catch(err => {
          this.status = "error";
        });
    }
  }
};
</script>
