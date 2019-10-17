//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgList : [],
    showNum : 1,
    imgUrl : ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let $this = this;
    let imgList = $this.data.imgList
    for(let i = 1;i<=68;i++){
       let Obj = new Object();
      Obj.url = 'http://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/guide/n_'+i+".jpg"
      imgList.push(Obj)
    }
    $this.setData({
      imgList: imgList
    })

    // setTimeout(()=>{
    //   wx.setStorageSync('topicNum', 0)
    //   wx.setStorageSync('audio', 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/videos/bg-music.mp3')
    //   wx.redirectTo({
    //     url: '/pages/select/select'
    //   })
    // },58)

      setTimeout(()=>{
        this.timers(1)
      },500)
    


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  timers: function (count) {
    var that = this;
    var j = 1;
    that.data.timer = setInterval(function () {
      count++;
      j = j % 68;
      j++;
      that.setData({
        showNum: j
      })
      if (that.data.showNum >= 68) {
        clearInterval(that.data.timer)
        wx.setStorageSync('topicNum', 0)
        wx.setStorageSync('audio', 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/videos/bg-music.mp3')


        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/select/select'
          })
        },500)
      }
    }, 100)  
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮

      api.viewShare({
        token: wx.getStorageSync('token')
      }).then((res) => {
        wx.setStorageSync('isShare', true)
        this.findCount();
      }).catch((err) => {

      })
    }

    return {
      title: '测一测你是哪种教练',
      path: 'pages/index/index?channelId=' + wx.getStorageSync('channelId'),
      imageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_share.png',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})
