<template>
  <a class="item" :href="'/pages/details/doc/main?id='+data.item.doc.id">
    <div class="flex-r">
      <div class="cover">
        <img :src="data.item.doc.cover.small_url" />
      </div>
      <div class="right">
        <div class="title">{{data.item.doc.title}}</div>
        <div class="info">
          <span>{{data.item.doc.category_name}}</span>
          <span class="ml-5">{{data.item.doc.listened_count}}/{{data.item.doc.page_count}}章节</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="plan flex-r">
        <div class="plen-view">
          <div class="pn" :style="{'width':pn+'%'}"></div>
        </div>
        <div class="plen-title">已看{{pn}}%</div>
      </div>
      <div class="l-info flex-r">
        <span>上次查看：{{data.item.title}}</span>
        <span>{{data.time}}</span>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  props: {
    data: Object
  },
  computed:{
    pn(){
      return parseInt(this.data.item.doc.listened_count/this.data.item.doc.page_count*100)
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
@cover-size: 100px;
.item {
  margin: 15px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding: 10px;
  .cover {
    width: @cover-size;
    height: @cover-size/1.75;
    margin-right: 10px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: @cover-size;
      height: @cover-size/1.75;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
      line-height: 20px;
      height: 40px;
      overflow: hidden;
      font-weight: bold;
      color: #333;
    }
    .info {
      font-size: 10px;
      color: #999;
    }
  }
  .footer {
    margin-top: 10px;
    .plan {
    }
    .plen-view {
      height: 8px;
      flex: 1;
      background: #dcdcdc;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 2px @blue;
      .pn {
        border-radius: 10px;
        height: 8px;
        background: @blue;
        width: 60%;
      }
    }
    .plen-title {
      font-size: 10px;
      margin-left: 10px;
      color: @blue;
    }
    .l-info {
      margin-top: 8px;
      font-size: 10px;
      color: #999;
      justify-content: space-between;
      span {
        box-sizing: border-box;
        line-height: 15px;
        height: 15px;
        overflow: hidden;
        flex-shrink: 0;
      }
      :first-child {
        margin-right: 15px;
        flex-shrink: 1;
      }
    }
  }
}
</style>
