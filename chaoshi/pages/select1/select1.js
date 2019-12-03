// pages/add/add.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  add: function () {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  del: function (e) {
    var that = this
    that.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 1

    api._post('/address/delAddress?id=' + e.currentTarget.dataset.id).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        that.shuju()
   
      }



    }).catch(e => {
      console.log(e)
    })
  },

  edit: function (e) {
    var that = this
    console.log(e)

    console.log(e.currentTarget.dataset.id)
    var li = e.currentTarget.dataset.id
    console.log(that.data.list[li])
    wx.navigateTo({
      url: '/pages/addressEdit/addressEdit?name=' + that.data.list[li].consigneeName + '&phone=' + that.data.list[li].consigneePhone + '&path=' + that.data.list[li].areaIdPath + '&detail=' + that.data.list[li].adsress + '&moren=' + that.data.list[li].isDefault + '&id=' + that.data.list[li].id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  radio: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      index1: e.currentTarget.dataset.id
    })
  },
  radioChange(e) {
    console.log(e.detail.value)
    var that = this

    that.setData({
      list1: that.data.list[e.detail.value]

    })
    console.log(this.data.list1)
  },
  xuan: function () {
    this.setData({
      api: api.url
    })
    var userId = wx.getStorageSync('user').loginId || 1

    var xinxi = {

      userId: userId,
      goodsId: this.data.id,
      orderMoney: this.data.price1,
      goodsNum: this.data.num,
      consigneeName: this.data.list1.consigneeName,
      consigneePhone: this.data.list1.consigneePhone,
      consigneeAddress: this.data.list1.areaIdPath + this.data.list1.adsress
    }
    api._post('/shopOrder/payShopOrder', xinxi).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        wx.navigateTo({
          url: '/pages/order/order',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }

    }).catch(e => {
      console.log(e)
    })

  },
  shuju: function () {
    var that = this
    that.setData({
      api: api.url

    })
    var userId = wx.getStorageSync('user').loginId || 1

    api._get('/address/queryAddress?page=1&userId=' + userId).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        res.data[0].checked = "true"

        that.setData({
          list: res.data

        })
        that.setData({
          list1: that.data.list[0]

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
    var that = this





      this.setData({
  
        id: options.id,
        price1: options.price,
        num: options.num
      })

   this.shuju()


 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

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