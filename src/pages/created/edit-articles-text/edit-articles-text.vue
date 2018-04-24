<template>
    <div class="edit-articles-text">
        <div class="textarea">
            <textarea :maxlength="5000" v-model="text" :focus="true" @confirm="confirm" />
        </div>
        <div class="font-count">{{text.length}}/5000</div>
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
    this.text = this.content[this.index].text;
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
  .font-count{
      padding:0 15px;
      font-size: 14px;
      color: #999;
  }
}
</style>
