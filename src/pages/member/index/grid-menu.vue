<template>
    <div class="main">
        <div class="grid-menu">
            <div hover-class="hover" @click="item_click(item)" class="menu-item" v-for="item in menu" :key="item.id">
                <img :src="item.cover" />
                <p>{{item.title}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { adevent } from "../../../utils";
export default {
  props: {
    menu: Array
  },
  methods: {
    item_click(data) {
      adevent.click(data);
    }
  }
};
</script>

<style lang="less">
.grid-menu {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  .menu-item {
    width: 20%;
    flex-shrink: 0;
    display: flex;
    height: 75px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
      margin-bottom: 7px;
    }
    p {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
