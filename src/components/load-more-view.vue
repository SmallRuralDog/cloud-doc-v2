<template>
    <div class="vux-loadmore weui-loadmore" :class="{'weui-loadmore_line':!showLoading, 'weui-loadmore_dot': !showLoading && !tip}">
        <i class="weui-loading" v-if="showLoading"></i>
        <span class="weui-loadmore__tips" v-show="tip || !showLoading">{{tip}}</span>
    </div>
</template>

<script>
export default {
  name: "load-more",
  props: {
    showLoading: {
      type: Boolean,
      default: true
    },
    tip: String
  }
};
</script>

<style lang="less">
@import "../styles/weui-loading.less";
@import "../styles/weui-loadmore.less";
.vux-loadmore {
  color: #999;
  &.weui-loadmore_line {
    display: flex;
    border-top: 0;
    &:before,
    &:after {
      position: relative;
      top: -1rpx;
      flex: 1;
      content: "";
      border-top: 1rpx solid #dcdcdc;
    }
  }
}
</style>