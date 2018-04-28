<template>
  <div class="article-page-info" v-if="init">
    <template v-if="!no_access">
      <div class="article-body">
        <h3 class="title">{{article.title}}</h3>
        <div class="media">
          <img class="avatar" :src="article.user.avatar" />
          <span class="name">{{article.user.name}}</span>
          <span class="time">{{article.updated_format}}</span>
        </div>
        <div class="content">
          <div v-for="(item,index) in content.node" :key="index">
            <img-item v-if="item.image" @img-click="img_click" :index="index" :image="item.image" />
            <video-item v-if="item.video" :index="index" :video="item.video" />
            <rich-text :nodes="item.text" type="text"></rich-text>
          </div>
        </div>
        <div class="operation">
          <button open-type="share" class="operation-btn">
            <i class="iconfont icon-share"></i>
            <span>分享</span>
          </button>
          <button @click="like" class="operation-btn">
            <i class="iconfont icon-praise"></i>
            <span>{{article.likers_count}}</span>
          </button>
          <button class="operation-btn" @click="report">
            <i class="iconfont icon-warning"></i>
            <span>举报</span>
          </button>
        </div>
      </div>
    </template>
    <div v-else>
      <div class="no-access">
        <i class="iconfont icon-guanyuwomen"></i>
        <p>{{no_access.title || '文章无法查看'}}</p>
      </div>
      <div class="btns">
        <button @click="go_home()">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { http, toast, navigate, user } from "../../../utils";
  import ImgItem from "./img-item";
  import VideoItem from "./video-item";

  export default {
    name: "article-node-page",
    components: {
      ImgItem,
      VideoItem
    },
    data() {
      return {
        init: false,
        id: "",
        no_access: false,
        article: {},
        content: ""
      };
    },
    onUnload() {
      this.init = false;
    },
    mounted() {
      this.id = this.$root.$mp.query.id || "jq8oew1bX0BEXgZM";
      toast.showLoading();
      this.getData();
    },
    methods: {
      go_home() {
        navigate.go_home();
      },
      getData() {
        http.get("v1/article-page-info?id=" + this.id).then(res => {
          toast.hideLoading();
          if (res.data.no_access) {
            this.no_access = res.data.no_access;
          } else {
            this.article = res.data.article;
            this.content = this.article.content;
            wx.updateShareMenu();
            if (this.article.share_data.length <= 0) {
              wx.hideShareMenu()
            }
          }
          this.init = true;
        });
      },
      img_click(src) {
        wx.previewImage({
          current: src,
          urls: this.content.images
        });
      },
      like() {
        if (user.check_login()) {
          http.get("v1/like-article?id=" + this.article.id).then(res => {
            if (res.status === 'on') {
              this.article.likers_count++
            } else {
              this.article.likers_count--
            }
          })
        }
      },
      report() {
        navigate.open_web(this.article.share_data.report)
      }
    },
    onShareAppMessage() {
      return {
        title: this.article.share_data.title,
        imageUrl: this.article.share_data.image,
        path: this.article.share_data.xcx_url,
      }
    }
  };
</script>

<style lang="less">
  .article-page-info {
    padding: 0 15px;
    margin-bottom: 50px;
    .article-body {
      color: #343434;
      .title {
        font-size: 22px;
        text-align: justify;
        line-height: 30px;
        padding: 12px 0;
        margin: 0;
        color: #333;
        font-family: "Helvetica Neuce", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sans-serif;
        word-break: break-all;
        font-weight: bold;
      }
      .media {
        display: flex;
        align-items: center;
        font-size: 12px;
        .avatar {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .name {
          font-size: 14px;
          color: #333;
          margin-right: 8px;
        }
        .time {
          font-size: 14px;
          color: #bbb;
        }
      }
      .content {
        font-size: 17px;
        line-height: 27px;
        text-align: justify;
        margin: 0 0 20px 0;
        color: #333;
        .item-p,
        .item-h1,
        .item-h2,
        .item-h3,
        .item-h4,
        .item-h5,
        .item-h6 {
          margin: 17px 0;
          word-wrap: break-word;
        }
        .item-h1,
        .item-h2,
        .item-h3,
        .item-h4,
        .item-h5,
        .item-h6 {
          font-size: 20px;
        }
      }
    }
    .no-access {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #999;
      .iconfont {
        font-size: 80px;
        color: #1a82d2;
      }
      p {
        font-size: 14px;
      }
    }
    .operation {
      display: flex;
      height: 80px;
      align-items: center;
      justify-content: space-between;
      .operation-btn {
        background: #f7f7f7;
        border-radius: 5px;
        font-size: 14px;
        color: #666666;
        flex: 1;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        .iconfont {
          font-size: 20px;
          margin-right: 3px;
          color: #999;
        }
      }
      .operation-btn:first-child {
        margin-right: 15px;
      }
      .operation-btn:last-child {
        margin-left: 15px;
      }
      button:after {
        border: none;
      }
    }
  }
</style>
