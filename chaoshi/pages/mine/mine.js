// pages/mine/mine.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  index:function(){
   wx.navigateTo({
     url: '/pages/index/index',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  shop: function () {
    wx.navigateTo({
      url: '/pages/shop/shop',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  recharge: function () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  record: function () {
    wx.navigateTo({
      url: '/pages/record/record',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  order: function () {
    wx.navigateTo({
      url: '/pages/order/order',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  address: function () {
    wx.navigateTo({
      url: '/pages/add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      api: api.url
    })
   var user= wx.getStorageSync('user')

    console.log(user)
    this.setData({
      name: user.infoNickname,
      icon: user.infoIcon,
      balance: user.balance
    })


 
    var userId = wx.getStorageSync('user').loginId
 
    api._get('/user/selectUserInfo?userId='+userId).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
          user: res.data

        })
        this.setData({
          name: res.data.infoNickname,
          icon: res.data.infoIcon,
          balance: res.data.balance
        })
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
  this.onLoad()
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