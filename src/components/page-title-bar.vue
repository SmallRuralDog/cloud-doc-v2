<template>
   <div class="titles">
          <div class="title">{{title}}</div>
          <a v-if="more" :href="href" class="more">{{more}} <i class="iconfont icon-moreinfo-copy"></i></a>
      </div>
</template>
<script>
export default {
  props:{
      title:{
          type:String
      },
      more:{
          type:String/Boolean,
          default:"更多"
      },
      href:String
  }
}
</script>

<style lang="less">
.titles {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 18px;
    color: #333;
  }
  .more {
    font-size: 12px;
    display: flex;
    align-items: baseline;
    color: #999;
    i {
      font-size: 12px;
    }
  }
}
</style>

