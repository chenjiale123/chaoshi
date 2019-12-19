// pages/mine/mine.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false
  },
  index:function(){
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
   wx.navigateTo({
     url: '/pages/index/index',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
    }
  },
  shop: function () {
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/shop/shop',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  gouwu: function () {
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/shopCar/shopCar',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  recharge: function () {
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  record: function () {
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/record/record',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  order: function () {
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/order/order',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  login2:function(){
     this.setData({
       login:true
     })
  },
  address: function () {
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    wx.navigateTo({
      url: '/pages/add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    }
  },
  getUserInfo(res) {
    var that = this
    let info = res;

    if (info.detail.userInfo) {

      console.log("点击了同意授权");
      wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            that.setData({
              login: false,
              login1: false,
              name: info.detail.userInfo.nickName,
              icon: info.detail.userInfo.avatarUrl,
              encry: info.detail.encryptedData,
              iv: info.detail.iv
            })


            wx.request({


              url: api.baseUrl + '/userAuthorization/appletLogin',
              data: {


                jsCode: res.code,

              },
              method: 'GET',
              success: function (res) {

                console.log(res.data)
                console.log(res.data)
                var res = res.data

                that.setData({
                  openid: res.openid,
                  key1: res.session_key
                })
                wx.request({
                  url: api.baseUrl + 'userAuthorization/appletLogin',
                  data: {
                    identifier: that.data.openid,
                    nickName: that.data.name,
                    infoIcon: that.data.icon,
                    encrypted: that.data.encry,
                    sessionKey: that.data.key1,
                    iv: that.data.iv
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res)
                    wx.setStorageSync('user', res.data.data)
              
                    that.onLoad()
                  },
                  fail: function (res) {
                    console.log(res)

                  }
                })

              }
            })




          } else {
            console.log("授权失败");
          }
        },
      })

    } else {
      console.log("点击了拒绝授权");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('222')
    var that=this
    this.setData({
      api: api.url
    })
  
    var userId = wx.getStorageSync('user').loginId
    console.log(userId)
  
    // if (userId){
   
      api._get('/user/selectUserInfo?userId=' + userId).then(res => {
        console.log(res)
        if (res.isSuc == true) {
       
          this.setData({
            name: res.data.infoNickname,
            icon: res.data.infoIcon,
            balance: res.data.balance,
            name1: true
          })
        }



      }).catch(e => {
        console.log(e)
      })
    // }
    // var user = wx.getStorageSync('user')
    // this.setData({
    //   name: user.infoNickname,
    //   icon: user.infoIcon,
    //   balance: user.balance
    // })


 

 

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
  this.onLoad()
  this.setData({
    login:false
  })
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
    this.onLoad()

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

  }
})