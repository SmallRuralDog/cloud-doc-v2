<template>
    <div class="rec-item">
        <a class="item-view" :href="'/pages/details/doc/main?id='+id">
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
      cover:String,
      title:String,
      info:String,
      id:String
  }
};
</script>

<style lang="less">
@import '../styles/common.less';
.rec-item {
  padding: 5px 15px 15px 0;
  .item-view {
    width: 200px;
    border-radius: 5px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    box-sizing: border-box;
    img {
      width: 200px;
      height: 200px/1.75;
    }
    .view-body {
      position: relative;
      padding: 10px;
      .title {
        font-size: 12px;
        line-height: 23px;
        height: 23px;
        overflow: hidden;
        max-width: 90px;
        position: absolute;
        top: -16px;
        left: 10px;
        background:white;
        padding: 0 10px;
        border-radius: 16px;
        font-weight: 500;
        color: @blue;
      }
      .info {
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        overflow: hidden;
      }
    }
  }
}
</style>
