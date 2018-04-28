<template>
  <div class="item-image">
    <img @click="item_click" :src="image.src" :style="style" />
  </div>

</template>

<script>
export default {
  name: "img-item",
  props: {
    image: Object,
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
      this.$emit("img-click",this.image.src)
    }
  },
  computed: {
    size() {
      if (this.image.width > 100) {
        const ratio = this.image.width / this.image.height;
        let w = this.max_width;
        let h = w / ratio;
        return `width:${w}px;height:${h}px;`;
      } else {
        return `width:${this.image.width}px;height:${this.image.height}px;`;
      }
    },
    mt() {
      return this.index == 0 ? "margin-top: 20px;" : "";
    },
    style() {
      return this.size + this.mt + this.image.style || "";
    }
  }
};
</script>

<style lang="less">
.item-image {
  display: flex;
  align-items: center;
}
</style>
