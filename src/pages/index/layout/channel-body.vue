<template>
  <div>
    <a :href="'/pages/details/'+item.mode+'/main?id='+item.id" class="big-view" v-if="item">
      <line-item-big :tags="item.tags" :time="item.last_update?item.last_update.updated_format:item.time" :category_name="item.category_name" :number="item.listened_count" :cover="item.cover.small_url" :title="item.title" :abstract="item.abstract" :user_name="item.user.name" />
    </a>
    <div class="class-list" v-if="next_list">
      <block v-for="(doc,index2) in next_list" :key="index2">
        <card-item :id="doc.id" :mode="doc.mode" :cover="doc.cover.small_url" :title="doc.tags[0].name" :info="doc.title" />
      </block>
    </div>
  </div>
</template>
<script>
import CardItem from "../../../components/doc-item/card-item-block";
import LineItemBig from "../../../components/doc-item/card-item-line-big";
export default {
  components: {
    CardItem,
    LineItemBig
  },
  props: {
    list: Array
  },
  mounted(){


  },
  computed: {
    item() {
      try {
        return this.list.shift();
      } catch (error) {
        return false;
      }
    },
    next_list() {
      const next_list =   this.list.filter((item, index) => {
        return index >= 0;
      });
      return next_list || []
    }
  }
};
</script>
<style lang="less">
.big-view {
  padding: 10px 15px;
}
.class-list{
  padding: 0 7.5px;
}
</style>

