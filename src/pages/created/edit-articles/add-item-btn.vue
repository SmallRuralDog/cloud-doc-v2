<template>
    <div class="add-item-btn" v-if="(index==0 && type=='up') || type=='down'">
        <div class="add-plus" v-if="false">
            <i class="iconfont icon-shangchuan"></i>
        </div>
        <div class="add-btn-list">
            <div class="add-btn">
                <i class="iconfont icon-iconset0182"></i>
            </div>
            <div class="add-btn">
                <i class="iconfont icon-tupian"></i>
            </div>
            <div class="add-btn">
                <i class="iconfont icon-shipin-"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        index:Number,
        count:Number,
        type:String
    }
}
</script>
<style lang="less">
@import '../../../styles/common.less';
.add-item-btn {
  display: flex;
  justify-content: center;
  .add-btn-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    background: #f7f7f7;
    border-radius: 15px;
    .add-btn{
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 20px;
            color: @blue;
        }
    }
  }
  .add-plus {
    background: #f7f7f7;
    height: 20px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 0.5px solid #dcdcdc;
    i {
      font-size: 12px;
      color: #bbb;
    }
  }
}
</style>
