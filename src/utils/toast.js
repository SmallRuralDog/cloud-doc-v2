export default {
    show(text){
        this.showToast(text)
    },
    showToast : function (text, icon = 'none', duration = 2000) {
        wx.showToast({title:text, icon: icon, duration: duration})
    }
}