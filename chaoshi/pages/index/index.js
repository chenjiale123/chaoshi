//index.js
//获取应用实例
const api = require('../../utils/api.js')

const app = getApp()

Page({
  data: {
    login: true,
    login1: false
  },
  mine: function() {
    wx.navigateTo({
      url: '/pages/mine/mine',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  shop:function(){
   wx.navigateTo({
     url: '/pages/shop/shop',
   })
  },
  detail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id + '&icon=' + e.currentTarget.dataset.icon + '&name=' + e.currentTarget.dataset.name
    })
  },
  //事件处理函数
  // getUserInfo(res) {
  //   var that = this
  //   let info = res;

  //   if (info.detail.userInfo) {

  //     console.log("点击了同意授权");
  //     wx.login({
  //       success: function(res) {
  //         console.log(res.code)
  //         if (res.code) {
  //           that.setData({
  //             login: false,
  //             login1: false,
  //             name: info.detail.userInfo.nickName,
  //             icon: info.detail.userInfo.avatarUrl,
  //             encry: info.detail.encryptedData,
  //             iv: info.detail.iv
  //           })

  //           console.log(res.code)
  //           wx.request({

         
  //             url: api.baseUrl + '/userAuthorization/appletLogin',
  //             data: {
             
      
  //               jsCode: res.code,
      
  //             },
  //             method: 'GET',
  //             success: function(res) {

  //               var res = res.data

  //               that.setData({
  //                 openid: res.openid,
  //                 key1: res.session_key
  //               })
  //               wx.request({
  //                 url: api.baseUrl + 'userAuthorization/appletLogin',
  //                 data: {
  //                   identifier: that.data.openid,
  //                   nickName: that.data.name,
  //                   infoIcon: that.data.icon,
  //                   encrypted: that.data.encry,
  //                   sessionKey: that.data.key1,
  //                   iv: that.data.iv
  //                 },
  //                 method: 'POST',
  //                 header: {
  //                   'content-type': 'application/x-www-form-urlencoded'
  //                 },
  //                 success: function(res) {
  //                   console.log(res)
        

  //                   wx.setStorageSync('user', res.data.data)
  //                 },
  //                 fail: function(res) {
  //                   console.log(res)

  //                 }
  //               })

  //             }
  //           })




  //         } else {
  //           console.log("授权失败");
  //         }
  //       },
  //     })

  //   } else {
  //     console.log("点击了拒绝授权");
  //   }
  // },

  onLoad: function() {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId 
    if (userId){
      this.setData({
        login:false
      })
    }
    api._get('supermarketCard/selectSupermarketCardInfo?page=1').then(res => {
      console.log(res)
   

      if (res.isSuc == true) {
        that.setData({
          list: res.data.supermarketCardList

        })
      }



    }).catch(e => {
      console.log(e)
    })

  },
  onShow:function(){
    this.onLoad()
  }

})