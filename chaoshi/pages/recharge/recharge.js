// pages/recharge/recharge.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pay:function(e){
   this.setData({
     pay1:e.detail.value
   })
  },
  charge:function(){
    this.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 1

    var xinxi = {

      userId: userId,
      conversionId:this.data.pay1
    }
    api._post('/conversion/addConversion', xinxi).then(res => {
      console.log(res)
      if (res.isSuc == true) {
         wx.showToast({
           title: res.msg,
           icon:'none'
         })
 
      // var user = wx.getStorageSync('user');
      // user.balance = res.data;
      // wx.setStorageSync('user', user)
      wx.switchTab({
      
        url: '/pages/mine/mine',
     
      })
           }

    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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