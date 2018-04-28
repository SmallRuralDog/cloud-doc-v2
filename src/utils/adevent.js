import user from './user'
import http from './http'
import toast from './toast'
import { getParam } from "./util";
export default {
    click : function (data) {
        console.log(data);
        switch (data.event) {
            case 'scanLogin':
                this.scan_login(data);
                break;
            case 'navigateTo':
                this.navigateTo(data);
                break;
        }
    },
    scan_login(data) {
        if (user.check_login()) {
            wx.scanCode({
                onlyFromCamera: true,
                success: res => {
                  console.log(res)
                    let key = getParam(res.result, "key");
                    let action = getParam(res.result, "action");
                    toast.showLoading()
                    http
                        .get("v1/get_login_key", {key: key})
                        .then(res => {
                            toast.hideLoading()
                            wx.navigateTo({
                                url: "/pages/member/scan_login/main?key=" + key
                            });
                        });
                }
            });
        }
    },
    navigateTo(data) {
        if (data.check_login) {
            if (user.check_login()) {
                wx.navigateTo({url: data.href});
            }
        } else {
            wx.navigateTo({url: data.href});
        }
    }
}
