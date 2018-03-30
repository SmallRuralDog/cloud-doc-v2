import user from './user'
const HOST = 'http://192.168.10.54:88/api/'
const SystemInfo = wx.getSystemInfoSync()
const header = {
    'Accept': 'application/json',
    'content-type': 'application/json',
    'SystemInfo': JSON.stringify(SystemInfo)
}
if (user.get_token()) {
    header.Authorization = 'Bearer ' + user.get_token()
}
export default {
    request : function (method, url, data) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: HOST + url,
                method: method,
                data: data,
                header: header,
                success: (res) => {
                    resolve(res.data)
                },
                fail: (error) => {
                    reject(error)
                },
                complete: () => {}
            })
        })
    },
    post : function (url, data) {
        return this.request('POST', url, data)
    },
    get : function (url, data) {
        return this.request('GET', url, data)
    }
}