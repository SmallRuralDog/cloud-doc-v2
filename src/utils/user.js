import http from './http'
const TOKEN_NAME = 'user-token'
const USER_NAME = 'user-data'
const CODE_NAME = 'user-code'
export default {
    get_code : function () {
        return new Promise((resolve, reject) => {
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

        })
    },
    wx_login : function () {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        this.set_code(res.code)
                        resolve(res.code)
                    } else {
                        reject(false)
                    }
                }
            })
        })
    },
    set_code : function (code) {
        wx.setStorageSync(CODE_NAME, code)
    },
    login : function (iv, encryptedData) {
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
    bind_login : function (id, iv, encryptedData) {
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
    set_token : function (token) {
        wx.setStorageSync(TOKEN_NAME, token)
    },
    get_token : function () {
        try {
            var value = wx.getStorageSync(TOKEN_NAME)
            if (value) {
                return value
            }
        } catch (e) {
            return false
        }
    },
    set_user : function (data) {
        wx.setStorageSync(USER_NAME, data)
    },
    get_user : function () {
        try {
            var value = wx.getStorageSync(USER_NAME)
            if (value) {
                return value
            }
        } catch (e) {
            return false
        }
    }
}