<template>
    <div class="feedback-page ">
        <div class="title">反馈内容</div>
        <div class="textarea">
            <textarea :maxlength="300" v-model="content" placeholder="填写你的反馈内容.."></textarea>
        </div>
        <div class="title">上传图片</div>
        <div class="img-list">
            <div class="upload-btn" v-for="(item,index) in images" :key="index">
                <div @click="img_click(item,index)" @longpress="longpress(item,index)">
                    <upload-image-viwe w="63px" h="63px" :url="item.temp" :status="item.status" />
                </div>
            </div>
            <div class="upload-btn" @click="upload" v-if="images.length<5">
                <i class="iconfont icon-pluslarge"></i>
            </div>
        </div>
        <div class="tip-title">提示：点击图片预览，长按图片删除，最多可上传5张</div>
        <div class="btn">
            <button @click="submit" :disabled="disabled" type="primary">提交</button>
        </div>
    </div>
</template>
<script>
import { http, toast } from "../../../utils";
import UploadImageViwe from "../../../components/upload-image-view";
export default {
  components: {
    UploadImageViwe
  },
  data() {
    return {
      content: "",
      up_images: [],
      image_max: 5,
      images: [],
      temps: [],
      loading: false
    };
  },
  methods: {
    submit() {
      let up_num = 0;
      this.loading = true;
      if (this.images.length > 0) {
        this.images.map((item, index) => {
          if (item.status == "success") return;
          item.status = "uploading";
          http
            .upload("v1/upload-image", item.path, "file", {
              file_name: "file",
              mode: "feedback"
            })
            .then(res => {
              item.status = "success";
              this.$set(this.up_images, index, res.data.path);
              console.log(res);
              up_num++;
              if (up_num == this.images.length) {
                this.submit_ok();
              }
            })
            .catch(err => {
              item.status = "error";
              up_num++;
              if (up_num == this.images.length) {
                this.submit_ok();
              }
            });
        });
      } else {
        this.submit_ok();
      }
    },
    submit_ok() {
      toast.showLoading();
      http
        .post("v1/member-feedback", {
          content: this.content,
          images: this.up_images
        })
        .then(res => {
          toast.hideLoading();
          toast.show("提交成功，感谢您的反馈");
          this.images = [];
          this.temps = [];
          this.content = "";
          this.up_images = [];
          this.loading = false;
        });
    },
    upload() {
      wx.chooseImage({
        count: this.image_max - this.images.length,
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        success: res => {
          console.log(res);
          res.tempFiles.map((item, index) => {
            let img_item = {
              status: "view",
              path: res.tempFilePaths[index],
              temp: res.tempFiles[index].path
            };
            this.temps.push(img_item.temp);
            this.images.push(img_item);
          });
        }
      });
    },
    longpress(item, index) {
      console.log(index);
      wx.showActionSheet({
        itemList: ["删除图片"],
        success: res => {
          this.$delete(this.images, index);
          this.$delete(this.temps, index);
        }
      });
    },
    img_click(item, index) {
      wx.previewImage({
        current: item.temp,
        urls: this.temps
      });
    }
  },
  computed: {
    disabled() {
      return this.content.length <= 0 || this.content.length > 300 || this.loading;
    }
  }
};
</script>
<style lang="less">
@import '../../../styles/common.less';
@img-size: 63px;
.feedback-page {
  position: relative;
  background: #f7f7f7;
  height: 100vh;
  color: #999;
  .title {
    font-size: 14px;
    padding: 10px;
  }
  .tip-title {
    font-size: 12px;
    padding: 10px;
  }
  .textarea {
    background: white;
    display: flex;
    textarea {
      flex: 1;
      width: auto;
      padding: 5px 10px;
      font-size: 14px;
    }
  }
  .btn {
    padding: 20px 10px;
    button{
        background: @blue;
    }
  }
  .img-list {
    display: flex;
    flex-wrap: wrap;
    .upload-btn {
      width: @img-size;
      height: @img-size;
      background: white;
      margin: 10px 0 0 10px;
      box-sizing: content-box;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      i {
        font-size: 40px;
        color: #999;
      }
      img {
        width: @img-size;
        height: @img-size;
      }
    }
  }
}
.base-bg {
  background: #f7f7f7;
}
</style>
