<template>
    <div>
        <page-title-bar title="猜你喜欢" :more="false" />
        <div class="home-list">
            <a :href="'/pages/details/doc/main?id='+item.id" class="list-item" v-for="item in list" :key="item.id">
                <div class="l">
                    <img :src="item.cover.small_url" />
                </div>
                <div class="r">
                    <div class="title">{{item.title}}</div>
                    <div class="info">
                        <span class="cn">{{item.category_name}}</span>
                        <span class="ml-5 mr-5">·</span>
                        <span>{{item.listened_count}}人在看</span>
                    </div>
                    <div class="user-info">
                        <div class="ul">
                            <img v-if="false" class="avatar mr-5" :src="item.user.avatar"/>
                            <span class="name">{{item.user.name}}</span>
                        </div>
                        <div class="ur">
                            <block v-if="item.last_update">
                                {{item.last_update.updated_format}}更新
                            </block>
                            <block v-else>
                                {{item.time}}更新
                            </block>
                            
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import PageTitleBar from "../../components/page-title-bar";
export default {
  components: {
    PageTitleBar
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
  .list-item {
      display: flex;
      margin:7.5px 15px;
      padding: 10px;
      background: #f7f7f7;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
    .l {
      width: @cover-size;
      height: @cover-size/1.75;
      overflow: hidden;
      margin-right: 10px;
      border-radius: 5px;
      flex-shrink: 0;
      img {
        width: @cover-size;
        height: @cover-size/1.75;
      }
    }
    .r{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
            font-size: 14px;
            color: #333;
            line-height: 20px;
            max-height: 20px;
            overflow: hidden;
        }
        .info{
            font-size: 12px;
            color: #999;
            .cn{
                color: @blue;
            }
        }
        .user-info{
            color: #999;
             display: flex;
             align-items: center;
             font-size: 12px;
            .ul{
                display: flex;
                align-items: center;
                margin-right: 15px;
                .avatar{
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                }
                .name{
                    font-size: 12px;
                }
            }
        }
    }
  }
}
</style>

