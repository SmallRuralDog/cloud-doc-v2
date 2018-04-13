<template>
  <div>
    <div v-for="(item,index1) in list" :key="index1">
      <page-title-bar :title="item.title" :more="false" />
      <div class="class-list">
        <block v-for="(doc,index2) in item.docs" :key="index2">
          <card-item :id="doc.id" :cover="doc.cover.small_url" :title="doc.tags[0].name" :info="doc.title" />
        </block>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
import CardItem from "../../components/card-item-half";
export default {
  components: {
    PageTitleBar,
    CardItem
  },
  data() {
    return {};
  },
  props: {
    list: Array
  }
};
</script>
<style lang="less">
.class-list {
  display: flex;
  flex-wrap: wrap;
}
</style>

