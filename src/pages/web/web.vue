<template>
  <div v-if="init">
    <web-view :src="src"></web-view>
  </div>
</template>
<script>
import { user } from "../../utils";
export default {
  data() {
    return {
      init: false,
      url: "",
      src: ""
    };
  },
  onUnload() {
    this.init = false;
  },
  mounted() {
    this.url = decodeURIComponent(this.$root.$mp.query.url);
    this.src = this.url + "&token=" + user.get_token()
    console.log(this.src);
    this.init = true;
    wx.hideShareMenu()
  }
};
</script>


