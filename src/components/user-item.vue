<template>
    <div class="user-data">
        <div class="left">
            <img :src="user.avatar" />
            <div class="user-info">
                <div class="name">{{user.name}}</div>
                <div class="data-info">
                    <span>{{user.fans}}人关注</span>
                    <span>{{user.doc_num}}篇文档</span>
                </div>
            </div>
        </div>
        <button @click="follow" :type="user.is_follow?'default':'primary'" size="mini">{{user.is_follow?'已关注':'关注'}}</button>
    </div>
</template>
<script>
import { http, user } from "../utils";
export default {
  props: {
    user: Object
  },
  methods: {
    follow() {
      if (user.check_login()) {
        this.user.is_follow = !this.user.is_follow;
        http.post("v1/follow-user", { id: this.user.id }).then(res => {
          if (res.status == "on") {
            this.user.is_follow = true;
          } else {
            this.user.is_follow = false;
          }
        });
      }
    }
  }
};
</script>
<style lang="less">

.user-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
  padding: 12px;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      .name {
        color: #666;
      }
      .data-info {
        font-size: 10px;
        color: #999;
        span {
          margin-right: 5px;
        }
      }
    }
  }
  button {
    margin: 0;
  }
}
</style>


