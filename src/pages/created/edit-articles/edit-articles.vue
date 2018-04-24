<template>
  <div class="edit-articles">
    <div class="title-item">
      <input v-model="title" placeholder="请输入标题 5-30个字" :maxlength="30" />
    </div>
    <div v-if="content.length<=0" class="default-upload" @click="add_image">
      <i class="iconfont icon-shangchuan"></i>
      <p>添加图片</p>
    </div>
    <div v-else class="content-body">

      <div v-for="(item,index) in content" :key="index">
        <add-item-btn :index="index" type="up" :count="content.length" :action="ck_action" />
        <content-item @up-item="up_item" @down-item="down_item" @del-item="del_item" @re-upload-image="re_upload_image" @replace-image="replace_image" :item="item" :index="index" :count="content.length" :action="ck_action" />
        <add-item-btn :index="index" type="down" :count="content.length" :action="ck_action" />
      </div>
    </div>

    <div class="footer">
      <button @click="save">保存</button>
    </div>
  </div>
</template>
<script>
import store from "./store";
import ContentItem from "./content-item";
import AddItemBtn from "./add-item-btn";
import { http } from "../../../utils";
export default {
  components: {
    ContentItem,
    AddItemBtn
  },
  data() {
    return {
      title: ""
    };
  },
  watch: {
    content(val, old) {
      store.commit("set_content", val);
    }
  },
  computed: {
    content() {
      return store.state.content;
    },
    ck_action() {
      let uploading = this.content.filter(item => {
        return item.type == "image" && item.data.status == "loading";
      });
      return uploading.length == 0;
    }
  },
  methods: {
    //重新上传图片
    re_upload_image(item_index) {
      let data = this.content[item_index];
      data.data.status = "loading";
      store.commit("set_item", { index: item_index, data: data });
      this.upload_image(data.path, item_index);
    },
    //替换图片
    replace_image(item_index) {
      wx.chooseImage({
        count: 1,
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        success: res => {
          res.tempFiles.map((item, index) => {
            wx.getImageInfo({
              src: item.path,
              success: info => {
                store.commit("set_image", {
                  index: item_index,
                  path: item.path,
                  url: item.path,
                  data: {
                    upload: false,
                    status: "loading",
                    width: info.width,
                    height: info.height
                  }
                });
                this.upload_image(item.path, item_index);
              }
            });
          });
        }
      });
    },
    //添加图片
    add_image() {
      wx.chooseImage({
        count: 9,
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        success: res => {
          res.tempFiles.map((item, index) => {
            wx.getImageInfo({
              src: item.path,
              success: info => {
                this.add_item(index, "image", "", item.path, item.path, {
                  upload: false,
                  status: "loading",
                  width: info.width,
                  height: info.height
                });
              }
            });
          });
        }
      });
    },
    //添加块数据
    add_item(index, type, text, path, url, data) {
      let item = {
        type: type,
        text: text,
        path: path,
        url: url,
        data: data
      };
      //this.content.push(item);
      this.$set(this.content, index, item);
      //上传图片
      if (type == "image" && !data.upload) {
        this.upload_image(path, index);
      }
    },
    //删除模块
    del_item(index) {
      this.$delete(this.content, index);
    },
    //上移模块
    up_item(index) {
      if (index > 0) {
        let self_item = this.content[index];
        let up_item = this.content[index - 1];
        this.$set(this.content, index - 1, self_item);
        this.$set(this.content, index, up_item);
      }
    },
    //下移模块
    down_item(index) {
      if (index < this.content.length - 1) {
        let self_item = this.content[index];
        let down_item = this.content[index + 1];
        this.$set(this.content, index + 1, self_item);
        this.$set(this.content, index, down_item);
      }
    },
    upload_image(path, index) {
      http
        .upload("v1/article-upload-image", path, "file", {
          file_name: "file",
          mode: "articles"
        })
        .then(res => {
          store.commit("set_image_upload", {
            index: index,
            path: res.data.path,
            url: res.data.url,
            upload: true
          });
        })
        .catch(res => {
          store.commit("set_image_upload", {
            index: index,
            upload: false
          });
        });
    },
    save() {
      console.log(this.content);
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.edit-articles {
  .title-item {
    background: #f7f7f7;
    display: flex;
    margin: 15px;
    padding: 8px 10px;
    border-radius: 3px;
    input {
      flex: 1;
      font-size: 14px;
    }
  }
  .default-upload {
    margin: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;
    background: #f7f7f7;
    border-radius: 3px;
    font-size: 13px;
    color: #999;
    border: 0.5px solid #f0f0f0;
    i {
      font-size: 30px;
      color: @blue;
      margin-bottom: 5px;
    }
  }
  .footer {
    padding: 15px;
  }
}
</style>
