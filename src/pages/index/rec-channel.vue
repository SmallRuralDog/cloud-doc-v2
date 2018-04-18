<template>
  <div>
    <page-title-bar title="重磅推荐" :more="false" />
    <div>
      <div class="line-list">

      </div>
      <scroll-view scroll-x>
        <div class="rec-list">
          <block v-for="(item,index) in items" :key="index">
            <card-item :id="item.id" :cover="item.cover.small_url" :title="item.category_name" :info="item.title" />
          </block>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
import CardItem from "../../components/doc-item/card-item-block";
import LineItem from "../../components/doc-item/card-item-line";
export default {
  components: {
    PageTitleBar,
    CardItem,
    LineItem
  },
  data() {
    return {};
  },
  props: {
    items: Array
  }
};
</script>
<style lang="less">
.line-list {
  padding: 0 15px;
}
.rec-list {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 7.5px;
}
</style>

