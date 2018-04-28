<template>
  <div class="edit-articles-text">
    <div class="textarea">
      <textarea v-model.lazy="text" :adjust-position="false" :auto-height="false" :maxlength="5000" :focus="true"
                @confirm="confirm"></textarea>
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
      this.text = this.content[this.index].text.slice() || "";
    },
    computed: {
      content() {
        return store.state.content;
      }
    },
    watch: {
      text(val) {
        store.commit("set_text", { index: this.index, text:val});
      }
    },
    methods: {
      confirm() {
        this.set_text()
      },
      set_text() {
        setTimeout(() => {
          wx.navigateBack();
        }, 500);
      },
      clear() {
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
    padding-bottom: 30px;
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
