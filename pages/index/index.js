// pages/main/main.js
import api from '../../utils/api/myRequests.js'
import auth from '../../utils/publics/authorization.js'
import tool from '../../utils/publics/tool.js'
import mta from '../../utils/mta_analysis.js'
import Api from '../../utils/api/requstModel.js'
const utils = require('../../utils/v_util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginNum: 0,
    isGetPhoneNumber : false,
    img : '',
    imageOption : {
      audio: '',
      play: true,
      image: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_male.png'
    },
    sex : 3,
    isPause : '',
    isTrue : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('sex', 3)
    mta.Page.init()
    wx.setStorageSync('topicNum', 0)
    this.setData({
      img: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_male.png'
    })
    let channelId = wx.getStorageSync('channelId')
    
    Api.isTrue({}).then((res) => {
      if (res.data.code == '1111') {
        console.log(res.data.message)
        wx.setStorageSync('token', res.data.message)
        this.setData({
          isTrue: res.data.message
        })
        wx.setStorage({
          key: 'isTrue',
          data: res.data.message,
        })
      }
    }).catch((err) => {})

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
  changeSex(e){
    let $this = this;
    let sex = e.currentTarget.dataset.sex
    wx.setStorageSync('sex', parseInt(sex))
    $this.setData({
      sex: sex
    })
  },
  getUserInfo(e) {
    
    let _this = this;

    if(_this.data.isTrue != '') {
      if (wx.getStorageSync('sex') == 3) {
        wx.showToast({
          title: '请选择角色!',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.redirectTo({
          url: '/pages/main/main'
        })
      }
    }else {

      // wx.setStorageSync('userInfo', e.detail.userInfo)
      let myLogin = (userInfo) => {
        //微信小程序登录
        auth.login().then(res => {
          // console.log("微信登录后获取拿到code-->", res)
          return res
        }).then(res => {
          //获取code后请求后端登录接口
          return api.getOpenid({ code: res.code })
        }).then(res => {
          if (res.data.code == '0000') {
            wx.setStorageSync("userInfo", userInfo)
            let token = res.data.result.token
            api.getUserInfo({ json: JSON.stringify(userInfo), token: res.data.result.token }).then((res) => {
              wx.setStorageSync("token", token)
              this.setData({ isGetPhoneNumber: true })
              Api.numSubscribers({ channelId: wx.getStorageSync('channelId') })
            })
          } else {
            if (this.data.loginNum < 5) {
              myLogin(userInfo)
              this.data.loginNum++
            } else {
              tool.alert("登录失败，请稍后再试")
              this.data.loginNum = 0
            }
          }
        })
      }
      if (e.detail.userInfo) {
        let { userInfo } = e.detail
        if (!wx.getStorageSync('token')) {
          myLogin(userInfo)
        } else {
          if (wx.getStorageSync("userInfo").phone == '' || wx.getStorageSync("userInfo").phone == null) {

            this.setData({ isGetPhoneNumber: true })
            // tool.jump_back()
          } else {
            if (wx.getStorageSync('sex') == 3) {
              wx.showToast({
                title: '请选择角色!',
                icon: 'none',
                duration: 1000
              })
            } else {
              wx.redirectTo({
                url: '/pages/main/main'
              })
            }
          }
        }
      } else {
        tool.showModal("授权提示", "为了更好的体验,请先进行授权", "好的,#A3271F", false)
      }
    }


  },
  getPhoneNumber(e) {
    // tool.alert("获取手机号成功")
    this.setData({ myPhone: e.detail.phone })
  }
})