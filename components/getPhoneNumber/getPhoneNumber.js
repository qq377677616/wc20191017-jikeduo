// components/getPhoneNumber/getPhoneNumber.js
const gets = require('../../utils/publics/authorization.js')
const api = require('../../utils/api/myRequests.js')
const tool = require('../../utils/publics/tool')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: {
      isShow: false,
      type: 1,
      title: "手机号授权",
      test: "为了更好的体验，教练爱答题将自动获取您的手机号。",
      cancelText: "取消",
      confirmText: "授权",
      color_confirm: '#0BB20C'
    },
    parent_id: '',
    channel_id: '',
    requestNum: 0
  },
  ready() {
    if (!wx.getStorageSync('userInfo').phone) {
      this.myLogin()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //登录
    myLogin() {
      // gets.isCheckSession(res => {
      //   console.log("是否过期", res)
      // })
      tool.loading("")
      this.data.token = wx.getStorageSync('token')
      // tool.loading_h()
      // this.showHideModal()
      // // gets.login().then((value) => {
      console.log(wx.getStorageSync('token'))
      // console.log(wx.getStorageSync('token'))
        if (wx.getStorageSync('token')){
          tool.loading_h()
          this.showHideModal()
        }else {
          tool.loading_h()
          console.log("【服务器异常，请稍后再试】")
          // this.myLogin()
        }
      // }
    },
    //点击自定义Modal弹框上的确定按钮
    operation(e) {
      tool.loading("")
      if (e.detail.confirm) {
        this.showHideModal()
        this.data.encryptedData = e.detail.encryptedData
        console.log("【拿到encryptedData】", e.detail.encryptedData)
        this.data.iv = e.detail.iv
        this.decryptPhone()
      } else {
        console.log('点击了取消')
        tool.loading("")
        this.showHideModal()
        setTimeout(() => {
          tool.loading_h()
          this.showHideModal()
        }, 600)
      }
    },
    //解密手机号
    decryptPhone() {
      let _data = {
        token: wx.getStorageSync('token'),
        encryptedData: this.data.encryptedData,
        iv: this.data.iv
      }
      api.getPhoneNumber(_data).then(res => {
        console.log("getPhoneNumber", res)
        console.log(res)
        if (res.data.code == '0000') {
          let _userInfo = wx.getStorageSync("userInfo")
          _userInfo.phone = res.data.result
          wx.setStorageSync("userInfo", _userInfo)
          tool.loading_h()
          this.triggerEvent("getPhoneNumber", { phone: wx.getStorageSync("userInfo").phone })
          if (wx.getStorageSync('sex') == 3) {
            tool.alert('请选择角色!')
            return;
          } else {
            wx.redirectTo({
              url: '/pages/main/main'
            })
          }
        } else {
          if (this.data.requestNum >= 5) return
          this.data.requestNum++
          //this.myLogin()
          tool.loading_h()
          console.log("【手机号解密失败】")
        }
      })
    },
    //打开、关闭自定义Modal弹框
    showHideModal() {
      let _showModal = this.data.showModal
      _showModal.isShow = !_showModal.isShow
      this.setData({ showModal: _showModal })
    },
  }
})

