<template>
    <div class="">
        <div class="header">
            <div class="cover">
                <img class="blur" src="https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd" />
            </div>
        </div>
        <div class="page-body">
            <div class="titles bg-fff">
                <div class="title">复古咖啡馆自由周末行复古咖啡馆自由周末行复古咖啡馆自由周末行复古咖啡馆自由周末行</div>
                <div class="class-tag">PHP</div>
            </div>
            <div class="abstract bg-fff">性感男神的14项减脂塑形训练，每天10分钟轻松逆袭让她尖叫</div>
            <div class="item-data  bg-fff">
                <div class="left">
                    <div class="money y-money">9.90</div>
                </div>
                <div class="rgiht flex-r">
                    <p>更新：1天前</p>
                    <p>浏览：1356</p>
                </div>
            </div>
            <div class="user-data bg-fff" v-if="false">
                <div class="left">
                    <img src="http://imgavater.ui.cn/avatar/6/0/3/6/356306.png?imageMogr2/auto-orient/crop/!496x496a0a1/thumbnail/148x148" />
                    <p>小小特工</p>
                </div>

            </div>
        </div>

        <div class="footer-bar bg-fff">
            <div class="icon-btn">
                <i class="iconfont icon-xihuan"></i>
                <p>感兴趣</p>
            </div>
            <div class="icon-btn" v-if="false">
                <i class="iconfont icon-pinglun"></i>
                <p>评论</p>
            </div>
            <div class="btn try">试读</div>
            <div class="btn join">立即参与</div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less">
@import "../../../styles/common.less";
@cover-size: 345px;
@bh: 80px;
.header {
  background: -webkit-gradient(linear, 0 30, 0 60%, from(@blue), to(#fff));
  padding: 15px;
  .cover {
    width: @cover-size;
    height: @cover-size/1.75;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    img {
      width: @cover-size;
      height: @cover-size/1.75;
    }
  }
}
.page-body {
  .titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
    .title {
      font-size: 18px;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin-right: 10px;
      font-weight: bold;
      color: #333;
    }
    .class-tag {
      line-height: 15px;
      height: 15px;
      flex-shrink: 0;
      overflow: hidden;
      padding: 0 7px;
      border-radius: 9px;
      font-size: 10px;
      background: @blue;
      color: white;
      max-width: 80px;
      box-shadow: 0 0 3px @blue;
    }
  }
  .abstract {
    padding: 0px 15px;
    font-size: 12px;
    color: #999;
    line-height: 18px;
  }
  .item-data {
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
    align-items: baseline;
    .left {
      .money {
        font-size: 30px;
        text-shadow: 0 0 2px @blue;
        color: @blue;
        font-weight: bold;
      }
    }
    .rgiht {
      font-size: 12px;
      color: #999;
      p {
        margin-left: 10px;
      }
    }
  }
  .user-data {
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
.footer-bar {
  display: flex;
  position: fixed;
  bottom: 10px;
  left: 15px;
  right: 15px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 3px #f7f7f7;
  .icon-btn {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #666;
    i {
      font-size: 20px;
    }
    p {
      font-size: 10px;
    }
  }
  .btn {
    flex: 1;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dcdcdc;
    margin: 8px 10px;
    border-radius: 5px;
  }
  .try{
      background: #ecb874;
      color: white;
      box-shadow: 0 0 3px #ecb874;
  }
  .join{
      background: @blue;
      color: white;
      box-shadow: 0 0 3px @blue;
  }
}
</style>

