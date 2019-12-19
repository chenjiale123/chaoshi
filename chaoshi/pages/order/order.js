// pages/order/order.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onfrash: function (pageNo) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0



    var data1 = {
      userId: userId,
      type: 1,
      page: pageNo
    }
    var data2 = {
      userId: userId,
      type: 2,
      page: pageNo
    }
    var data3 = {
      userId: userId,
      type: 3,
      page: pageNo
    }
    api._post('/shopOrder/querySupermarketOrder', data1).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
          page: pageNo,
          list: that.data.list.concat(res.data.shopOrders) 

        })
      }



    }).catch(e => {
      console.log(e)
    })

    api._post('/shopOrder/querySupermarketOrder', data1).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
          page: pageNo,
          list1: that.data.list1.concat(res.data.shopOrders)

        })
        console.log(that.data.page)

      }



    }).catch(e => {
      console.log(e)
    })

    api._post('/shopOrder/querySupermarketOrder', data1).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
          page: pageNo,
          list2: that.data.list2.concat(res.data.shopOrders)

        })
      }



    }).catch(e => {
      console.log(e)
    })




  },
  onLoad: function (options) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 1
   var data1={
     userId: userId,
     type:1,
     page:1
   }
    var data2 = {
      userId: userId,
      type: 2,
      page: 1
    }
    var data3 = {
      userId: userId,
      type: 3,
      page: 1
    }
    api._post('/shopOrder/querySupermarketOrder',data1).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
     
          list: res.data.shopOrders

        })
      }



    }).catch(e => {
      console.log(e)
    })

    api._post('/shopOrder/querySupermarketOrder', data2).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
    
          list1: res.data.shopOrders

        })
      }



    }).catch(e => {
      console.log(e)
    })
    api._post('/shopOrder/querySupermarketOrder', data3).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.setData({
      
          list2: res.data.shopOrders

        })
      }



    }).catch(e => {
      console.log(e)
    })
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    console.log(e.target)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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