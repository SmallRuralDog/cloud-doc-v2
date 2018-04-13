<template>
    <div class="">
        <div class="flex-r pd-15">
            <textarea  :value="intro" @input="input" class="intro-input" placeholder="填写你的个性简介，15字以内" />
        </div>
        <div class="pd-15">
            <button class="save-btn" :loading="loading" :disabled="!disabled || loading" @tap="save">保存</button>
        </div>
    </div>
</template>
<script>
import store from "../login/store";
import { http, user, toast } from "../../../utils";
export default {
  data() {
    return {
      intro: "",
      loading: false
    };
  },
  mounted(){
      this.intro = this.user_info.intro
  },
  computed: {
    user_info() {
      return store.state.user;
    },
    disabled() {
      return this.intro.length > 0 && this.intro.length <= 15;
    }
  },
  methods: {
    input(e) {
      this.intro = e.target.value;
    },
    save() {
      this.loading = true;
      http
        .post("v1/member-edit-intro", { intro: this.intro })
        .then(res => {
          let userData = this.user_info;
          userData.intro = res.data;
          store.commit("set_user", userData);
          user.set_user(userData);
          toast.show("保存成功");
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.intro-input {
  flex: 1;
  background: #f7f7f7;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  height: 40px;
}
.save-btn {
}
</style>
