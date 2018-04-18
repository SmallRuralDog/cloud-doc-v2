<template>
  <div class="main">
      <div class="grid-menu">
          <div @click="item_click(item)" class="menu-item" v-for="(item,index) in menus" :key="index">
              <img :src="item.cover"/>
              <p>{{item.title}}</p>
          </div>
      </div>
  </div>
</template>
<script>
import {adevent} from '../../utils'
export default {
  props:{
      menus:Array
  },
  methods:{
    item_click(item){
      adevent.click(item)
    }
  }
}
</script>

<style lang="less">
.grid-menu {
  display: flex;
  height: 70px;
  .menu-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 36px;
      height: 36px;
      margin-bottom: 7px;
    }
    p{
        font-size: 12px;
        color: #666;
    }
  }
}
</style>
