<template>
    <div>
        <page-title-bar title="后端" />
        <div class="class-list">
            <block v-for="(item,index) in items" :key="index">
                <card-item :cover="item.cover" :title="item.title" :info="item.info" />
            </block>
        </div>
    </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
import CardItem from "../../components/card-item-half";
export default {
  components: {
    PageTitleBar,
    CardItem
  },
  data() {
    return {
      items: [
        {
          cover:
            "https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd",
          title: "PHP",
          info: "抓住痛点：掌握销售的主动权"
        },
        {
          cover:
            "https://static-1253442168.image.myqcloud.com/channel_cover/cover_151714_7874a91e53e5fe9c956aac9294ae9b9e.jpg-lecturecover85hd",
          title: "JAVA",
          info: "抓住痛点：掌握销售的主动权"
        },
        {
          cover:
            "https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd",
          title: "PHP",
          info: "抓住痛点：掌握销售的主动权"
        },
        {
          cover:
            "https://static-1253442168.image.myqcloud.com/channel_cover/cover_None_dae27253eb688b200e5f7fc5570e26bb.jpg-lecturecover85hd",
          title: "健身",
          info: "性感男神的14项减脂塑形训练，每天10分钟轻松逆袭让她尖叫"
        },
        {
          cover:
            "https://static-1253442168.image.myqcloud.com/channel_cover/cover_23713127_ce4820d696b59c51f89ca2dbb3e52199.jpg-lecturecover85hd",
          title: "PHP",
          info: "抓住痛点：掌握销售的主动权"
        },
        {
          cover:
            "https://static-1253442168.image.myqcloud.com/channel_cover/cover_None_dae27253eb688b200e5f7fc5570e26bb.jpg-lecturecover85hd",
          title: "健身",
          info: "性感男神的14项减脂塑形训练，每天10分钟轻松逆袭让她尖叫"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.class-list {
  display: flex;
  flex-wrap: wrap;
}
</style>

