// pages/shopDetail/shopDetail.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false
  },
  car:function(){
    var that = this
    that.setData({
      api: api.url
    
    })
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId == "") {
      this.setData({
        login: true
      })
    } else {
    api._post('/shopCarts/insertShopCarts', {
      creatorId:userId,
      goodsId: this.data.id,
      goodsSpecid:0 ,
      cartNum:1
    }).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.navigateTo({
          url: '/pages/shopCar/shopCar',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
     
      }



    }).catch(e => {
      console.log(e)
    })
    }

  },
 buy:function(){
   var userId = wx.getStorageSync('user').loginId || ""
   if (userId == "") {
     this.setData({
       login: true
     })
   } else {
  wx.navigateTo({
    url: '/pages/select1/select1?price='+this.data.price+"&id="+this.data.id+'&num='+this.data.num,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
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
      var id=options.id

    var that = this
    that.setData({
      api: api.url,
      id:id
    })
    var userId = wx.getStorageSync('user').loginId || 1

    api._post('shopGoods/queryShopGoodsInfo',{
      goodsId:id
    }).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        if (res.data.imageUrl==null){
          that.setData({
            price2: res.data.goodsPrice,
            id: res.data.id,
            num: 1,
            img: "",
            pro: res.data.goodsName,
            dis: res.data.productDesc,
            image: []

          })
          const app = getApp();

          app.globalData.price1 = res.data.goodsPrice
          app.globalData.id2 = that.data.id
          console.log(that.data.price)
          app.globalData.num = 1
        }else{
          console.log(res.data.goodsPrice)
          that.setData({
            price2: res.data.goodsPrice,
            id: res.data.id,
            num: 1,
            img: res.data.imageThumb,
            pro: res.data.goodsName,
            dis: res.data.productDesc,
            image: res.data.imageUrl.split(",")

          })

          const app = getApp();

          app.globalData.price1 = res.data.goodsPrice
          app.globalData.id2 = that.data.id
  
          app.globalData.num = 1
        }
       
      }



    }).catch(e => {
      console.log(e)
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

  }
})