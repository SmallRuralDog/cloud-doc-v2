<template>
  <div class="content-item">
    <div class="item-body">
      <div class="left">
        <template v-if="item.type==='image'">
          <img @click="image_click(['替换图片', '查看大图'])" :src="item.url" :style="image_style">

          <div @click="re_upload" class="image-bg" v-if="item.data.status !=='success'">
            <i class="weui-loading" v-if="item.data.status==='loading'"></i>

            <template v-if="item.data.status==='error'">
              <i class="iconfont icon-shibai"></i>
              <p>上传失败，点击重试</p>
            </template>
          </div>
        </template>
        <template v-if="item.type==='text'">
          <i @click="text_icon_click" class="text-icon iconfont icon-iconset0182"></i>
        </template>
        <template v-if="item.type==='video'">
          <img v-if="item.data.pic" :src="item.data.pic" :style="image_style">
          <div @click="re_upload_video" class="image-bg" v-if="item.data.status !=='view'">
            <i class="weui-loading" v-if="item.data.status==='loading'"></i>
            <i class="video-icon iconfont icon-shipin-" v-if="item.data.status==='success'" ></i>
            <template v-if="item.data.status==='error'">
              <i class="iconfont icon-shibai"></i>
              <p>上传失败，点击重试</p>
            </template>
          </div>
        </template>
      </div>
      <div class="right" @click="edit_text">{{item.text||'点击添加文字'}}</div>
    </div>
    <div class="footer-bar" v-if="item.type==='image'">
      <div class="bar-btn" :class="{'activity':cover===item.path}" @click="set_cover">
        <i class="iconfont icon-chenggong"></i>
        <span>封面</span>
      </div>
    </div>
    <template v-if="action">
      <div hover-class="btn-hover" class="del-btn action-btn" @click="del_item">
        <i class="iconfont icon-shanchu"></i>
      </div>
      <div hover-class="btn-hover" class="up-btn action-btn" v-if="index>0" @click="up_item">
        <i class="iconfont icon-icon--"></i>
      </div>
      <div hover-class="btn-hover" class="down-btn action-btn" v-if="index<count-1" @click="down_item">
        <i class="iconfont icon-icon--1"></i>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    index: Number,
    count: Number,
    action: {
      type: Boolean,
      default: false
    },
    cover:String
  },
  methods: {
    edit_text() {
      if (this.action) {
        wx.navigateTo({
          url: "/pages/created/edit-articles-text/main?index=" + this.index
        });
      }
    },
    image_click(itemList) {
      wx.showActionSheet({
        itemList: itemList,
        success: res => {
          if (res.tapIndex == 0) {
            this.$emit("replace-image", this.index);
          } else if (res.tapIndex == 1) {
            wx.previewImage({
              current: this.item.url,
              urls: [this.item.url]
            });
          } else if (res.tapIndex == 2) {
            this.$emit("re-upload-image", this.index);
          }
        }
      });
    },
    text_icon_click() {
      this.$emit("replace-image", this.index);
    },
    re_upload() {
      this.image_click(["替换图片", "查看大图", "重新上传"]);
    },
    re_upload_video(){
      if(!this.item.data.upload){
        this.$emit("re-upload-video", this.index);
      }

    },
    del_item() {
      wx.showModal({
        title: "提示",
        content: "你确定要删除此模块吗？",
        success: res => {
          if (res.confirm) {
            this.$emit("del-item", this.index);
          }
        }
      });
    },
    up_item() {
      this.$emit("up-item", this.index);
    },
    down_item() {
      this.$emit("down-item", this.index);
    },
    set_cover(){
      this.$emit("set-cover", this.index);
    }
  },
  computed: {
    image_style() {
      try {
        if (this.item.type == "image" || this.item.type == "video") {
          const ratio = this.item.data.width / this.item.data.height;
          let w = 80;
          let h = 80;
          if (this.item.data.width >= this.item.data.height) {
            h = 80;
            w = parseInt(80 * ratio);
          } else {
            w = 80;
            h = parseInt(80 / ratio);
          }
          return `width:${w}px;height:${h}px`;
        } else {
          return "";
        }
      } catch (error) {
        return `width:80px;height:80px`;
      }
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/weui-loading.less";
@import "../../../styles/common.less";
.content-item {
  position: relative;
  margin: 8px 15px;
  background: #f7f7f7;
  padding: 15px;
  border-radius: 3px;
  overflow: hidden;
  .item-body {
    display: flex;
    .left {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      position: relative;
      border-radius: 3px;
      .image-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        .iconfont {
          font-size: 20px;
          color: #ffffff;
        }
        .video-icon{
          font-size: 30px;
        }
        p {
          font-size: 7px;
          color: #ffffff;
        }
      }
      .text-icon {
        font-size: 70px;
        color: @warning;
      }
    }
    .right {
      height: 80px;
      flex: 1;
      font-size: 13px;
      line-height: 20px;
      overflow: hidden;
      margin-left: 10px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      white-space: normal;
      color: #666;
    }
  }
  .action-btn {
    position: absolute;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    i {
      font-size: 12px;
      color: #999;
    }
  }
  .del-btn {
    top: 0;
    left: 0;
    border-radius: 3px 0 50% 0;
  }
  .up-btn {
    top: 0;
    right: 0;
    border-radius: 0 0 0 50%;
  }
  .down-btn {
    bottom: 0;
    right: 0;
    border-radius: 50% 0 0 0;
  }
  .footer-bar{
    font-size: 12px;
    padding-top: 10px;
    .bar-btn{
      color: #999;
      display: flex;
      align-items: center;
      i{
        font-size: 14px;
        margin-right: 3px;
      }
    }
    .activity{
      color: @success;
    }
  }
}
</style>
