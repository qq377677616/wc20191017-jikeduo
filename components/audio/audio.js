// 背景音乐
const innerAudioContext = wx.createInnerAudioContext()
Page({
  /**
 - 页面的初始数据
   */
  data: {
    mp3: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/videos/2.mp3',

    // 背景音乐
    bgm: false,
  },

  // 背景音乐
  BGM: function (e) {
    let that = this;
    if (that.data.bgm) {
      that.setData({
        bgm: false,
      })
      innerAudioContext.pause(); /**  暂停音乐 */

    } else {
      that.setData({
        bgm: true,
        bgmImgAni: "bgmImgAni"
      })

      // 播放音乐
      innerAudioContext.autoplay = true
      innerAudioContext.loop = true
      innerAudioContext.src = that.data.mp3;
      innerAudioContext.play()
    }
  },
  /**
 - 生命周期函数--页面卸载时
   */
  onUnload() {
    wx.setStorageSync("bgm", this.data.bgm)
  },
  /**
 - 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var bgm = wx.getStorageSync("bgm")
    this.setData({
      bgm
    })
  }
})