export default {
  go_home() {
    wx.switchTab({
      url: "/pages/index/main"
    });
  },
  open_doc_page_info(link) {
    wx.navigateTo({
      url: "/pages/details/doc-page-info/main?link=" + link
    });
  },
  open_doc_index(id) {
    wx.navigateTo({
      url: "/pages/details/docs/main?id=" + id
    });
  },
  open_articles_index(id) {
    wx.navigateTo({
      url: "/pages/details/articles/main?id=" + id
    });
  },
  open_article_page(id) {
    wx.navigateTo({
      url: "/pages/details/article-node-page/main?id=" + id
    });
  },
  open_web(url) {
    wx.navigateTo({
      url: "/pages/web/main?url=" + url
    });
  }
}
