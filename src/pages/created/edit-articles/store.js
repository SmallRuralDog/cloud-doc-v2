import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    content:  []
  },
  mutations: {
    set_content: (state, data) => {
      state.content = data;
    },
    set_item: (state, obj) => {
      state.content[obj.index] = obj.data;
    },
    set_image(state, obj) {
      state.content[obj.index].path = obj.path;
      state.content[obj.index].type = "image";
      state.content[obj.index].url = obj.url;
      state.content[obj.index].data = obj.data
    },
    set_image_upload(state, obj) {
      if (obj.upload) {
        state.content[obj.index].path = obj.path;
        state.content[obj.index].url = obj.url;
        state.content[obj.index].data.status = 'success';
      } else {
        state.content[obj.index].data.status = 'error';
      }
      state.content[obj.index].data.upload = obj.upload;
    },
    set_text(state, obj) {
      state.content[obj.index].text = obj.text;
    },
    del_cache(state, obj){

    }
  }
});

export default store
