<template>
  <div hover-class="hover" @tap="item_click" class="item" :class="{'line':menu.level>3,'group':menu.is_group}">
    <div :style="{'margin-left':(menu.level-1)*ml+'px'}" :class="'level-'+menu.level" class="label">
      <div class="title">
        <i v-if="menu.is_group" class="iconfont icon-mulu"></i>
        <span>{{menu.label}}</span>
      </div>
      <div class="status" v-if="!doc.buy_info.is_show && !menu.is_group">
        <i class="iconfont icon-suo " v-if="!menu.is_try"></i>
        <i class="iconfont icon-shidu try" v-else></i>
      </div>

    </div>
  </div>
</template>
<script>
import { toast } from "../../../utils";
export default {
  data() {
    return {
      ml: 20
    };
  },
  props: {
    menu: Object,
    doc: Object,
    host: String
  },
  methods: {
    item_click() {
      if (this.menu.is_group) {
        return false;
      }
      if (this.doc.buy_info.is_show || this.menu.is_try) {
        wx.navigateTo({
          url:"/pages/details/doc-page-info/main?link=" +this.menu.link
        });
      } else {
        toast.show("请先购买文档");
      }
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.item {
  .label {
    position: relative;
    font-size: 15px;
    padding: 10px;
    overflow: hidden;
    color: #333;
    display: flex;
    align-items: center;
    .title {
      flex: 1;
      overflow: hidden;
      display: flex;
      align-items: center;
      i{
        margin-right: 3px;
      }
    }
    .status {
      width: 60px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      i {
        color: #f56c6c;
      }
      .try {
        color: @blue;
      }
    }
  }
}
.group {
  background: #f7f7f7;
}
.line {
  /*.label::before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0;
    height: 18px;
    width: 6px;
    border-left: 1px solid #e7e7eb;
    border-bottom: 1px solid #e7e7eb;
  }
  .label::after {
    content: "";
    display: block;
    position: absolute;
    top: 18px;
    left: 0;
    height: 18px;
    width: 6px;
    border-left: 1px solid #e7e7eb;
  }*/
}
</style>

