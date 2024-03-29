// pages/record/record.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 1

    api._get('conversionCardLog/selectForRecord?page=1&userId='+userId).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
          list: res.data.forRecordList

        })
      }



    }).catch(e => {
      console.log(e)
    })
  },
  

  onfrash: function (pageNo) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0



  
    api._get('conversionCardLog/selectForRecord?page=' + pageNo+'&userId=' + userId).then(res => {
          console.log(res)
          if (res.isSuc == true) {
            this.setData({
              page: pageNo, //当前的页号
              list: this.data.list.concat(res.data.forRecordList)
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
    this.onfrash(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})