// pages/label/label.js
import api from '../../utils/api/requstModel.js'
import tool from '../../utils/publics/tool.js'
import auth from '../../utils/publics/authorization.js'
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systeamInfo : {},
      isTrue : false,
      isLoad : false,
      codeUrl: '',
      resultObj : {},
      labelList : [],
      height : '',
      width : '',
      time : 1,
      num : '',
      photoModal : false,
      showModalOptionOption: {
        isShow: false,
        title: "访问手机相册",
        test: "小程序将访问您的手机相册，将生成的海报保存到您的手机相册。",
        cancelText: "取消",
        confirmText: "确定",
        color_confirm: "#0BB20C"
      },
      isModal : false,
      posterImgUrl: '',
  
    positionList: [{
      title: '小公举',
      position: [{
        id: 0,
        x: 80,
        y: 190
      }, {
        id: 1,
        x: 400,
        y: 270
      }, {
        id: 2,
        x: 30,
        y: 380
      }, {
        id: 3,
        x: 380,
        y: 410
      }, {
        id: 4,
        x: 50,
        y: 490
      }, {
        id: 5,
        x: 400,
        y: 580
      }]
    },{
      title: '奶狗',
      position: [{
        id: 0,
        x: 60,
        y: 220
      }, {
        id: 1,
        x: 440,
        y: 280
      }, {
        id: 2,
        x: 40,
        y: 360
      }, {
        id: 3,
        x: 380,
        y: 400
      }, {
        id: 4,
        x: 40,
        y: 490
      }, {
        id: 5,
        x: 450,
        y: 555
      }]
    },{
      title: '大叔',
      position: [{
        id: 0,
        x: 40,
        y: 160
      }, {
        id: 1,
        x: 440,
        y: 270
      }, {
        id: 2,
        x: 10,
        y: 370
      }, {
        id: 3,
        x: 410,
        y: 400
      }, {
        id: 4,
        x: 40,
        y: 480
      }, {
        id: 5,
        x: 460,
        y: 540
      }]
    },{
      title: '彭于晏',
      position: [{
        id: 0,
        x: 440,
        y: 160
      }, {
        id: 1,
        x: 400,
        y: 290
      }, {
        id: 2,
        x: 40,
        y: 360
      }, {
        id: 3,
        x: 440,
        y: 400
      }, {
        id: 4,
        x: 30,
        y: 480
      }, {
        id: 5,
        x: 400,
        y: 555
      }]
    },{
    title: '教父',  
    position: [{
      id: 0,
      x: 420,
      y: 160
    }, {
      id: 1,
      x: 410,
      y: 280
    }, {
      id: 2,
      x: 75,
      y: 360
    }, {
      id: 3,
      x: 450,
      y: 390
    }, {
      id: 4,
      x: 40,
      y: 460
    }, {
      id: 5,
      x: 405,
      y: 570
    }]
    }, {
        title: '女王',
        position: [{
          id: 0,
          x: 65,
          y: 220
        }, {
          id: 1,
          x: 410,
          y: 280
        }, {
          id: 2,
          x: 70,
          y: 360
        }, {
          id: 3,
          x: 450,
          y: 410
        }, {
          id: 4,
          x: 50,
          y: 490
        }, {
          id: 5,
          x: 410,
          y: 570
        }]
      },{
      title: '豪杰',
      position: [{
        id: 0,
        x: 60,
        y: 220
      }, {
        id: 1,
        x: 415,
        y: 300
      }, {
        id: 2,
        x: 50,
        y: 345
      }, {
        id: 3,
        x: 440,
        y: 400
      }, {
        id: 4,
        x: 30,
        y: 480
      }, {
        id: 5,
        x: 400,
        y: 580
      }]
    }, {
      title: '一哥',
      position: [{
        id: 0,
        x: 80,
        y: 250
      }, {
        id: 1,
        x: 430,
        y: 275
      }, {
        id: 2,
        x: 50,
        y: 370
      }, {
        id: 3,
        x: 460,
        y: 430
      }, {
        id: 4,
        x: 50,
        y: 550
      }, {
        id: 5,
        x: 430,
        y: 580
      }]
      }, {
        title: '硬核',
        position: [{
          id: 0,
          x: 80,
          y: 190
        }, {
          id: 1,
          x: 440,
          y: 250
        }, {
          id: 2,
          x: 20,
          y: 360
        }, {
          id: 3,
          x: 430,
          y: 490
        }, {
          id: 4,
          x: 100,
          y: 590
        }, {
          id: 5,
          x: 460,
          y: 610
        }]
      }],
      urlObj : [{
        id : 1,
        title : '大叔',
        color : '#5f7a99',
        bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_1.png',
        personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_11.png',
        pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_1.png',
        nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
        labelList: [{
          title: '外协',
          url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_3.png',
          width: 115
        }, {
            title: '霸气',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_4.png',
            width: 115
          }, {
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_5.png',
            width: 115
          }, {
            title: '爱装',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_7.png',
            width: 115
          },{
            title: '有料',
          url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_8.png',
            width: 115
          }, {
            title: '完美主义晚期',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_6.png',
            width : 220         
          }],
        label : [
          {
          title: '爱秀身材',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_49.png'
        }, {
            title: '小懒',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_50.png'
          }, {
            title: '勤奋型',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_51.png'
          }, {
            title: '小高冷',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_52.png'
          },{
            title: '急性子',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_53.png'
          }, {
            title: '耐力超群',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_54.png'
          }, {
            title: '耿直Boy',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_55.png'
          },
          {
            title: '豪放不羁',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_56.png'
          },
          {
            title: '颜值控',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57.png'
          },
          {
            title: '不服就干',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57_1.png'
          },
          {
            title: '超来电',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57_2.png'
          },
          {
            title: '传销大师',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57_3.png'
          },
          {
            title: '精明干练',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57_4.png'
          },
          {
            title: '能力爆棚',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57_5.png'
          },
          {
            title: '令人歆羡',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_57_6.png'
          }
        ]
      }, {
          id: 2,
          title: '彭于晏',
          color: '#e69f73',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_2.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_15.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '外协',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_7.png'
          }, {
              title: '霸气',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_8.png'
          }, {
              title: '率真',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_9.png'
          }, {
            title: '有料',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_11.png'
          }, {
            title: '爱装',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_12.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/2/page2_10.png'
            }
          ],
          label: [
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_13.png',
            }, {
              title: '小懒',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_14.png'
            }, {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_15.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_16.png'
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_17.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_18.png'
            }, {
              title: '耿直Boy',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_19.png'
            },
            {
              title: '豪放不羁',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_20.png'
            },
            {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_21_6.png'
            }
          ]
        },
        {
          id: 3,
          title: '豪杰',
          color: '#e7ac88',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_3.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_10.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_4.png'
          }, {
            title: '外协',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_5.png'
          }, {
            title: '霸气',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_6.png'
          }, {
            title: '好学',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_8.png'
          }, {
            title: '有料',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_9.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/3/page3_7.png'
            }],
          label: [
            {
              title: '傲娇',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_1.png'
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_2.png'
            }, {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_3.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_4.png'
            }, {
              title: '耿直Girl',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_5.png'
            }, {
              title: '霸气侧漏',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_6.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_7.png'
            },
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_8.png'
            },
            {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_9_6.png'
            }
          ]
        },
        {
          id: 4,
          title: '女王',
          color: '#aeb0e7',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_4.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_15.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_6.png'
          }, {
            title: '外协',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_7.png'
          }, {
            title: '霸气',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_8.png'
            }, {
              title: '有料',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_10.png'
            },{
            title: '好学',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_11.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/4/page4_9.png'
            }],
          label: [
            {
              title: '傲娇',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_19.png'
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_20.png'
            }, {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_21.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_22.png'
            }, {
              title: '耿直Girl',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_23.png'
            }, {
              title: '霸气侧漏',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_24.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_25.png'
            },
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_26.png'
            },
            {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_27_6.png'
            }
          ]
        },
        {
          id: 5,
          title: '教父',
          color: '#274abd',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_5.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_12.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '霸气',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_6.png'
          }, {
              title: '外协',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_7.png'
            },{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_8.png'
          },   {
              title: '爱装',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_10.png'
            },{
            title: '有料',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_11.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/5/page5_9.png'
            }],
          label: [
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_31.png'
            }, {
              title: '小懒',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_32.png'
            }, {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_33.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_34.png'
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_35.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_36.png'
            }, {
              title: '耿直Boy',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_37.png'
            },
            {
              title: '豪放不羁',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_38.png'
            },
            {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_39_6.png'
            }
          ]
        },
        {
          id: 6,
          title: '奶狗',
          color: '#6e8aa9',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_6.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_16.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_6.png'
          }, {
            title: '外协',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_7.png'
          }, {
            title: '霸气',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_8.png'
          }, {
            title: '有料',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_11.png'
          }, {
            title: '爱装',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_12.png'
          }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/6/page6_9.png'
            }],
          label: [
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_22.png'
            }, {
              title: '小懒',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_23.png'
            }, {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_24.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_25.png'
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_26.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_27.png'
            }, {
              title: '耿直Boy',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_28.png'
            },
            {
              title: '豪放不羁',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_29.png'
            },
            {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_30_6.png'
            }
          ]
        },
        {
          id: 7,
          title: '小公举',
          color: '#88c4c4',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_7.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_15.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_6.png'
          }, {
            title: '霸气',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_7.png'
          }, {
            title: '外协',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_8.png'
          }, {
            title: '有料',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_10.png'
          }, {
            title: '好学',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_11.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/7/page7_9.png'
            }],
          label: [
            {
              title: '傲娇',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_10.png'
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_11.png',
              width : 140,
              height:70
            }, {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_12.png',
              width: 140,
              height: 70
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_13.png'
            }, {
              title: '耿直Girl',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_14.png'
            }, {
              title: '霸气侧漏',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_15.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_16.png'
            },
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_17.png'
            },
            {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_female/girl_18_6.png'
            }
          ]
        },
        {
          id: 8,
          title: '一哥',
          color: '#b48d80',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_8.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_1.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_12.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_6.png'
          }, {
              title: '外协',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_7.png'
          }, {
              title: '霸气',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_8.png'
          }, {
            title: '有料',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_10.png'
          }, {
            title: '爱装',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_11.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/8/page8_9.png'
            }],
          label: [
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_40.png'
            }, {
              title: '小懒',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_41.png'
            }, {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_42.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_43.png'
            }, {
              title: '急性子',
             url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_44.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_45.png'
            }, {
              title: '耿直Boy',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_46.png'
            },
            {
              title: '豪放不羁',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_47.png'
            },
            {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48.png'
            },
            {
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_48_6.png'
            }
          ]
        },
        {
          id: 9,
          title: '硬核',
          color: '#757575',
          bgUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/bg_9.png',
          personUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_15.png',
          pageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_1.png',
          nickUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/1/page1_10.png',
          labelList: [{
            title: '率真',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_6.png',
          }, {
              title: '霸气',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_7.png'
          }, {
              title: '外协',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_8.png'
          }, {
            title: '有料',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_10.png'
          }, {
            title: '爱装',
            url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_11.png'
            }, {
              title: '完美主义晚期',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/9/page9_9.png'
            }],
          label: [
            {
              title: '爱秀身材',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_4.png',
            }, {
              title: '小懒',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_5.png'
            }, {
              title: '勤奋型',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_6.png'
            }, {
              title: '小高冷',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_7.png',
            }, {
              title: '急性子',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_8.png'
            }, {
              title: '耐力超群',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_9.png'
            }, {
              title: '耿直Boy',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_10.png'
            },
            {
              title: '豪放不羁',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_11.png'
            },
            {
              title: '颜值控',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12.png'
            },{
              title: '不服就干',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12_1.png'
            },
            {
              title: '超来电',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12_2.png'
            },
            {
              title: '传销大师',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12_3.png'
            },
            {
              title: '精明干练',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12_4.png'
            },
            {
              title: '能力爆棚',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12_5.png'
            },
            {
              title: '令人歆羡',
              url: 'https://game.flyh5.cn/resources/game/wechat/dxl/jkd/images/role/laber_male/boy_12_6.png'
            }
          ]
        }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.isLoad = true
      let $this = this;
      tool.loading("生成中", "loading")
      setTimeout(()=>{
        $this.setData({
          isLoad: true
        })
        tool.loading_h()
      },1000)
      let isTrue = wx.getStorage({
        key: 'isTrue'
      })
    var _this = this;
    if (wx.getStorageSync('channelId') != '') {
      console.log('获取太阳码')
      api.channelImg({
        channelId: wx.getStorageSync('channelId')
      }).then((res) => {
        console.log('获取太阳码');
        console.log(res);
        if (res.data.code == '0000') {
          _this.setData({ codeUrl: res.data.result });
          console.log('获取成功')
        }
      }).catch((err) => {

      });
    }

    this.setData({
      isTrue: wx.getStorageSync('isTrue')
    })
      $this.findResult()
      this.setData({ userInfo: wx.getStorageSync("userInfo") })
      this.setData({
        height: wx.getSystemInfoSync().windowHeight,
        width: wx.getSystemInfoSync().windowWidth
      })
  
  },
  measureText(text, fontSize = 10) {
    text = String(text);
    var text = text.split('');
    var width = 0;
    text.forEach(function (item) {
      if (/[a-zA-Z]/.test(item)) {
        width += 7;
      } else if (/[0-9]/.test(item)) {
        width += 5.5;
      } else if (/\./.test(item)) {
        width += 2.7;
      } else if (/-/.test(item)) {
        width += 3.25;
      } else if (/[\u4e00-\u9fa5]/.test(item)) { //中文匹配
        width += 10;
      } else if (/\(|\)/.test(item)) {
        width += 3.73;
      } else if (/\s/.test(item)) {
        width += 2.5;
      } else if (/%/.test(item)) {
        width += 8;
      } else {
        width += 10;
      }
    });
    return width * fontSize / 10;
  },
  getSharePoster() {
    var _this = this
    // tool.loading("海报生成中", "loading")
    var resultObj = _this.data.resultObj
    var width = 100,
        height = 30,
        imgX = 125,
        imgY = 65;
    if (_this.data.resultObj.topList[1].name == '完美主义晚期') {
      width = 130
      height = 25;
      imgY = 70
    }
    if (_this.data.resultObj.topList[1].name == '完美主义晚期' && _this.data.resultObj.figureName == '彭于晏') {
      width = 260
    }

    let num = '';
    let personList = '';
    _this.data.positionList.forEach((item, index) => {
      if (item.title == _this.data.resultObj.figureName) {
        personList = item.position
      }
    })
    var s = resultObj.scripts,
     reg = /.{17}/g,
      rs = s.match(reg);
    rs.push(s.substring(rs.join('').length));
    let nickName = this.data.userInfo == '' ? '你' : this.data.userInfo.nickName

    // this.data.canvasLoading = setTimeout(() => {
    //   if (!this.data.posterImgUrl) {
    //     tool.loading_h()
    //     tool.alert("海报生成失败，请稍后再试")
    //   }
    // }, 1000)
    if(_this.data.isTrue != ''){
      let _textList = [{
        string: nickName,
        color: '#373737',
        fontSize: 32,
        fontFamily: 'Arial',
        bold: false,
        textX: 30,
        textY: 22
      }];

      for (var i = 0; i < rs.length; i++) {
        let obj = {
          string: rs[i],
          color: '#373737',
          fontSize: '20',
          fontFamily: 'Arial',
          bold: false,
          textX: 50,
          textY: 773 + i * 25
        }
        _textList.push(obj)
      }
      Promise.all([
        util.getImgLocalPath(resultObj.pageUrl),
        util.getImgLocalPath(resultObj.nickUrl),
        util.getImgLocalPath(resultObj.topList[0].url),
        util.getImgLocalPath(resultObj.topList[1].url),
        util.getImgLocalPath(resultObj.labelList[1].url),
        util.getImgLocalPath(resultObj.labelList[2].url),
        util.getImgLocalPath(resultObj.labelList[3].url),
        util.getImgLocalPath(resultObj.labelList[4].url),
        util.getImgLocalPath(resultObj.labelList[5].url)]).then(res => {
          tool.canvasImg({
            canvasId: 'myCanvas',
            imgList: [
              { url: res[0], imgW: 574, imgH: 1026, imgX: 0, imgY: 0 },
              { url: res[1], imgW: 150, imgH: 25, imgX: _this.measureText(nickName, 32) + 35, imgY: 25, isRadius: false },
              { url: res[2], imgW: 90, imgH: 30, imgX: 30, imgY: 65, isRadius: false },
              { url: res[3], imgW: width, imgH: height, imgX: imgX, imgY: imgY, isRadius: false },
              // { url: res[4], imgW: 100, imgH: 40, imgX: personList[0].x, imgY: personList[0].y, isRadius: false },
              { url: res[4], imgW: 100, imgH: 45, imgX: personList[1].x, imgY: personList[1].y, isRadius: false },
              { url: res[5], imgW: 100, imgH: 45, imgX: personList[2].x, imgY: personList[2].y, isRadius: false },
              { url: res[6], imgW: 100, imgH: 45, imgX: personList[3].x, imgY: personList[3].y, isRadius: false },
              { url: res[7], imgW: 100, imgH: 45, imgX: personList[4].x, imgY: personList[4].y, isRadius: false },
              { url: res[8], imgW: 100, imgH: 45, imgX: personList[5].x, imgY: personList[5].y, isRadius: false }
            ],
            textList: _textList
          }, res => {
            tool.loading_h();
            _this.setData({
              isState: true,
              posterImgUrl: res,
              canvasHidden: true
            })

          })
        })
    }else {
      let _textList = [{
        string: nickName,
        color: '#373737',
        fontSize: 32,
        fontFamily: 'Arial',
        bold: false,
        textX: 30,
        textY: 22
      }, {
        string: '长按了解你的教练属性',
        color: '#373737',
        fontSize: 14,
        fontFamily: 'Arial',
        bold: false,
        textX: 390,
        textY: 900
      }];

      for (var i = 0; i < rs.length; i++) {
        let obj = {
          string: rs[i],
          color: '#373737',
          fontSize: '20',
          fontFamily: 'Arial',
          bold: false,
          textX: 50,
          textY: 773 + i * 25
        }
        _textList.push(obj)
      }
      Promise.all([
        util.getImgLocalPath(resultObj.figure),
        util.getImgLocalPath(resultObj.nickUrl),
        util.getImgLocalPath(resultObj.topList[0].url),
        util.getImgLocalPath(resultObj.topList[1].url),
        util.getImgLocalPath(resultObj.labelList[1].url),
        util.getImgLocalPath(resultObj.labelList[2].url),
        util.getImgLocalPath(resultObj.labelList[3].url),
        util.getImgLocalPath(resultObj.labelList[4].url),
        util.getImgLocalPath(resultObj.labelList[5].url),
        util.getImgLocalPath(_this.data.codeUrl)]).then(res => {
          tool.canvasImg({
            canvasId: 'myCanvas',
            imgList: [
              { url: res[0], imgW: 574, imgH: 1026, imgX: 0, imgY: 0 },
              { url: res[1], imgW: 150, imgH: 25, imgX: _this.measureText(nickName, 32) + 35, imgY: 25, isRadius: false },
              { url: res[2], imgW: 90, imgH: 30, imgX: 30, imgY: 65, isRadius: false },
              { url: res[3], imgW: width, imgH: height, imgX: imgX, imgY: imgY, isRadius: false },
              // { url: res[4], imgW: 100, imgH: 40, imgX: personList[0].x, imgY: personList[0].y, isRadius: false },
              { url: res[4], imgW: 100, imgH: 45, imgX: personList[1].x, imgY: personList[1].y, isRadius: false },
              { url: res[5], imgW: 100, imgH: 45, imgX: personList[2].x, imgY: personList[2].y, isRadius: false },
              { url: res[6], imgW: 100, imgH: 45, imgX: personList[3].x, imgY: personList[3].y, isRadius: false },
              { url: res[7], imgW: 100, imgH: 45, imgX: personList[4].x, imgY: personList[4].y, isRadius: false },
              { url: res[8], imgW: 100, imgH: 45, imgX: personList[5].x, imgY: personList[5].y, isRadius: false },
              { url: res[9], imgW: 100, imgH: 100, imgX: 425, imgY: 773, isRadius: false }
            ],
            textList: _textList
          }, res => {
            tool.loading_h();
            _this.setData({
              isState: true,
              posterImgUrl: res,
              canvasHidden: true
            })

          })
        })
    }
  },
  //保存到相册
  savePhoto() {
    tool.loading("海报保存中", "loading")
    this.isSettingScope()
  },
  closeIcon() {
    this.setData({
      getIcon: true,
      isState: false
    })
  },
  //判断是否授权访问手机相册
  isSettingScope() {
    let _self = this
    auth.isSettingScope("scope.writePhotosAlbum", res => {
      if (res.status == 0) {
        console.log('进上面')
        tool.loading_h()
        _self.showHideModal()
      } else if (res.status == 1 || res.status == 2) {
        console.log('进下面')
        _self.saveImageToPhotosAlbum(_self.data.posterImgUrl)
      }
    })
  },
  //将canvas生成的临时海报图片保存到手机相册
  saveImageToPhotosAlbum(imgUrl) {
    let _this = this;
    console.log(imgUrl)
    wx.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        setTimeout(() => {
          tool.alert("已保存到手机相册!")
          _this.setData({
            canvasHidden: false,
            isShare: true
          })
        }, 600)
      
      },
      fail() {
        tool.alert("保存失败")
      },
      complete() {
        tool.loading_h()
      }
    })
  },
  //点击自定义Modal弹框上的确定按钮
  operation(e) {
    if (e.detail.confirm) {
      auth.openSetting(res => {//用户自行从设置勾选授权后
        if (res.authSetting["scope.writePhotosAlbum"] && this.data.posterImgUrl) {
          this.saveImageToPhotosAlbum(this.data.posterImgUrl)
        }
      })
    }
    this.showHideModal()
  },
  //打开、关闭自定义Modal弹框
  showHideModal() {
    let _showModalOption = this.data.showModalOption
    _showModalOption.isShow = !_showModalOption.isShow
    // this.setData({ showModalOption: _showModalOption })
    this.setData({ showModalOption: false })
  },
  hideModal(){
    this.setData({ photoModal: false })
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
  saveLong(){
      let $this = this;
      // $this.setData({
      //   photoModal: true
      // })
      api.viewSave({
        token : wx.getStorageSync('token')
      })

    $this.savePhoto()
      
  },
  hideCanvasModal(){
    let $this = this;
    $this.setData({
      Modal: false
    })
  },
  findResult(){
    let $this = this;
    api.viewResults({
      token : wx.getStorageSync('token')
    }).then((res)=>{
      wx.setStorageSync('batchNo', res.data.result[0].batchNo)
      $this.setData({
        labelList : res.data.result
      })
      let resultObj = new Object();
      let labelList=  new Array();
      let positionList = new Array();
      let topList = new Array();
      let scriptList = new Array();
      res.data.result.forEach((item)=>{
        let obj = new Object();
        obj.name = item.optionLabel
        obj.url = ''
        labelList.push(obj);
      })
      $this.data.urlObj.forEach((urlItem,urlIndex) => {
        if (urlItem.title == res.data.result[0].figureName){

          urlItem.label.forEach((labelItem) => {
            labelList.forEach((item) => {
              if (labelItem.title == item.name) {
                item.url = labelItem.url
                
                // item.x = $this.data.positionList[urlIndex].x
                // item.y = $this.data.positionList[urlIndex].y

                // positionList[urlIndex].position.forEach((pItem) => {
                //   if (labelItem.title == pItem.name) {
                //     item.x = pItem.x
                //     item.y = $this.data.positionList[urlIndex].y
                //   }
                // })
              }
            })
            
          })
          resultObj.nickUrl = urlItem.nickUrl
          resultObj.bgUrl = urlItem.bgUrl
          resultObj.pageUrl = urlItem.pageUrl
        }
      })
      scriptList.push(res.data.result[2].optionDescription)
      scriptList.push(res.data.result[4].optionDescription)
      scriptList.push(res.data.result[5].optionDescription)
      let scripts = res.data.result[2].optionDescription +"。" + res.data.result[4].optionDescription + "。" + res.data.result[5].optionDescription + "。"
      let top1 = new Object(),
          top2 = new Object();
      top1.name = res.data.result[1].optionTitle
      top1.url = ''
      top2.name = res.data.result[3].optionTitle
      top2.url = ''
      topList.push(top1)
      topList.push(top2)
      resultObj.topList = topList
      resultObj.labelList = labelList
      resultObj.figureName = res.data.result[0].figureName
      resultObj.figure = res.data.result[0].figure 
      resultObj.scriptList = scriptList
      resultObj.scripts = scripts
      $this.data.urlObj.forEach((item,index)=>{
        if(item.title == resultObj.figureName){
          resultObj.color =  item.color;
          $this.setData({
            num : index + 1
          })
          resultObj.topList.forEach((topItem)=>{
              item.labelList.forEach((labelItem)=>{
                if (topItem.name == labelItem.title){
                  topItem.url = labelItem.url
                }                 
              })
          })
        }
      })
      $this.setData({
        resultObj: resultObj
      })
      $this.getSharePoster();
    }).catch((err)=>{
        
    })
  },
  again(){
    let $this = this;
    wx.setStorageSync('topicNum',0)
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  toGetPrize(){
    let $this = this;
    wx.navigateTo({
      url: '/pages/raffle/raffle'
    })
  }
})