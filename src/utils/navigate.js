export default {
    open_doc_page_info(link) {
        wx.navigateTo({
            url: "/pages/details/doc-page-info/main?link=" + this.menu.link
        });
    }
}