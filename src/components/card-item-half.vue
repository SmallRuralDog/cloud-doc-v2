<template>
  <div class="card-item">
    <a class="item-view" href="/pages/details/doc/main">
      <img :src="cover" />
      <div class="view-body">
        <div class="title">{{title}}</div>
        <div class="info">{{info}}</div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    cover: String,
    title: String,
    info: String
  }
};
</script>

<style lang="less">
@import '../styles/common.less';
@card-w: 165px;
.card-item {
  width: 50%;
  box-sizing: border-box;
  .item-view {
    width: @card-w;
    border-radius: 5px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    box-sizing: border-box;
    img {
      width: @card-w;
      height: @card-w/1.75;
    }
    .view-body {
      position: relative;
      padding: 10px;
      .title {
        font-size: 13px;
        line-height: 23px;
        height: 23px;
        overflow: hidden;
        max-width: 90px;
        position: absolute;
        top: -16px;
        left: 10px;
        background: white;
        padding: 0 10px;
        border-radius: 16px;
        font-weight: 500;
        color: @blue;
      }
      .info {
        font-size: 12px;
        line-height: 20px;
        height: 20px;
        overflow: hidden;
      }
    }
  }
}
.card-item:nth-child(odd) {
  padding: 7.5px 7.5px 7.5px 15px;
}
.card-item:nth-child(even) {
  padding: 7.5px 15px 7.5px 7.5px;
}
</style>
