<template>
  <div class="item-video">
    <video  :src="video.src" :duration="video.duration" :style="style" />
  </div>

</template>

<script>
export default {
  name: "img-item",
  props: {
    video: Object,
    index: Number,
    padding: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      max_width: 375 - this.padding * 2
    };
  },
  methods:{
    item_click(){
      this.$emit("img-click",this.video.src)
    }
  },
  computed: {
    size() {
      if (this.video.width > 100) {
        const ratio = this.video.width / this.video.height;
        let w = this.max_width;
        let h = w / ratio;
        return `width:${w}px;height:${h}px;`;
      } else {
        return `width:${this.video.width}px;height:${this.video.height}px;`;
      }
    },
    mt() {
      return this.index === 0 ? "margin-top: 20px;" : "";
    },
    style() {
      return this.size + this.mt + this.video.style || "";
    }
  }
};
</script>

<style lang="less">
.item-video {
  display: flex;
  align-items: center;
}
</style>
