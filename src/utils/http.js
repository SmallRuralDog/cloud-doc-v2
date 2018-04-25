import user from './user'
import toast from './toast'
const HOST = 'https://s.yundocs.cn/api/'
//const HOST = 'http://192.168.10.54:88/api/'
const WEB_HOST = 'http://192.168.10.54/r/'
const SystemInfo = wx.getSystemInfoSync()
const header = {
    'Accept': 'application/json',
    'content-type': 'application/json',
    'SystemInfo': JSON.stringify(SystemInfo)
}
export default {
    request(method, url, data) {
        if (user.get_token()) {
            header.Authorization = 'Bearer ' + user.get_token()
        }
        return new Promise((resolve, reject) => {
            wx.request({
                url: HOST + url,
                method: method,
                data: data,
                header: header,
                success: (res) => {
                    if (res.data.code === 200) {
                        resolve(res.data)
                    } else { //非200状态
                        switch (res.data.code) {
                            case 400: //业务错误
                                toast.showToast(res.data.message);
                                break;
                            case 401: //授权失败
                                toast.showToast(res.data.message);
                                //user.login_out();
                                wx.navigateTo({url: '/pages/member/login/main'});
                                break;
                            case 404: //路由异常抛出
                                toast.showToast(res.data.message);
                                break;
                            case 500: //路由异常抛出
                                toast.showToast("服务器错误");
                                break;
                            default:
                                toast.showToast("未知错误");
                                break;
                        }
                        reject(res)
                    }

                },
                fail: (error) => {
                    reject(error)
                },
                complete: () => {
                    wx.stopPullDownRefresh()
                }
            })
        })
    },
    post(url, data) {
        return this.request('POST', url, data)
    },
    get(url, data) {
        return this.request('GET', url, data)
    },
    web_host() {
        return WEB_HOST;
    },
    upload(url, filePath, name = 'file', formData = {}) {
        if (user.get_token()) {
            header.Authorization = 'Bearer ' + user.get_token()
        }
        return new Promise((resolve, reject) => {
            const uploadTask = wx.uploadFile({
                url: HOST + url,
                filePath: filePath,
                header: header,
                name: name,
                formData: formData,
                success: (response) => {

                    const res = JSON.parse(response.data)

                    if (res.code === 200) {
                        resolve(res)
                    } else { //非200状态
                        switch (res.code) {
                            case 400: //业务错误
                                //toast.showToast(res.message);
                                break;
                            case 401: //授权失败
                                toast.showToast(res.message);
                                //user.login_out();
                                wx.navigateTo({url: '/pages/member/login/main'});
                                break;
                            case 404: //路由异常抛出
                                toast.showToast(res.message);
                                break;
                            case 500: //路由异常抛出
                                toast.showToast("服务器错误");
                                break;
                            default:
                                toast.showToast("未知错误");
                                break;
                        }
                        reject(res)
                    }

                },
                fail: (error) => {
                    reject(error)
                },
                complete: () => {}
            })
        })
    }
}
