<template>
  <div class="nav-bar" :style="[{' padding-top':statusBarHeight+'px'},style]">
      <slot name="body"></slot>
  </div>
</template>
<script>
import store from '../store'
export default {
  props:{
    style:{
      type:Object
    }
  },
  computed:{
    statusBarHeight(){
      return store.state.system_info.statusBarHeight
    }
  }
}
</script>
<style lang="less">
@import '../styles/common.less';
.nav-bar{
  height: 44px;
  display: flex;
  align-items: center;
  /*position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;*/
}
.nav-bar-border{
  border-bottom: 0.5px solid #dcdcdc;
}

</style>

