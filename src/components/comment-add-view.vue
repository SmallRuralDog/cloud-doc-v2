<template>
    <div>
        <div class="bg"></div>
        <div class="comment-add-view">
            <textarea :maxlength="120" v-model="content" :adjust-position="false" :fixed="true" :cursor-spacing="130" :placeholder="placeholder"></textarea>
            <div class="btns">
                <button size="mini" @click="close">取消</button>
                <button :disabled="disabled" :loading="submit_loading" size="mini" @click="submit">发布</button>
            </div>
        </div>
    </div>
</template>
<script>
import { http, user } from "../utils";
export default {
  data() {
    return {
      placeholder: "优质评论将会优先展示哦~",
      content: "",
      submit_loading: false
    };
  },
  props: {
    id: String,
    mode: String
  },
  computed: {
    disabled() {
      return this.content.length < 1 || this.content.length > 120;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      if (user.check_login()) {
        this.submit_loading = true;
        http
          .post("v1/add-comment", {
            id: this.id,
            mode: this.mode,
            content: this.content
          })
          .then(res => {
            this.submit_loading = false;
            this.$emit("success",res.data);
          })
          .catch(err => {
            this.submit_loading = false;
          });
      }
    }
  }
};
</script>
<style lang="less">
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  z-index: 99;
}
.comment-add-view {
  height: 150px;
  width: 90vw;
  background: white;
  position: fixed;
  border-radius: 5px;
  top: 20vh;
  left: 5vw;
  right: 0;
  padding: 15px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  z-index: 100;
  textarea {
    flex: 1;
    background: #f7f7f7;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 14px;
    width: auto;
  }
  .btns {
    display: flex;
    margin-top: 15px;
    align-items: center;
    justify-content: space-between;
    button {
      margin: 0;
    }
  }
}
</style>

