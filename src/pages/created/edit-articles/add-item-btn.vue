<template>
  <div class="add-item-btn" v-if="(index==0 && type=='up') || type=='down'">
    <div @click="show_btns" class="add-plus" v-if="!show_btn">
      <i class="iconfont icon-shangchuan"></i>
    </div>
    <div class="add-btn-list" v-else>
      <div class="add-btn" @click="add_item('text')">
        <i class="iconfont icon-iconset0182"></i>
      </div>
      <div class="add-btn" @click="add_item('image')">
        <i class="iconfont icon-tupian"></i>
      </div>
      <div class="add-btn" @click="add_item('video')">
        <i class="iconfont icon-shipin-"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: Number,
    count: Number,
    type: String,
    showIndex: Number,
    showType: String
  },
  data() {
    return {};
  },
  methods: {
    add_item(type) {
      this.$emit("add-item", {
        item: type,
        index: this.index,
        type: this.type
      });
    },
    show_btns() {
      this.$emit("show-btn", { index: this.index, type: this.type });
    }
  },
  computed: {
    show_btn() {
      return this.index == this.showIndex && this.type == this.showType;
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.add-item-btn {
  display: flex;
  justify-content: center;
  .add-btn-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background: #f7f7f7;
    border-radius: 15px;
    .add-btn {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 20px;
        color: @blue;
      }
    }
  }
  .add-plus {
    background: #f7f7f7;
    height: 25px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    i {
      font-size: 12px;
      color: #bbb;
    }
  }
}
</style>
