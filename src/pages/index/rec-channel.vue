<template>
  <div>
      <div class="titles">
          <div class="title">小云推荐</div>
          <div class="more">更多 <i class="iconfont icon-moreinfo-copy"></i></div>
      </div>
      <div>
          <scroll-view scroll-x>
              <div class="rec-list">
              <div class="rec-item">
                  <a class="item-view" hover-class="hover">
                      <img src="https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd"/>
                  <div class="view-body">
                      <div class="title">PHP</div>
                      <div class="info">抓住痛点：掌握销售的主动权</div>
                  </div>
                  </a>
              </div>
              <div class="rec-item">
                  <div class="item-view">
                      <img src="https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd"/>
                  <div class="view-body">
                      <div class="title">PHP</div>
                      <div class="info">抓住痛点：掌握销售的主动权</div>
                  </div>
                  </div>
              </div>
              <div class="rec-item">
                  <div class="item-view">
                      <img src="https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd"/>
                  <div class="view-body">
                      <div class="title">PHP</div>
                      <div class="info">抓住痛点：掌握销售的主动权</div>
                  </div>
                  </div>
              </div>
              <div class="rec-item">
                  <div class="item-view">
                      <img src="https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd"/>
                  <div class="view-body">
                      <div class="title">PHP</div>
                      <div class="info">抓住痛点：掌握销售的主动权</div>
                  </div>
                  </div>
              </div>
              </div>
          </scroll-view>
      </div>
  </div>
</template><script>
export default {};
</script>
<style lang="less">
.titles {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 18px;
    color: #333;
  }
  .more {
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #999;
    i {
      font-size: 12px;
    }
  }
}
.rec-list{
    display: flex;
    flex-wrap: nowrap;
}
.rec-item {
  padding:0 15px 15px 0;
  .item-view {
    width: 200px;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    //background: white;
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
        color: teal;
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
.rec-list:first-child{
    margin-left: 15px;
}
</style>

