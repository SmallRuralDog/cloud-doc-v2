<template>
  <div>
    <div class="article-index-page" v-if="init">
      <div class="book-detail">
        <div class="book-cover">
          <img class="cover" :src="doc.cover.big_url" />
        </div>
        <div class="book-cell">
          <div class="book-title">{{doc.title}}</div>
          <div class="book-meta">
            <i class="iconfont icon-yonghu"></i>
            <span>{{doc.user.name}}</span>
          </div>
          <div class="book-class-info">
            <span class="type">{{doc.category_name}} ‧ </span>
            <span>{{doc.listened_count}}人在看</span>
          </div>
          <div class="book-tags">
            <span class="tag" v-for="item in doc.tags" :key="item.id">{{item.name}}</span>
          </div>
          <div class="priceBox ">
            <span>价格：</span>
            <span class="y-money" v-if="doc.doc_type===1">{{doc.money}}</span>
            <span v-else>免费</span>
          </div>
        </div>
      </div>
      <div class="share-btns">
        <button size="mini" v-if="doc.buy_info.is_subscribe">已收藏</button>
        <button @tap="subscribe()" size="mini" v-else>加入收藏</button>
        <button open-type="share" size="mini">分享好友</button>
        <button @click="share_qrcode" size="mini">分享朋友圈</button>
      </div>
      <div class="book-intro-cat">
        <div class="book-summary">
          <div class="book-summary-h">简介</div>
          <div class="abstract">{{doc.abstract}}</div>
        </div>
        <a :href="'/pages/details/article-menu/main?id='+doc.id" class="book-detail-bar">
          <div class="book-meta-l">
            <span class="menu">查看列表</span>
            <span class="pages">共{{doc.article_count}}篇</span>
          </div>
          <div class="book-meta-r" v-if="doc.last_article">
            更新于{{doc.last_article.updated_format}}
            <i class="iconfont icon-moreinfo-copy"></i>
          </div>
        </a>
      </div>
      <div class="box">
        <div class="box-title">
          <span class="title">评论</span>
          <span></span>
        </div>
        <div class="comment-list" v-if="comments_data">
          <comment-item v-for="item in comments_data.data" :comment="item" :key="item" />
        </div>
      </div>
      <div class="footer-bar">
        <div @tap="subscribe()" class="icon-btn" :class="{'yes':doc.buy_info.is_subscribe}">
          <i class="iconfont icon-dianzan"></i>
          <p>有用</p>
        </div>
        <div class="icon-btn" v-if="true" @click="add_comment">
          <i class="iconfont icon-pinglun"></i>
          <p>评论</p>
        </div>
        <block v-if="doc.buy_info.is_show">
          <a :href="'/pages/details/article-menu/main?id='+doc.id" class="btn join">查看文集</a>
        </block>
        <block v-else>
          <button v-if="doc.doc_type===1" @click="buy" :loading="pay_loading" :disabled="pay_loading" class="btn try">
            赞助阅读
          </button>
        </block>
      </div>
      <comment-add-view :id="doc.id" mode="doc" v-if="show_add_comment" @close="close_add_comment"
                        @success="comment_success" />

      <load-more :meta="comments_data.meta" :page="page" :error="page_error" :loading="page_loading"
                 @page-reload="page_reload" @load-more="load_more" />

    </div>
    <div v-else>
      <status-view :status="status" @re_load="re_load" />
    </div>
  </div>
</template>
<script>
  import { http, toast, user,navigate } from "../../../utils";
  import store from "../../member/login/store";
  import LoadMore from "../../../components/load-more";
  import StatusView from "../../../components/status-view";
  import CommentItem from "../../../components/comment-item";
  import CommentAddView from "../../../components/comment-add-view";

  export default {
    components: {
      StatusView,
      CommentItem,
      LoadMore,
      CommentAddView
    },
    data() {
      return {
        init: false,
        status: "loading",
        doc: {},
        id: "",
        share_id: "",
        scrollTop: 0,
        pay_loading: false,
        show_add_comment: false,
        page: 1,
        page_loading: false,
        page_error: false,
        comments_data: {
          data: [],
          meta: {}
        }
      };
    },
    computed: {
      user() {
        return store.state.user;
      },
      token() {
        return store.state.token;
      }
    },
    watch: {
      token(val, ov) {
        if (this.id) {
          this.re_load();
        }
      }
    },
    onUnload() {
      this.init = false;
      this.status = "loading";
    },
    mounted() {
      this.id = this.$root.$mp.query.id || "kwd9jL0aK1ZQX8yR";
      this.share_id = this.$root.$mp.query.share || "";
      this.getData();
    },
    methods: {
      load_more() {
        if (this.loading) return;
        this.page_loading = true;
        this.get_comment(this.page + 1);
      },
      re_load() {
        this.status = "loading";
        this.getData();
      },
      page_reload() {
        if (this.loading) return;
        this.page_loading = true;
        this.page_error = false;
        this.get_comment(this.page + 1);
      },
      getData() {
        http
          .get("v1/article-index", { id: this.id })
          .then(res => {
            this.init = true;
            this.doc = res.data.doc;
            this.comments_data = res.data.doc_comment;
            /*wx.setNavigationBarTitle({
              title: this.doc.title
            });*/
            wx.setNavigationBarColor({
              frontColor: this.doc.font_color,
              backgroundColor: this.doc.nav_color
            });
            wx.updateShareMenu()
          })
          .catch(err => {
            this.status = "error";
          });
      },
      get_comment(page) {
        http
          .get("v1/comment-list", {
            page: page,
            mode: "doc",
            id: this.doc.id
          })
          .then(res => {
            if (page == 1) {
              this.comments_data = res.data;
            } else {
              let oldData = this.comments_data.data;
              res.data.data.map(item => {
                oldData.push(item);
              });
              this.comments_data = {
                data: oldData,
                meta: res.data.meta
              };
            }
            this.page = res.data.meta.current_page;
            this.page_loading = false;
          })
          .catch(err => {
            this.page_loading = false;
            this.page_error = true;
          });
      },
      subscribe() {
        if (user.check_login()) {
          this.doc.buy_info.is_subscribe = !this.doc.buy_info.is_subscribe;
          http.get("v1/subscribe-doc", { id: this.doc.id }).then(res => {
            this.doc.buy_info.is_subscribe = res.status == "on" ? true : false;
          });
        }
      },
      buy() {
        if (user.check_login()) {
          this.pay_loading = true;
          http
            .post("v1/buy", { id: this.doc.id, type: "doc", share_id: this.share_id })
            .then(res => {
              this.pay_loading = false;
              wx.requestPayment({
                timeStamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: res => {
                  toast.show("支付成功");
                  setTimeout(() => {
                    this.getData();
                  }, 1000);
                },
                fail: res => {
                  toast.show("支付取消");
                }
              });
            })
            .catch(err => {
              this.pay_loading = false;
            });
        }
      },
      add_comment() {
        this.show_add_comment = true;
      },
      close_add_comment() {
        this.show_add_comment = false;
      },
      comment_success(data) {
        this.comments_data.data.unshift(data);
        this.show_add_comment = false;
      },
      share_qrcode() {
        navigate.open_web(this.doc.share_data.qr_code)
      }
    },
    onPullDownRefresh() {
      this.page = 1;
      this.page_error = false;
      this.getData();
    },
    onShareAppMessage() {
      return {
        title: this.doc.share_data.title,
        imageUrl: this.doc.share_data.image,
        path: this.doc.share_data.xcx_url,
      }
    }
  };
</script>
<style lang="less">
  @import "../../../styles/common.less";

  @cover-size: 80px;
  @title-h: 20px;
  .box {
    position: relative;
    .box-title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
      .title {
        font-size: 16px;
        color: #333;
        height: @title-h;
        font-weight: bold;
        padding-left: 10px;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin: 10px 15px;
      }
      .title::before {
        content: " ";
        height: 15px;
        position: absolute;
        border-left: 2px solid #333;
        top: 2.5px;
        left: 0;
      }
    }
  }

  .article-index-page {
    padding-bottom: 60px;
    .book-detail {
      display: flex;
      padding: 10px 15px;
      .book-cover {
        position: relative;
        flex-shrink: 0;
        margin-right: 15px;
        .cover {
          width: @cover-size;
          height: @cover-size/0.75;
          vertical-align: bottom;
          display: block;
          box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
      }
      .book-cell {
        flex: 1;
        overflow: hidden;
        color: #979797;
        .book-title {
          color: #333;
          font-weight: 500;
          line-height: 1.1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 17px;
        }
        .book-meta {
          margin-top: 9px;
          display: flex;
          align-items: center;
          font-size: 12px;

          i {
            font-size: 12px;
            margin-right: 3px;
          }
        }
        .book-class-info,
        .versions {
          font-size: 12px;
          margin-top: 9px;
        }
        .book-tags {
          display: flex;
          margin-top: 9px;
          .tag {
            font-size: 10px;
            line-height: 14px;
            height: 14px;
            overflow: hidden;
            border: 0.5px solid #dcdcdc;
            border-radius: 2px;
            color: #888;
            padding: 0 5px;
            margin-right: 3px;
          }
        }
        .priceBox {
          font-size: 12px;
          margin-top: 5px;
          .y-money {
            font-size: 20px;
            font-weight: bold;
            color: @blue;
          }
        }
      }
    }
    .share-btns {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      button {
        margin: 0;
        flex: 1;
        color: #666;
      }
      button:first-child {
        margin-right: 15px;
      }
      button:last-child {
        margin-left: 15px;
      }
      button:after {
        border: none;
      }
    }
    .book-intro-cat {
      border-top: 5px solid #f7f7f7;
      border-bottom: 5px solid #f7f7f7;

      position: relative;
      .book-summary-h {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .book-summary {
        padding: 10px 15px 0 15px;
      }
      .abstract {
        font-size: 13px;
        color: #666;
        line-height: 20px;
        text-align: justify;
      }
      .abstract-close {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        max-height: 20px;
        overflow: hidden;
      }
      .book-summary-more {
        position: absolute;
        right: 15px;
        bottom: 10px;
        margin-left: 8px;
        i {
          font-size: 18px;
          transform: rotate(90deg);
        }
      }
      .book-detail-bar {
        display: flex;
        border-top: 0.5px solid #f7f7f7;
        margin-top: 15px;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 15px;
        .book-meta-l {
          display: flex;
          align-items: center;
          .menu {
            font-size: 16px;
            color: #333;
            font-weight: bold;
            margin-right: 10px;
          }
          .pages {
            font-size: 13px;
            color: #999;
          }
        }
        .book-meta-r {
          display: flex;
          align-items: center;
          font-size: 10px;
          color: #999;
          i {
            font-size: 13px;
          }
        }
      }
    }
  }

  .footer-bar {
    display: flex;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    background: white;
    box-shadow: 0 -1px 5px #f0f0f0;
    z-index: 9;
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
    .yes {
      color: @blue;
      font-weight: bold;
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
    .try {
      background: #ecb874;
      color: white;
      box-shadow: 0 0 3px #ecb874;
    }
    .join {
      background: @blue;
      color: white;
      box-shadow: 0 0 3px @blue;
    }
  }
</style>
