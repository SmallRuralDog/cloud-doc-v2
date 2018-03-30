<template>
    <div class="page-view">
        <div class="header">
            <a href="/pages/member/login/main" class="user-info">
                <div class="avatar">
                    <img src="http://imgavater.ui.cn/avatar/6/0/3/6/356306.png?imageMogr2/auto-orient/crop/!496x496a0a1/thumbnail/148x148" />
                </div>
                <div class="content">
                    <div class="name">小小特工</div>
                    <div class="info">我将生命与荣耀奉献于守夜人，今夜如此，夜夜皆然</div>
                </div>
                <div class="right">
                    <i class="iconfont icon-moreinfo-copy"></i>
                </div>
            </a>
            <div class="grid-list">
                <div class="grid-item">
                    <p class="number">36</p>
                    <p class="name">文档</p>
                </div>
                <div class="grid-item">
                    <p class="number">36</p>
                    <p class="name">文档</p>
                </div>
                <div class="grid-item">
                    <p class="number">36</p>
                    <p class="name">文档</p>
                </div>
                <div class="grid-item">
                    <p class="number">36</p>
                    <p class="name">文档</p>
                </div>
            </div>
        </div>
        <div class="cell-list">
            <div class="cell bg-fff" hover-class="hover">
                <div class="left">
                    <i class="iconfont icon-qianbao"></i>
                </div>
                <div class="body">钱包</div>
                <div class="right">
                    <i class="iconfont icon-moreinfo-copy"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less">
@import "../../../styles/common.less";
@avatar-size: 50px;
.header {
  background: @blue;
  color: white;
  box-shadow: 0 1px 6px @blue;
  //border-radius: 0 0 15px 15px;
  overflow: hidden;
  .user-info {
    display: flex;
    padding: 8px 15px;
    .avatar {
      width: @avatar-size;
      height: @avatar-size;
      margin-right: 10px;
      img {
        width: @avatar-size;
        height: @avatar-size;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      .name {
        font-size: 16px;
        font-weight: bold;
      }
      .info {
        font-size: 12px;
        line-height: 18px;
        margin-top: 3px;
        height: 36px;
        overflow: hidden;
      }
    }
    .right {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      i {
        font-size: 25px;
      }
    }
  }

  .grid-list {
    height: 55px;
    display: flex;
    .grid-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .number {
        font-size: 16px;
        line-height: 26px;
        font-weight: bold;
      }
      .name {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
.cell-list {
  .cell {
    margin: 15px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    color: #666;
    .left {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      i {
        font-size: 22px;
        color: @blue;
      }
    }
    .body {
      flex: 1;
      font-size: 16px;
    }
    .right {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 22px;
        color: #999;
      }
    }
  }
}
</style>

