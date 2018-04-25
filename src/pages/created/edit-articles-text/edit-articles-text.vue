<template>
  <div class="edit-articles-text">
    <div class="textarea">
      <textarea :maxlength="5000" v-model="text" :focus="true" @confirm="confirm" ></textarea>
    </div>

    <div style="display: flex;justify-content: space-between; padding: 0 15px; align-items: center;">
      <div class="font-count">{{text.length}}/5000</div>
      <div>
        <button @click="clear" size="mini" style="margin: 0 10px 0px 0;">清空</button>
        <button @click="confirm" type="primary" size="mini" style="margin: 0">完成</button>
      </div>

    </div>
  </div>
</template>
<script>
  import store from "../edit-articles/store";

  export default {
    data() {
      return {
        index: 0,
        text: ""
      };
    },
    mounted() {
      this.index = this.$root.$mp.query.index;
      this.text = this.content[this.index].text || "";
    },
    watch: {
      text(val, old) {
        store.commit("set_text", { index: this.index, text: val });
      }
    },
    computed: {
      content() {
        return store.state.content;
      }
    },
    methods: {
      confirm(event) {
        wx.navigateBack();
      },
      clear(){
        wx.showModal({
          title: "提示",
          content: "你确定要清空文本吗？",
          success: res => {
            if (res.confirm) {
              this.text = ''
            }
          }
        });
      }
    }
  };
</script>
<style lang="less">
  .edit-articles-text {
    .textarea {
      display: flex;
      margin: 15px;
      padding: 10px;
      border-radius: 3px;
      background: #f7f7f7;
      textarea {
        flex: 1;
        font-size: 15px;
      }
    }
    .font-count {
      font-size: 14px;
      color: #999;
    }
  }
</style>
