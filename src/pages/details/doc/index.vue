<template>
  <block>
    <div class="doc-index-page" v-if="init">
      <div class="header" :style="{'-webkit-transform':'scale('+scale+')' }">
        <div class="cover">
          <img class="blur" :src="doc.cover.big_url" />
        </div>
      </div>
      <div class="box box-sd title-view ">
        <div class="titles bg-fff">
          <div class="title">{{doc.title}}</div>
        </div>
        <div class="m-info">
          <div class="tags">
            <div v-for="item in doc.tags" :key="item.id" class="class-tag">{{item.name}}</div>
          </div>
          <div class="rgiht flex-r">
            <p class="mr-10">
              <i class="iconfont icon-dianzan"></i>
              <span>{{doc.subscribe_count}}</span>
            </p>
            <p>
              <i class="iconfont icon-pinglun"></i>
              <span>{{doc.comment_count}}</span>
            </p>
          </div>
        </div>
        <div class="abstract">{{doc.abstract}}</div>
        <div class="money-data">
          <div class="top" v-if="doc.doc_type==1">
            <div class="money-title" v-if="false">文档价格：</div>
            <div class="money y-money">{{doc.money}}</div>
          </div>
          <div class="last-info">
            <span class="mr-10" v-if="doc.last_update">最后更新：{{doc.last_update.updated_format}}</span>
            <span>共有{{doc.page_count}}个章节</span>
          </div>
          <a :href="'/pages/details/doc-menu/main?id='+doc.id" class="menu-link">
            <div class="title">
              <i class="iconfont icon-mulu"></i>
              <span>查看目录</span>
            </div>
            <i class="iconfont icon-moreinfo-copy"></i>
          </a>
        </div>
      </div>
      <div class="h-view"></div>
      <div class="box">
        <div class="box-title">
          <span class="title">作者</span>
        </div>
        <div class="user-data-view">
          <user-item  :user="doc.user" />
        </div>
      </div>
      <div class="h-view"></div>
      <div class="box" v-if="false">
        <div class="box-title">
          <span class="title">Ta们觉得有用</span>
          <span>153人</span>
        </div>
        <div class="zan-list">
          <div class="list-view" v-if="false"></div>
          <div v-else class="empty">空空如也~</div>
        </div>
        <div class="danquan-btn" v-if="false">
          <div class="btn">进入档圈</div>
        </div>
      </div>
      <div class="h-view"></div>
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
          <a :href="'/pages/details/doc-menu/main?id='+doc.id" class="btn join">查看文档</a>
        </block>
        <block v-else>
          <button v-if="doc.doc_type==1" @click="buy" :loading="pay_loading" :disabled="pay_loading" class="btn try">赞助阅读</button>
        </block>
      </div>
      <comment-add-view :id="doc.id" mode="doc" v-if="show_add_comment" @close="close_add_comment" @success="comment_success" />

      <load-more :meta="comments_data.meta" :page="page" :error="page_error" :loading="page_loading" @page-reload="page_reload" @load-more="load_more" />
    </div>
    <div v-else>
      <status-view :status="status" @re_load="re_load" />
    </div>
  </block>
</template>
<script>
import { http, toast, user } from "../../../utils";
import CommentItem from "../../../components/comment-item";
import UserItem from "../../../components/user-item";
import CommentAddView from "../../../components/comment-add-view";
import LoadMore from "../../../components/load-more";
import StatusView from "../../../components/status-view";
export default {
  components: {
    StatusView,
    UserItem,
    CommentItem,
    CommentAddView,
    LoadMore
  },
  data() {
    return {
      init: false,
      status: "loading",
      doc: {},
      id: "",
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
  onUnload() {
    this.init = false;
    this.status = "loading";
  },
  mounted() {
    this.id = this.$root.$mp.query.id || "O3GWpmbk5ezJn4KR";
    this.getData();
  },
  computed: {
    scale() {
      if (this.scrollTop >= 0) {
        return 1;
      } else {
        return 1 + this.scrollTop * -1 / 1000;
      }
    }
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
        .get("v1/doc-index", { id: this.id })
        .then(res => {
          this.init = true;
          this.doc = res.data.doc;
          this.comments_data = res.data.doc_comment;
          wx.setNavigationBarTitle({
            title: this.doc.title
          });
          wx.setNavigationBarColor({
            frontColor: this.doc.font_color,
            backgroundColor: this.doc.nav_color
          });
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
          this.page = res.data.meta.current_page
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
          .post("v1/buy", { id: this.doc.id, type: "doc" })
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
    }
  },
  onPullDownRefresh() {
    this.page = 1;
    this.page_error = false;
    this.getData();
  },
  onPageScroll(e) {
    //this.scrollTop = e.scrollTop;
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
@cover-size: 375px;
@bh: 80px;
.doc-index-page {
  padding-bottom: 60px;
}
.box {
  margin: 10px 15px;
  position: relative;
  .box-title {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
    .title {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
  }
}
.box-sd {
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
}
.header {
  /*position: fixed;
  top: 0;
  left: 0;
  right: 0;*/
  .cover {
    width: @cover-size;
    height: @cover-size/1.75;
    overflow: hidden;
    img {
      width: @cover-size;
      height: @cover-size/1.75;
    }
  }
}
.title-view {
  margin-top: -40px;
  position: relative;
  background: white;
  .titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 20px;
      line-height: 30px;
      font-weight: bold;
      color: #333;
    }
  }
  .m-info {
    display: flex;
    justify-content: space-between;
    .tags {
      padding: 8px 0;
      display: flex;

      .class-tag {
        margin-right: 3px;
        line-height: 15px;
        height: 15px;
        flex-shrink: 0;
        overflow: hidden;
        padding: 0 7px;
        border-radius: 2px;
        font-size: 10px;
        color: @blue;
        max-width: 80px;
        border: 1rpx solid @blue;
      }
    }
    .rgiht {
      font-size: 10px;
      color: #999;
      p {
        i {
          font-size: 10px;
          margin-right: 2px;
        }
        display: flex;
        align-items: baseline;
      }
    }
  }

  .abstract {
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-bottom: 10px;
  }
  .money-data {
    .top {
      display: flex;
      align-items: baseline;
      color: @blue;
      font-size: 14px;
      font-weight: bold;
      .money {
        font-size: 30px;
      }
    }
    .last-info {
      display: flex;
      font-size: 10px;
      color: #999;
      margin-top: 10px;
      span {
        line-height: 1;
        background: #f0f0f0;
        padding: 4px;
        border-radius: 2px;
      }
    }
    .menu-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #666;
      margin-top: 10px;
      .title {
        display: flex;
        align-items: center;
        i {
          margin-right: 3px;
        }
      }
      i {
        font-size: 14px;
      }
    }
  }
}
.user-data-view {
  background: #f7f7f7;
  border-radius: 5px;
  margin-top: 10px;
}
.zan-list {
  .empty {
    font-size: 12px;
    line-height: 60px;
    text-align: center;
    color: #999;
  }
}
.danquan-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    font-size: 14px;
    line-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 10px;
    border-radius: 5px;
    padding: 0px 30px;
    background: @blue;
    color: white;
    box-shadow: 0 0 3px @blue;
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

