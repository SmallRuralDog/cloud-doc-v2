<template>
    <a class="item" href="/pages/details/doc/main">
        <div class="flex-r">
            <div class="cover">
                <img src="https://climg.mukewang.com/5a405a7700010f1c06000338.jpg" />
            </div>
            <div class="right">
                <div class="title">C++零基础入门 热门编程语言 编程入门 二级考试必备</div>
                <div class="info">
                    <span>职业路径</span>
                    <span>3步／34课</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="plan flex-r">
                <div class="plen-view">
                    <div class="pn"></div>
                </div>
                <div class="plen-title">已看60%</div>
            </div>
            <div class="l-info flex-r">
                <span>上次查看：热门编程语言 编程入门</span>
                <span>3小时前</span>
            </div>
        </div>
    </a>
</template>
<script>
export default {};
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
