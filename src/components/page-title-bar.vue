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
@title-h:20px;
.titles {
  margin: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 16px;
    color: #333;
    height:@title-h;
    font-weight: bold;
    padding-left: 10px;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    
  }
  .title::before{
    content: " ";
    height: 15px;
    position: absolute;
    border-left: 2px solid #333;
    top: 2.5px;
    left: 0;
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

