// components/bg_audio/bg_audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  properties: {
    play: {
      type : String,
      value: false
    },
    image: {
      type: String,
      value: ''
    },
    audio: {
      type: String,
      value: ''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let $this = this;
      let innerAudioContext = wx.createAudioContext('bgMusic');
      innerAudioContext.play();
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickPlay(){
    let $this = this;
    console.log(123)
    $this.setData({
      play : !$this.data.play
    })
    let innerAudioContext = wx.createAudioContext('bgMusic');
    if ($this.data.play){
      innerAudioContext.play();
    }else {
      innerAudioContext.pause();
    }
  }
})