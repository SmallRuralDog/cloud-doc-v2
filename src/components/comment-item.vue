<template>
    <div class="comment-item">
        <div class="top">
            <div class="avatar">
                <img :src="comment.user.avatar" alt="">
            </div>
            <div class="r">
                <div class="user-info">
                    <div class="name">{{comment.user.name}}</div>
                    <div class="data-info">
                        <i class="iconfont " :class="comment.user.gender==1?'nan icon-xingbie-nan ':'nv icon-xingbie-nv'"></i>
                        <span class="area">{{comment.user.province}} · {{comment.user.city}}</span>
                    </div>
                </div>
                <div class="time">{{comment.time}}</div>
            </div>
        </div>
        <div class="content">{{comment.content}}</div>
        <div class="re_play" v-if="comment.c_replay.length>0">作者回复：{{comment.c_replay}}</div>
        <div class="footer">

        </div>
    </div>
</template>
<script>
export default {
  props: {
    comment: Object
  }
};
</script>
<style lang="less">
@import "../styles/common.less";
.comment-item {
  padding: 10px 15px;
  border-bottom: 0.5px solid #f0f0f0;
  .top {
    display: flex;
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .r {
      display: flex;
      flex: 1;
      justify-content: space-between;
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;

        .name {
          font-size: 14px;
          color: #333;
          font-weight: bold;
        }
        .data-info {
          font-size: 12px;
          display: flex;
          align-items: center;
          .iconfont {
            font-size: 15px;
          }
          .nan {
            color: #7dbcfc;
          }
          .nv {
            color: #fe95a7;
          }
          .area {
            background: #95cdfc;
            color: white;
            margin-left: 10px;
            font-size: 10px;
            line-height: 15px;
            height: 15px;
            padding: 0 6px;
            border-radius: 3px;
          }
        }
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
  }
  .re_play{
    margin: 10px 0;
    font-size: 12px;
    color: #999;
    background: #f7f7f7;
    padding: 8px;
    border-radius: 3px;
  }
}
</style>
