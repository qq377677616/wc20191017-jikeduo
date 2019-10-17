// pages/audiocontrols/controls.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPause: {
      type: Boolean,
      value: false
    },
    isMain : {
      type: Boolean,
      value: true
    },
    isMan : {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isPause: false
  },
  attached() {
    this.controls(1)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    controls(isSwitch){
      var _backgroundAudioManager = app.globalData.backgroundAudioManager
      if (_backgroundAudioManager.paused) {
        if (isSwitch === 1) {
          this.properties.isPause = true
          this.setData({ isPause: true })
        } else {
          _backgroundAudioManager.play()
          wx.setStorageSync('ifPause', false)
          this.setData({ isPause: false })
          this.properties.isPause = false
        }
        console.log(wx.getStorageSync('isPlay'))
        if (wx.getStorageSync('isPlay')){
          _backgroundAudioManager.play()
        }
      } else {
        if (isSwitch === 1) { 
          this.setData({ isPause: false })
          this.properties.isPause = false
        } else {
         
          _backgroundAudioManager.pause()
          wx.setStorageSync('ifPause', true)
          this.setData({ isPause: true })
          this.properties.isPause = true
        }
      }
    }
  }
})
