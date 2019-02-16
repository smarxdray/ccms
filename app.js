//app.js
App({
  onLaunch: function () {
    const { users } = require('./utils/data/users.js')
    this.globalData.users = users
    this.globalData.userInfo = users[0]
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    tabBars: {
      user: [
        '/pages/applicant/notifications/list/index',
        '/pages/applicant/rooms/datetime/index',
        '/pages/applicant/downloads/list/index',
        '/pages/applicant/me/index'
        ],
      admin: [
        '/pages/admin/rooms/list/index',
        '/pages/admin/repairs/list/index',
        '/pages/admin/resources/list/index',
        '/pages/admin/me/index'
      ],
      steward: [
        '/pages/steward/notifications/list/index',
        '/pages/steward/repairs/index',
        '/pages/steward/feedback/list/index',
        '/pages/steward/me/index'
      ]
    },
    homePages: [
      '/pages/admin/rooms/list/index',
      '/pages/steward/notifications/list/index',
      '/pages/applicant/notifications/list/index'
    ],
    users: [],
    userInfo: {}
  }
})