<template>
    <div>
        <page-title-bar title="小云推荐" :more="false"  />
        <div>
            <scroll-view scroll-x>
                <div class="rec-list">
                    <block v-for="(item,index) in items" :key="index">
                        <card-item :id="item.id" :cover="item.cover.small_url" :title="item.category_name" :info="item.title" />
                    </block>
                </div>
            </scroll-view>
        </div>
    </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
import CardItem from '../../components/card-item-200w'
export default {
  components: {
    PageTitleBar,
    CardItem
  },
  data() {
    return {

    };
  },
  props:{
    items:Array
  }
};
</script>
<style lang="less">
.rec-list {
  display: flex;
  flex-wrap: nowrap;
}

.rec-list:first-child {
  margin-left: 15px;
}
</style>

