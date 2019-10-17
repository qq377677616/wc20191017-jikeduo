// pages/select/select.js
import api from '../../utils/api/requstModel.js'
import tool from '../../utils/publics/tool.js'
import utils_ from '../../utils/utils.js'
const utils = require('../../utils/v_util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPause: '',
    beforeImg: '',
    topicNum: 0,
    audio : '',
    sex : '',
    topicList : [],
    list : ['A','B','C','D','E'],
    activeIndex: "",
    lastIndex: '',
    nowId : '',
    ifadd : false,
    count : 0,
    buttonClicked: false,
    touchStartTime: 0, // 触摸开始时间
    touchEndTime: 0, // 触摸结束时间
    lastTapTime: 0 ,// 最后一次单击事件点击发生时间
    isThree:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 0 => 女  1 => 男
    if (this.data.topicNum == 0){
      tool.loading("加载中", "loading");
      setTimeout(() => {
        tool.loading_h()
      },1500)
    }

    let $this = this;
    $this.setData({ isPause: utils.audioState(1) })
    let topicNum = wx.getStorageSync('topicNum')
    let sex = wx.getStorageSync('sex')
    let channelId = wx.getStorageSync('channelId')
    // let channelId = 1
    let audio = wx.getStorageSync('audio')
    $this.setData({
      audio: audio
    })
    $this.setData({
      topicNum: topicNum,
      sex : sex
    })
    let data = new Object();
    let token = wx.getStorageSync('token')
    if (this.data.topicNum == 0){
      api.startTopic({
        token: wx.getStorageSync('token'),
        sex: sex,
        channelId: channelId
      }).then((res) => {
        if (res.data.result) {
          res.data.result.forEach((item) => {
            item.content.forEach((cItem) => {
              cItem.checked = false
            })
          })
          $this.setData({ topicList: res.data.result })

        } else {
          $this.setData({ topicList: [] })
        }
      }).catch((err) => {
      })
    }else {
      this.findList()
    }
    // request.postP('https://dev.flyh5.cn/fitness-coach/interface/recording/startTopic',data).then((res)=>{
    // })

    // wx.request({
    //   url: 'https://dev.flyh5.cn/fitness-coach/interface/recording/startTopic',
    //   data: data,
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     if(res.data.result){
          // res.data.result.forEach((item)=>{
          //    item.content.forEach((cItem)=>{
          //       cItem.checked = false
          //    })
          // })
          // $this.setData({ topicList: res.data.result})
    //     }else {
    //       $this.setData({ topicList: [] })
    //     }
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })

    // let innerAudioContext = wx.createAudioContext('bgMusic');
    // innerAudioContext.play();
  },
  findList(){
    let $this = this;
    wx.setStorageSync('topicNum', wx.getStorageSync('topicNum')+1)
    let sex = wx.getStorageSync('sex')
    let audio = wx.getStorageSync('audio')
    $this.setData({
      audio: audio
    })
    $this.setData({
      topicNum: topicNum,
      sex: sex
    })
    let token = wx.getStorageSync('token')
    this.data.topicList.forEach((item) => {
      item.content.forEach((cItem) => {
        cItem.checked = false
      })
    })
    
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
    this.setData({ isPause: utils.audioState(1) })
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

  },
  throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }

    let _lastTime = null

    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  },

  touchStart(e) {
    this.touchStartTime = e.timeStamp;
  },
  touchEnd(e) {
    this.touchEndTime = e.timeStamp;
  },
  doubleTap(item, e) {
    var vm = this;
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    console.log(123)
    console.log(vm.touchEndTime - vm.touchStartTime)
    if (vm.touchEndTime - vm.touchStartTime < 350) {
      // 当前点击的时间
      
      var currentTime = e.timeStamp;
      var lastTapTime = vm.lastTapTime;
      // 更新最后一次点击时间
      vm.lastTapTime = currentTime;
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime > 300) {
        // do something 点击事件具体执行那个业务
        vm.sureSubmit();
      }
    }
  },
  nextStageBefore(e) {
    // this.globalData.backgroundAudioManager.pause()
    let $this = this;
    let type = $this.data.topicNum
    this.setData({ isPause: utils.audioState(1) })
    let sign = e.currentTarget.dataset.sign
    let sIndex = e.currentTarget.dataset.index
    let audio = e.currentTarget.dataset.audio
    let id = e.currentTarget.dataset.id
    let parentIndex = e.currentTarget.dataset.parentIndex
    let innerAudioContext = wx.createAudioContext("point" + parentIndex + "_" + sIndex);
    innerAudioContext.play();

    let list = $this.data.topicList
    list[type].content.forEach((item, index) => {
      item.checked = false
    })
    list[type].content.forEach((item, index) => {
      if (index == sIndex) {
        item.checked = true
      }
    })
    this.setData({
      nowId: id
    })
    $this.setData({
      topicList: list
    })
  },
  sureSubmit(){
    let $this = this;
    if ($this.data.isThree==0){ 
      let checked = $this.data.topicList[$this.data.topicNum].content.some((item) => {
        return item.checked
      })
      if (checked) {
        $this.setData({
          isThree:1,
        })
        wx.setStorageSync('topicNum', parseInt(wx.getStorageSync('topicNum')) + 1)
        let num = wx.getStorageSync('topicNum')
        api.nextTopic({
          token: wx.getStorageSync('token'),
          optionId: $this.data.nowId
        }).then((res) => {

          if (num == 6) {
            wx.redirectTo({
              url: '/pages/label/label'
            })
          } else {
            $this.setData({
              topicNum: wx.getStorageSync('topicNum'),
            })
          
            if (!wx.getStorageSync('ifPause')) {
              app.globalData.backgroundAudioManager.play()
            }
          }


        }).catch((err) => {

        })

      } else {
        wx.showToast({
          title: '请选择选项！',
          icon: 'none',
          duration: 1000
        })
      }
      setTimeout(()=>{
        $this.setData({
          isThree:0,
        })
      },1500)
    }
    

  }
})