<template>
  <div class="search-item">
    <div class="page-info" @click="go_page">
      <rich-text class="item-title" :nodes="item.title"></rich-text>
      <rich-text class="item-content" :nodes="item.content"></rich-text>
    </div>
    <div class="item-doc" v-if="item.title_1">
      <img class="item-doc-avatar" :src="item.cover" mode="aspectFill" />
      <div class="rigth">
        <div class="item-doc-info">
          <div class="doc-title">{{item.title_1}}</div>
          <div class="doc-desc">{{item.desc}}</div>
        </div>
        <div class="btn">
          <button @click="go_doc" size="mini">查看</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { navigate } from "../../utils";
export default {
  props: {
    item: Object
  },
  methods: {
    go_page() {
      navigate.open_doc_page_info(this.item.link);
    },
    go_doc() {
      navigate.open_doc_index(this.item.doc_id);
    }
  }
};
</script>
<style lang="less">
.search-item {
  padding: 15px;
  border-bottom: 0.5px solid #f3f4f0;
  .page-info {
    display: flex;
    flex-direction: column;
    .item-title {
      font-size: 16px;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      align-items: flex-end;
    }
    .item-content {
      flex: 1;
      overflow: hidden;
      font-size: 12px;
      margin-top: 10px;
      line-height: 1.6;
      color: #666;
      overflow-x: hidden;
    }
  }

  .item-doc {
    display: flex;
    align-items: stretch;
    padding: 10px;
    margin-top: 10px;
    background: #f7f7f7;
    .rigth {
      display: flex;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          flex-shrink: 0;
          margin-left: 8px;
        }
      }
    }
  }

  .item-doc-avatar {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    flex-shrink: 0;
  }

  .item-doc-info {
    padding: 0 5px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .doc-title {
    font-size: 14px;
    color: #333;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .doc-desc {
    font-size: 12px;
    color: #999;
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    align-items: flex-end;
  }

  .doc-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
