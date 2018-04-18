<template>
  <div>
    <div v-for="(item,index1) in list" :key="index1">
      <page-title-bar :title="item.title" :more="false" />
      <channel-body :list="item.docs"/>
    </div>
  </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
import ChannelBody from './layout/channel-body';
export default {
  components: {
    ChannelBody,
    PageTitleBar
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

