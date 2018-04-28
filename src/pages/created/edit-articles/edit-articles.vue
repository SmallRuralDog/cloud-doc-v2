<template>
  <div class="edit-articles" v-if="init">
    <div class="title-item">
      <input v-model="title" placeholder="请输入标题 5-30个字" :maxlength="30" />
    </div>
    <div v-if="content.length<=0" class="default-upload" @click="add_image(0)">
      <i class="iconfont icon-shangchuan"></i>
      <p>添加图片</p>
    </div>
    <div v-else class="content-body">
      <div v-for="(item,index) in content" :key="index">
        <add-item-btn @add-item="add_new_item" @show-btn="show_btn" :showIndex="show_btn_index"
                      :showType="show_btn_type" :index="index" type="up" :count="content.length" :action="ck_action" />
        <content-item @set-cover="set_cover" @up-item="up_item" @down-item="down_item" @del-item="del_item"
                      @re-upload-video="re_upload_video"
                      @re-upload-image="re_upload_image" @replace-image="replace_image" :item="item" :index="index"
                      :count="content.length" :action="ck_action" :cover="cover" />
        <add-item-btn @add-item="add_new_item" @show-btn="show_btn" :showIndex="show_btn_index"
                      :showType="show_btn_type" :index="index" type="down" :count="content.length"
                      :action="ck_action" />
      </div>
    </div>
    <div class="footer">
      <button @click="save" type="primary" :loading="save_loading" :disabled="save_disabled">保存</button>
    </div>
  </div>
</template>
<script>
  import store from "./store";
  import ContentItem from "./content-item";
  import AddItemBtn from "./add-item-btn";
  import { http, toast } from "../../../utils";

  export default {
    components: {
      ContentItem,
      AddItemBtn
    },
    data() {
      return {
        init: false,
        id: "",
        doc_id: "",
        title: "",
        cover: "",
        show_btn_index: 0,
        show_btn_type: "",
        save_loading: false
      };
    },
    onUnload() {
      this.init = false;
      this.title = ""
      store.commit("set_content", []);
      this.cover = ""

    },
    mounted() {
      this.id = this.$root.$mp.query.id;
      this.doc_id = this.$root.$mp.query.doc_id;
      if (this.id.length < 5) {
        this.init = true
      } else {
        toast.showLoading();
        this.getData()
      }
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
          return (item.type === "image" && item.data.status === "loading") || (item.type === "video" && item.data.status === "loading");
        });
        return uploading.length === 0;
      },
      save_disabled() {
        return this.title.length < 5 || this.content.length <= 0 || !this.ck_action || this.save_loading === true
      }
    },
    methods: {
      getData() {
        http.get("v1/edit-doc-article-before?doc_id=" + this.doc_id + "&id=" + this.id).then(res => {
          store.commit("set_content", res.data.content);
          this.title = res.data.title;
          this.cover = res.data.cover;
          this.id = res.data.id;
          toast.hideLoading();
          this.init = true
        }).catch(res => {

        })
      },
      //显示添加新模块按钮
      show_btn(res) {
        this.show_btn_index = res.index;
        this.show_btn_type = res.type;
      },
      //隐藏添加新模块按钮
      hide_btn() {
        this.show_btn_index = 0;
        this.show_btn_type = "";
      },
      add_new_item(res) {
        let d_index = res.index + 1;
        let u_index = res.index > 0 ? res.index - 1 : res.index;
        switch (res.item) {
          case "image":
            if (res.type === "up") {
              this.add_image(u_index);
            } else {
              this.add_image(d_index);
            }
            break;
          case "text":
            if (res.type === "up") {
              this.add_text(u_index);
            } else {
              this.add_text(d_index);
            }
            break;
          case "video":
            if (res.type === "up") {
              this.add_video(u_index);
            } else {
              this.add_video(d_index);
            }
            break;
        }
      },
      //重新上传图片
      re_upload_image(item_index) {
        let data = this.content[item_index];
        data.data.status = "loading";
        store.commit("set_item", { index: item_index, data: data });
        this.upload_image(data.path, item_index);
      },
      //重新上传视频
      re_upload_video(item_index) {
        let data = this.content[item_index];
        data.data.status = "loading";
        store.commit("set_item", { index: item_index, data: data });
        this.upload_video(data.path, item_index);
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
      //添加文字
      add_text(start_index) {
        this.add_item(start_index, "text", "", "", "", {
          upload: true,
          status: "success",
          width: 0,
          height: 0
        });
      },
      //添加图片
      add_image(start_index) {
        wx.chooseImage({
          count: 9,
          sizeType: ["original"],
          sourceType: ["album", "camera"],
          success: res => {
            res.tempFiles.map((item, index) => {
              wx.getImageInfo({
                src: item.path,
                success: info => {
                  this.add_item(
                    index + start_index,
                    "image",
                    "",
                    item.path,
                    item.path,
                    {
                      upload: false,
                      status: "loading",
                      width: info.width,
                      height: info.height
                    }
                  );
                }
              });
            });
          }
        });
      },
      add_video(start_index) {
        wx.chooseVideo({
          sourceType: ["album", "camera"],
          maxDuration: 60,
          camera: "back",
          success: res => {
            console.log(res);
            this.add_item(
              start_index,
              "video",
              "",
              res.tempFilePath,
              res.tempFilePath,
              {
                upload: false,
                status: "loading",
                duration: res.duration,
                pic: false,
                size: res.size,
                width: res.width,
                height: res.height
              }
            );
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
        this.content.splice(index, 0, item);
        //this.$set(this.content, index, item);
        this.hide_btn();
        //上传图片
        if (type === "image" && !data.upload) {
          this.upload_image(path, index);
        }
        //上传视频
        if (type === "video" && !data.upload) {
          this.upload_video(path, index);
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
      upload_video(path, index) {
        let self_item = this.content[index];
        http
          .upload("v1/article-upload-video", path, "file", {
            file_name: "file",
            mode: "articles"
          })
          .then(res => {
            self_item.path = res.data.path;
            self_item.url = res.data.url;
            self_item.data.upload = true;
            self_item.data.status = "success";
            self_item.data.pic = res.data.pic;
            store.commit("set_item", {
              index: index,
              data: self_item
            });
          })
          .catch(res => {
            self_item.data.upload = false;
            self_item.data.status = "error";
            store.commit("set_item", {
              index: index,
              data: self_item
            });
          });
      },
      set_cover(index) {
        let self_item = this.content[index];
        if (self_item.type === 'image') {
          this.cover = self_item.path
        }

      },
      save() {
        this.save_loading = true
        http.post("v1/edit-doc-article", {
          id: this.id,
          doc_id: this.doc_id,
          title: this.title,
          content: this.content,
          cover: this.cover
        }).then(res => {
          toast.show(res.message);
          store.commit("del_cache", {});
          setTimeout(() => {
            wx.navigateBack({})
          }, 1500);
          this.save_loading = false
        }).catch(res => {
          this.save_loading = false
        })
      }
    }
  };
</script>
<style lang="less">
  @import "../../../styles/common.less";

  .edit-articles {
    padding-bottom: 80px;
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
      padding: 5px 15px;
      position: fixed;
      background: white;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 0.5px solid #dcdcdc;
    }
  }
</style>
