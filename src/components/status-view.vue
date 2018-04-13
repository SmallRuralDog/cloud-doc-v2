<template>
    <div>
        <div class="loading" v-if="status=='loading'">
            <div class="la-square-jelly-box la-2x">
                <div class="fk"></div>
                <div class="ft"></div>
            </div>
        </div>
        <div class="no-data-status-view" v-if="status=='no-data'">
            <img class="icon" :src="no_data"/>
            <p>{{title?title:'暂无内容'}}</p>
        </div>
        <div @click="re_load" class="error-status-view" v-if="status=='error'">
            <img class="icon" :src="load_error"/>
            <p>{{title?title:'加载失败，点击重试'}}</p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        no_data: require("../../static/images/no-data.png"),
        load_error: require("../../static/images/load-error.png"),
    };
  },
  props: {
    status: {
      tyle: String
    },
    title: String
  },
  methods: {
      re_load(){
          this.$emit('re_load')
      }
  }
};
</script>
<style lang="less">
@import "../styles/common.less";
.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .la-square-jelly-box.la-2x {
    width: 30px;
    height: 30px;
    position: relative;
  }

  .fk {
    top: -25%;
    z-index: 1;
    height: 30px;
    width: 30px;
    background: @blue;
    border-radius: 10%;
    -webkit-animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
    -moz-animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
    -o-animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
    animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
  }
  .ft {
    bottom: -18px;
    height: 5px;
    width: 30px;
    background: #000;
    border-radius: 50%;
    opacity: 0.2;
    position: absolute;
    -webkit-animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
    -moz-animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
    -o-animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
    animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
  }

  @keyframes square-jelly-box-animate {
    17% {
      border-bottom-right-radius: 10%;
    }
    25% {
      -webkit-transform: translateY(25%) rotate(22.5deg);
      -moz-transform: translateY(25%) rotate(22.5deg);
      -o-transform: translateY(25%) rotate(22.5deg);
      transform: translateY(25%) rotate(22.5deg);
    }
    50% {
      border-bottom-right-radius: 100%;
      -webkit-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
      -moz-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
      -o-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
      transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    }
    75% {
      -webkit-transform: translateY(25%) rotate(67.5deg);
      -moz-transform: translateY(25%) rotate(67.5deg);
      -o-transform: translateY(25%) rotate(67.5deg);
      transform: translateY(25%) rotate(67.5deg);
    }
    100% {
      -webkit-transform: translateY(0) rotate(90deg);
      -moz-transform: translateY(0) rotate(90deg);
      -o-transform: translateY(0) rotate(90deg);
      transform: translateY(0) rotate(90deg);
    }
  }
  @keyframes square-jelly-box-shadow {
    50% {
      -webkit-transform: scale(1.25, 1);
      -moz-transform: scale(1.25, 1);
      -o-transform: scale(1.25, 1);
      transform: scale(1.25, 1);
    }
  }
}
.no-data-status-view, .error-status-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
  .icon{
      width: 120px;
      height: 120px;
      margin-bottom: 15px;
  }
}
</style>
