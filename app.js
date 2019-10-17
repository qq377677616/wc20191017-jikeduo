//app.js
import mta from './utils/mta_analysis.js'
import auth from './utils/publics/authorization.js'
import tool from './utils/publics/tool.js'
import api from './utils/api/requstModel.js'
App({
  onLaunch: function (options) {
    console.log(options)
    // 展示本地存储能力
    var channelId = ''
    channelId = options.query.channelId || decodeURIComponent(options.query.scene).split("=")[1];
    (channelId == undefined || channelId == '') ? wx.setStorageSync('channelId', 1) : wx.setStorageSync('channelId', channelId);
    channelId = channelId || wx.getStorageSync('channelId');
    api.numClick({ channelId: channelId })
    wx.setStorageSync('ifPause',false)
    this.backAudio()
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
    auth.statistics(mta, {    
      "appID": "500693126",
      "eventID": "500693127",
      "autoReport": true,
      "statParam": true,
      "ignoreParams": [],
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    })
    
    this.globalData.sex = 0
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
  backAudio() {
    this.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.globalData.backgroundAudioManager.title = '教练爱答题背景音乐'
    this.globalData.backgroundAudioManager.epname = '教练爱答题背景音乐'
    this.globalData.backgroundAudioManager.singer = '教练爱答题'
    this.globalData.backgroundAudioManager.coverImgUrl = 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_male.png'
    //设置了 src 之后会自动播放
    this.globalData.backgroundAudioManager.src = 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/videos/jkd_bg.mp3'
    this.globalData.backgroundAudioManager.onEnded(() => {
      this.backAudio()
    })    
  },

  globalData: {
    userInfo: null,
    sex : '',
    count : 0
  },
  onHide: function () {
    this.globalData.backgroundAudioManager.pause()
  },
  onShow: function () {
    
    this.globalData.backgroundAudioManager.play()
  }
})