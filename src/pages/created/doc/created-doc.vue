<template>
    <div>
        <div class="from">
            <div class="from-item">
                <div class="label">名称</div>
                <div class="input">
                    <input placeholder="请输入文档名称" :maxlength="20" />
                </div>
            </div>
            <div class="from-item">
                <div class="label">简介</div>
                <div class="input">
                    <textarea placeholder="请输入文档简介" :maxlength="60" />
                </div>
            </div>
            <div class="from-item">
                <div class="label">分类</div>
                <div class="input">
                    <picker mode="multiSelector" :range="multiArray">
                        请选择
                    </picker>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      multiArray: [
        ["无脊柱动物", "脊柱动物"],
        ["扁性动物", "线形动物", "环节动物", "软体动物", "节肢动物"],
        ["猪肉绦虫", "吸血虫"]
      ]
    };
  }
};
</script>
<style lang="less">
.from {
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  margin: 15px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  .from-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin: 10px 0;
    .label {
      display: flex;
      align-items: flex-start;
      height: 100%;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .input {
      flex: 1;
      border-bottom: 1px solid #f0f0f0;
      textarea {
        height: 60px;
      }
    }
  }
}
</style>
