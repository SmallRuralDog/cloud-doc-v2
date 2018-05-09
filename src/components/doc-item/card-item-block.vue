<template>
    <div class="rec-item-block" @click="item_click()">
            <img class="box-sd" :src="cover" />
            <div class="view-body">
              <div class="info">{{info}}</div>
                <div class="title">{{title}}</div>
            </div>
    </div>
</template>
<script>
export default {
  components: {},
  props: {
    cover: String,
    title: String,
    info: String,
    id: String,
    mode:String
  },
  methods: {
    item_click() {
      wx.navigateTo({ url: "/pages/details/"+this.mode+"/main?id=" + this.id });
    }
  }
};
</script>
<style lang="less">
@item-w: 105px;
.rec-item-block {
  flex-shrink: 0;
  width: @item-w;
  padding: 7.5px;
  overflow: hidden;
  img {
    width: @item-w;
    height: @item-w/0.75;
    border-radius: 2px;
  }
  .view-body {
    position: relative;
    .title {
      line-height: 18px;
      height: 18px;
      overflow: hidden;
      max-width: 90px;
      color: #999;
      font-size: 10px;
    }
    .info {
      font-size: 12px;
      line-height: 20px;
      height: 20px;
      overflow: hidden;
      color: #333;
    }
  }
}
/*.rec-item:first-child {
  padding-left: 15px;
}
.rec-item:last-child {
  padding-right: 15px;
}*/
</style>
