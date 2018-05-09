<template>
  <div>
      <div class="tip-items">
          <div @click="click(item.suggestion)" class="tip-item" v-for="(item,index) in tips.suggestions" :key="index">{{item.suggestion}}</div>
      </div>
      <div  @click="click(query)" class="query-btn">查看「{{query}}」的搜索结果</div>
  </div>
</template>
<script>
export default {
  props:{
      tips:Array,
      query:String
  },
  methods:{
      click(query){
          this.$emit("tip-click",query)
      }
  }
}
</script>
<style lang="less">
@import '../../styles/common.less';
.tip-items{
    padding: 0 15px;
}
.tip-item{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    color: #666;
    border-bottom: 0.5px solid #f3f4f0;
}
.query-btn{
    color: @blue;
    font-size: 15px;
    padding:12px 0px;
    text-align: center;
    border-bottom: 0.5px solid #f3f4f0;
    font-weight: bold;
}
</style>

