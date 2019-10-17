//index.js
import api from '../../utils/api/requstModel.js'
import tool from '../../utils/publics/tool.js'
Page({
  data: {
    showModal : false,
    prizeInfo : {
      url : '../../assets/images/icons/123.jpg'
    },
    addressInfo : {
      name : '',
      phone : '',
      address : ''
    },
    prize: [
      { id: 1, name: "30元平台代金券", img: 'http://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/prize_0.png'},
      { id: 2, name: "海德利水解支链氨基酸1罐", img: 'http://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/prize_1.png' },
      { id: 2, name: "Protein增肌粉5.5榜1袋", img: 'http://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/prize_2.png' },
      { id: 3, name: "冷感毛巾一条", img: 'http://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/prize_3.png'},
      { id: 5, name: "谢谢参与", img: '' },
      { id: 4, name: "欧普特蒙5磅一桶", img: 'http://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/prize_5.png' }
    ],
    prize_cur: [
      { num: 3, name: "30元平台代金券" },
      { num: 7, name: "海德利水解支链氨基酸1罐" },
      { num: 6, name: "Protein增肌粉5.5榜1袋" },
      { num: 5, name: "冷感毛巾一条" },
      { num: 3, name: "谢谢参与" },
      { num: 7, name: "欧普特蒙5磅一桶" }
    ],
    curNumDeg: 0,
    needleDeg: -90,
    isPrize: true,
    time: 6000,
    count : 1,
    prizeName : '',
    getPrize : false,
    url : ''
  },
  onLoad() {
    this.findCount()
    this.init()
  },
  //转盘初始化
  init() {
    let _prize = this.data.prize
    let _curNum = _prize.length
    let _curNumDeg = 360 / _curNum
    let _allDeg = []
    for (let i = 0; i < _curNum; i++) {
      _prize[i].deg = _curNumDeg * i
    }
    this.setData({
      prize: _prize,
      curNumDeg: _curNumDeg
    })
  },
  //点击开始抽奖
  start() {
    if(this.data.count > 0){
      this.sendDraw()
    }else {
      wx.showToast({
        title: '您已无抽奖次数！',
        icon : 'none',
        duration : 1000
      })
    }
    // if (this.data.count > 0) {
    //   // let _num = Math.floor(Math.random() * this.data.prize_cur.length)
    //   let _num = 0  // 0 => 下标为 0 的gift
    //   let surplus = 0
    //   _num = Math.round(Math.random() * 5);
    //   surplus = _num
    //   this.setData({
    //     url : this.data.prize[_num].img
    //   })
    //   this.setData({
    //     prizeName: this.data.prize_cur[_num].name
    //   })
    //   let _needleDeg = (_num) * this.data.curNumDeg - 90 + this.data.needleDeg + (360 - this.data.needleDeg % 360) + 1800 + 30
    //   this.setData({ isPrize: false, needleDeg: _needleDeg })
    //   if (_num != 4){
    //     setTimeout(() => {
    //       this.setData({ showModal: true })
    //       // tool.showModal("抽奖结果", this.data.prize_cur[_num].name, "好的,#00B26A", false)
    //       this.setData({ getPrize: true })
    //     }, this.data.time + 300)
    //   }else {
    //     setTimeout(() => {
    //       this.setData({ showModal: true })
    //       // tool.showModal("抽奖结果", this.data.prize_cur[_num].name, "好的,#00B26A", false)
    //       this.setData({ getPrize: false })
    //     }, this.data.time + 300)
    //   }
    //   this.setData({
    //     count: this.data.count-1
    //   })
    // }
  },
  findCount: function(){
    let $this = this;
    api.selectStatus({
      token : wx.getStorageSync('token')
    }).then((res)=>{
        if(res.data.code == '0000'){
          
          if (wx.getStorageSync('isShare')){
            $this.setData({
              count: parseInt(res.data.result)
            })
          }else {
              if (res.data.result > 0) {
                  $this.setData({
                    count: parseInt(res.data.result - 1)
                  })
              }else {
                $this.setData({
                  count: parseInt(res.data.result)
                })
              } 

          }
        }else {
          $this.setData({
            count: 0
          })
        }
    }).catch((err)=>{

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

  },
  sendShare(){
      let $this = this;
      api.viewShare({
        token : wx.getStorageSync('token')
      }).then((res)=>{
          
      }).catch((err)=>{

      })
  },
  sendDraw(){
    api.clickPrize({ token: wx.getStorageSync('token') }).then((res)=>{
        if(res.data.code == '0000'){
          let _num = '';
          this.data.prize.forEach((item,index)=>{
            if (item.name == res.data.result){
              _num = index
            }
          })
          this.setData({
            url: this.data.prize[_num].img
          })
          this.setData({
            prizeName: res.data.result
          })
          let _needleDeg = (_num) * this.data.curNumDeg - 90 + this.data.needleDeg + (360 - this.data.needleDeg % 360) + 1800 + 30
          this.setData({ isPrize: false, needleDeg: _needleDeg })
          if (_num != 4) {
            setTimeout(() => {
              this.setData({ showModal: true })
              // tool.showModal("抽奖结果", this.data.prize_cur[_num].name, "好的,#00B26A", false)
              this.setData({ getPrize: true })
            }, this.data.time + 300)
          } else {
            setTimeout(() => {
              this.setData({ showModal: true })
              // tool.showModal("抽奖结果", this.data.prize_cur[_num].name, "好的,#00B26A", false)
              this.setData({ getPrize: false })
            }, this.data.time + 300)
          }
          this.setData({
            count: this.data.count - 1
          })
        }else {
          wx.showToast({
            title: ""+res.data.message+"!",
            icon : 'none' ,
            duration : 1000
          })
        }
    }).catch((err)=>{

    })
  },
  hideModal(){
    let $this = this;
    $this.setData({
      showModal : false
    })
  },
  changeName (e){
    let $this = this;
    let value = e.detail.value;
    let name = 'addressInfo.name'
    $this.setData({
      [name] : value
    })
  },
  changePhone(e) {
    let $this = this;
    let value = e.detail.value;
    let phone = 'addressInfo.phone'
    $this.setData({
      [phone] : value
    })
  },
  changeArea(e) {
    let $this = this;
    let value = e.detail.value;
    let address = 'addressInfo.address'
    $this.setData({
      [address]: value
    })
  },
  saveAddress(){
    let $this = this;
    let batchNo = wx.getStorageSync('batchNo'),
        contactName = $this.data.addressInfo.name,
        userPhone = $this.data.addressInfo.phone,
        contactAddress = $this.data.addressInfo.address
    if (contactName == ''){
      wx.showToast({
        title: '姓名不能为空！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return;
    }
    if (userPhone == ''){
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return; 
    }
    if (contactAddress == '') {
      wx.showToast({
        title: '地址栏不能为空！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return;
    }
    wx.showLoading({
      title: '提交中',
    })
    api.saveAddress({
      token: wx.getStorageSync('token'),
      batchNo: batchNo,
      contactName: contactName,
      userPhone: userPhone,
      contactAddress: contactAddress
    }).then((res) => {
        if(res.data.code == '0000'){

          setTimeout(()=>{
            wx.hideLoading();
            this.setData({
              showModal: false
            })
            setTimeout(()=>{
              wx.showToast({
                title: '提交成功！',
                icon: 'none',
                duration: 1000,
                mask: true
              })
              this.findCount();
            },500)
          },1500)
          
        }else {
          wx.showToast({
            title: ""+res.data.message+"!",
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
    }).catch((err) => {

    })
  }
})
