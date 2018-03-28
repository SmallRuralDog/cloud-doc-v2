<template>
  <div class="main">
      <div class="grid-menu">
          <div class="menu-item">
              <img src="https://static-1253442168.image.myqcloud.com/picture/5442190_2b979c2809c6c368f09b247e1bd6acd0.jpg"/>
              <p>我的文档</p>
          </div>
          <div class="menu-item">
              <img src="https://static-1253442168.image.myqcloud.com/picture/5442190_f2d53ee7890435a018bb074e582339e1.jpg"/>
              <p>精选专题</p>
          </div>
          <div class="menu-item">
              <img src="https://static-1253442168.image.myqcloud.com/picture/5442190_191b38f0ea495257747623bd8c6fbcb6.jpg"/>
              <p>分销中心</p>
          </div>
          <div class="menu-item">
              <img src="https://static-1253442168.image.myqcloud.com/picture/5442190_895a3a144871ffcc953743089562cba1.jpg"/>
              <p>免费文档</p>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  
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
