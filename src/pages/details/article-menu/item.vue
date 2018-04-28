<template>
  <div hover-class="hover" class="line-item" @click="item_click">
    <div>
      <img :src="item.cover.small_url" alt="" class="img_book">
    </div>
    <div class="book_detial">
      <div class="book_title">{{item.title}}</div>
      <div class="book_desc">{{item.abstract}}</div>
      <div class="book_intro">
        <div class="left">
          <span class="author">{{item.updated_format}}</span>
        </div>
        <div class="right">
          <div class="status" v-if="!doc.buy_info.is_show">
            <i class="iconfont icon-suo " v-if="!item.is_try"></i>
            <i class="iconfont icon-shidu try" v-else></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      doc: Object,
      item: Object
    },
    methods: {
      item_click() {
        if (this.doc.buy_info.is_show || this.item.is_try) {
          if (this.item.mode==='node'){
            wx.navigateTo({
              url: "/pages/details/article-node-page/main?id=" + this.item.id
            });
          } else{
            wx.navigateTo({
              url: "/pages/details/doc-page-info/main?link=" + this.item.link
            });
          }

        } else {
          toast.show("请先购买文档");
        }
      }
    }
  };
</script>
<style lang="less">
  .line-item {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    .img_book {
      width: 69px;
      height: 69px/0.75;
      border-radius: 2px;
      box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
    }
    .book_detial {
      margin-left: 14px;
      flex: 1;
      flex-shrink: 0;
      overflow: hidden;
      .book_title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 3px;
      }
      .book_desc,
      .book_intro {
        font-size: 12px;
        color: #979797;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        white-space: normal;
      }
      .book_intro {
        margin-top: 9px;
        display: flex;
        flex: 1;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          i {
            font-size: 12px;
            margin-right: 3px;
          }
        }
      }
    }
  }
</style>


