import http from './http'
const TOKEN_NAME = 'user-token'
const USER_NAME = 'user-data'
const CODE_NAME = 'user-code'
export default {
    get_code() {
        /*return new Promise((resolve, reject) => {
            wx.checkSession({
                success: () => {
                    if (wx.getStorageSync(CODE_NAME)) {
                        resolve(wx.getStorageSync(CODE_NAME))
                    } else {
                        resolve(this.wx_login())
                    }
                },
                fail: () => {
                    resolve(this.wx_login())
                }
            })

        })*/
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        //this.set_code(res.code)
                        resolve(res.code)
                    } else {
                        reject(false)
                    }
                }
            })
        })
    },
    wx_login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        //this.set_code(res.code)
                        resolve(res.code)
                    } else {
                        reject(false)
                    }
                }
            })
        })
    },
    set_code(code) {
        wx.setStorageSync(CODE_NAME, code)
    },
    login(iv, encryptedData) {
        return new Promise((resolve, reject) => {
            this
                .get_code()
                .then((res) => {
                    http
                        .post("v1/wx-login", {
                        code: res,
                        iv: iv,
                        encryptedData: encryptedData
                    })
                        .then(res => {
                            if (res.data.token) {
                                this.set_token(res.data.token)
                                this.set_user(res.data.user)
                            }
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    bind_login(id, iv, encryptedData) {
        return new Promise((resolve, reject) => {
            this
                .get_code()
                .then((res) => {
                    http
                        .post("v1/wx-bind-login", {
                        id: id,
                        code: res,
                        iv: iv,
                        encryptedData: encryptedData
                    })
                        .then(res => {
                            if (res.data.token) {
                                this.set_token(res.data.token)
                                this.set_user(res.data.user)
                            }
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    login_out() {
        wx.removeStorageSync(TOKEN_NAME)
        wx.removeStorageSync(USER_NAME)
        return true
    },
    set_token(token) {
        wx.setStorageSync(TOKEN_NAME, token)
    },
    get_token() {
        try {
            var value = wx.getStorageSync(TOKEN_NAME)
            if (value) {
                return value
            }
        } catch (e) {
            return false
        }
    },
    set_user(data) {
        wx.setStorageSync(USER_NAME, data)
    },
    get_user() {
        try {
            var value = wx.getStorageSync(USER_NAME)
            if (value) {
                return value
            }
        } catch (e) {
            return false
        }
    },
    is_login() {
        return this.get_token()
            ? true
            : false
    },
    check_login() {
        if (!this.is_login()) {
            wx.navigateTo({url: '/pages/member/login/main'});
            return false;
        } else {
            return true
        }
    }
}