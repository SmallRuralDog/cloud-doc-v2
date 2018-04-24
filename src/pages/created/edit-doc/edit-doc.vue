<template>
    <div v-if="init">
        <div class="image-content">
            <div class="image-view" @click="upload">
                <upload-image-view :status="status" :url="show_url" w="150px" h="200px" />
            </div>
        </div>
        <div class="hint">点击图片更换封面，图片大小 600*800</div>
        <div class="btns">
            <button :disabled="up_path.length<=0 || status=='uploading'" @click="save">保存封面</button>
        </div>
    </div>
</template>
<script>
import { http, toast } from "../../../utils";
import UploadImageView from "../../../components/upload-image-view";
export default {
  components: {
    UploadImageView
  },
  data() {
    return {
      init: false,
      id: "",
      doc: {},
      show_url: "",
      up_path: "",
      status: "view"
    };
  },
  onUnload() {
    this.init = false;
    this.status = "view";
  },
  mounted() {
    this.id = this.$root.$mp.query.id || "X2mrMLvDg09gVZPW";
    console.log(this.id);
    toast.showLoading();
    this.getData();
  },
  methods: {
    save() {
      this.status = "uploading";
      http
        .upload("v1/upload-image", this.up_path, "file", {
          file_name: "file",
          mode: "docs"
        })
        .then(res => {
          this.push_data(res.data.path, res.data.id);
        })
        .catch(res => {
          this.status = "error";
        });
    },
    push_data(cover, cover_id) {
      http
        .post("v1/edit-doc-cover", {
          cover: cover,
          cover_id: cover_id,
          id: this.doc.id
        })
        .then(res => {
          this.up_path = "";
          this.status = "success";
          toast.show(res.message);
        });
    },
    getData() {
      http.get("v1/edit-doc-before?id=" + this.id).then(res => {
        this.init = true;
        this.doc = res.data.doc;
        this.show_url = this.doc.cover_info.big_url;
        toast.hideLoading();
      });
    },
    upload() {
      wx.chooseImage({
        count: 1,
        sizeType: ["original"],
        sourceType: ["album", "camera"],
        success: res => {
          this.show_url = res.tempFiles[0].path;
          this.up_path = res.tempFilePaths[0];
        }
      });
    }
  }
};
</script>
<style lang="less">
.image-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding-top: 50px;
  .image-view {
    width: 150px;
    height: 200px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    overflow: hidden;
  }
}
.hint {
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  color: #999;
}
.btns {
  padding: 30px 15px;
}
</style>
