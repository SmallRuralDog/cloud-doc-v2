<template>
  <div>
    <banner></banner>
    <grid-menu></grid-menu>
    <rec-channel></rec-channel>
    <class-channel></class-channel>
  </div>
</template>
<script>
import Banner from "./banner";
import GridMenu from "./grid-menu";
import RecChannel from "./rec-channel";
import ClassChannel from "./class-channel";
export default {
  components: {
    Banner,
    GridMenu,
    RecChannel,
    ClassChannel
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">

</style>


