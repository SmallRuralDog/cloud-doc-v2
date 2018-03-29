<template>
  <swiper previous-margin="0" next-margin="0" :indicator-dots="true" :autoplay="true">
    <swiper-item class="" v-for="(item,index) in imgUrls" :key="index">
      <div class="swiper-item-box">
        <a class="swiper-item-link" href="/pages/details/doc/main">
          <img class="swiper-item-image" :src="item" />
        </a>

      </div>
    </swiper-item>
  </swiper>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      imgUrls: [
        "https://static-1253442168.image.myqcloud.com/banner/None_d41d8cd98f00b204e9800998ecf8427e_WB8ddVR.jpg-bannerhd768",
        "https://static-1253442168.image.myqcloud.com/banner/None_d41d8cd98f00b204e9800998ecf8427e_dWqN51X.jpg-bannerhd768",
        "https://static-1253442168.image.myqcloud.com/banner/None_d41d8cd98f00b204e9800998ecf8427e_mR32hSk.jpg-bannerhd768"
      ]
    };
  }
};
</script>
<style lang="less">
@swiper-w: 375px;
swiper {
  width: @swiper-w;
  height: @swiper-w/(768/346)+30;
}
.swiper-item-box {
  padding: 10px 10px 15px 10px;
}
.swiper-item-link {
  width: @swiper-w - 20;
  height: (@swiper-w - 20)/(768/346);
  border-radius: 8px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.swiper-item-image {
  width: @swiper-w - 20;
  height: (@swiper-w - 20)/(768/346);
}
</style>
