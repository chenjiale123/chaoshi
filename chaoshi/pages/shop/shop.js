// pages/shop/shop.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
  },
 index:function(){
   wx.navigateTo({
     url: '/pages/index/index',
   })
 },
  mine: function () {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  detail:function(e){
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?id='+e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onfrash: function (pageNo) {
    var that = this
    var userId = wx.getStorageSync('user').loginId || 0

    api._get('appVersion/selectAppVersionByContent').then(res => {

      if (res.data.version == 10) {

        api._get('shopGoods/queryShopGoods?page=' + pageNo + '&userId=' + userId + "&type=2").then(res => {
          console.log(res)
          if (res.isSuc == true) {
            this.setData({
              page: pageNo, //当前的页号
              list: this.data.list.concat(res.data.shopGoods)
            })
          }
        }).catch(e => {
          console.log(e)
        })
      } else {

        api._post('shopGoods/queryShopGoods?page=' + pageNo+'&userId=' + userId + "&type=1").then(res => {
          console.log(res)

          this.setData({
            page: pageNo, //当前的页号
            list: this.data.list.concat(res.data.shopGoods)
          })

        }).catch(e => {
          console.log(e)
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
    that.setData({
      api: api.url
    })
    this.onfrash(1)
    var userId = wx.getStorageSync('user').loginId ||''



    api._get('/appVersion/selectAppVersionByContent').then(res => {

      if (res.data.version ==10 ) {

        api._get('shopGoods/queryShopGoods?page=1&userId=' + userId+"&type=2").then(res => {
          console.log(res)
          if (res.isSuc == true) {
            that.setData({
              list: res.data.shopGoods

            })
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        api._get('shopGoods/queryShopGoods?page=1&userId=' + userId + "&type=1").then(res => {
          console.log(res)
          if (res.isSuc == true) {
            that.setData({
              list: res.data.shopGoods

            })
          }
        }).catch(e => {
          console.log(e)
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
    this.onfrash(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})