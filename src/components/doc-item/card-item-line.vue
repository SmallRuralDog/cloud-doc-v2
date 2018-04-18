<template>
    <div class="line-item">
        <div>
            <img :src="cover" alt="" class="img_book">
        </div>
        <div class="book_detial">
            <div class="book_title">{{title}}</div>
            <div class="book_desc">{{abstract}}</div>
            <div class="book_intro">
                <div class="left">
                    <i class="iconfont icon-wode"></i>
                    <span class="author">{{user_name}}</span>
                </div>
                <div class="right">
                    <span class="type">{{category_name}} ‧ {{time}} ‧ </span>
                    <span>{{number}}人在看</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    cover: String,
    title: String,
    abstract: String,
    user_name: String,
    category_name: String,
    number: String,
    time: String
  }
};
</script>
<style lang="less">
.line-item {
  display: flex;
  align-items: center;
  .img_book {
    width: 69px;
    height: 69px/0.75;
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
  }
  .book_detial {
    margin-left: 14px;
    flex: 1;
    .book_title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      font-size: 15px;
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


