<template>
    <div class="load-more">
        <block v-if="!no_data">
            <div>
                <slot></slot>
            </div>
            <div class="load-more-view" @click="reLoad">
                <load-more :show-loading="loading" :tip="load_tip" ></load-more>
            </div>
        </block>
        <block v-else>
            <div class="no-data">
                <i class="iconfont" :class="no_data_info.icon"></i>
                <p>{{no_data_info.text}}</p>
            </div>
        </block>
    </div>
</template>
<script>
import LoadMore from "./load-more-view";
export default {
  components: {
    LoadMore
  },
  data() {
    return {};
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true
    },
    error: {
      type: Boolean,
      default: false,
      required: true
    },
    load_more_tip: {
      type: String,
      default: "正在加载更多"
    },
    no_more_tip: {
      type: String,
      default: "没有更多了"
    },
    meta: {
      type: Object,
      required: true
    },
    page: {
      type: Number,
      default: 1,
      required: true
    },
    no_data_info: {
      type: Object,
      default: () => {
        return {
          icon: "icon-meiyouneirong",
          text: "暂时木有内容啊~"
        };
      }
    }
  },
  methods: {
    loadMore() {
      if (!this.no_more && !this.error) {
        console.log("load-more");
        this.$emit("load-more");
      }
    },
    reLoad() {
      if (!this.no_more && this.error) {
        this.$emit("page-reload");
      }
    }
  },
  computed: {
    load_tip() {
      return this.error?'加载失败，点击重试':this.no_more ? this.no_more_tip : this.load_more_tip;
    },
    no_more() {
      return this.page >= this.meta.last_page && !this.loading;
    },
    no_data() {
      return this.meta.total === 0;
    }
  },
  onReachBottom() {
    this.loadMore();
  }
};
</script>
<style lang="less">
.no-data {
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  color: #666;
  font-size: 14px;
  .iconfont{
    font-size: 80px;
    color: #dcdcdc;
  }
}
</style>
