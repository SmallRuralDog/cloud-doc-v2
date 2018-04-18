<template>
  <swiper previous-margin="20px" next-margin="20px" :indicator-dots="false" :autoplay="true" :circular="true">
    <block v-for="(item,index) in banners" :key="index">
      <swiper-item class="">
        <div class="swiper-item-box">
          <a @click="item_click(item)" class="swiper-item-link">
            <img class="swiper-item-image" :src="item.cover" />
          </a>
        </div>
      </swiper-item>
    </block>
  </swiper>
</template>
<script>
import {adevent} from '../../utils'
export default {
  components: {},
  data() {
    return {
    };
  },
  props:{
    banners:Array
  },
  methods:{
    item_click(item){
      adevent.click(item)
    }
  }
};
</script>
<style lang="less">
@swiper-w: 375px;
swiper {
  width: @swiper-w;
  height: @swiper-w/(768/346);
}
.swiper-item-box {
  padding: 7.5px;
}
.swiper-item-link {
  width: @swiper-w - 55;
  height: (@swiper-w - 55)/(768/346);
  box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  overflow: hidden;
}
.swiper-item-image {
  width: @swiper-w - 55;
  height: (@swiper-w - 55)/(768/346);
}
</style>
