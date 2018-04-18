<template>
    <div>
        <page-title-bar title="猜你喜欢" :more="false" />
        <div class="home-list">
            <block  v-for="item in list" :key="item.id">
            <a class="list-item" :href="'/pages/details/doc/main?id='+item.id">
                <line-item :time="item.last_update?item.last_update.updated_format:item.time" :category_name="item.category_name" :number="item.listened_count" :cover="item.cover.small_url" :title="item.title" :abstract="item.abstract" :user_name="item.user.name"/>
            </a>
            </block>
        </div>
    </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
import LineItem from '../../components/doc-item/card-item-line'
export default {
  components: {
    PageTitleBar,
    LineItem
  },
  props: {
    list: Array
  }
};
</script>
<style lang="less">
@import '../../styles/common.less';
@cover-size:120px;
.home-list {
    .list-item{
        padding: 10px 15px;
    }
}
</style>

