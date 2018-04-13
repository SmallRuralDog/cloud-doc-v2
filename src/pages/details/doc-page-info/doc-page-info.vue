<template>
  <div v-if="init">
    <web-view :src="src"></web-view>
  </div>
</template>
<script>
import { user } from "../../../utils";
export default {
  data() {
    return {
      init:false,
      link:'',
      src: ""
    };
  },
  onUnload(){
    this.init = false
  },
  mounted() {
    this.link = decodeURIComponent(this.$root.$mp.query.link);
    const url = this.link + "&token=" + user.get_token();
    console.log(url);
    this.src = url;
    this.init = true
  }
};
</script>
