<template>
    <div class="upload-image-view" :style="{'width':w,'height':h}">
        <img :style="{'width':w,'height':h}" :src="url">
        <div class="bg" v-if="status !=='view'">
            <i class="weui-loading" v-if="status=='uploading'"></i>
            <icon type="success" size="16" v-if="status=='success'"/>
            <icon type="error" size="16" v-if="status=='error'"/>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    w: String,
    h: String,
    url: String,
    status: {
        type:String,
        default:"view"
    }
  }
};
</script>
<style lang="less">
@import "../styles/weui-loading.less";
.upload-image-view {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.3);
  }
}
</style>

