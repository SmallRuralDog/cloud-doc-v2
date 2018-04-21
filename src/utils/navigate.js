export default {
    open_doc_page_info(link) {
        wx.navigateTo({
            url: "/pages/details/doc-page-info/main?link=" + link
        });
    },
    open_doc_index(id){
        wx.navigateTo({
            url: "/pages/details/doc/main?id=" + id
        });
    }
}