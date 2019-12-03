// pages/shopDetail/shopDetail.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 buy:function(){
  wx.navigateTo({
    url: '/pages/select1/select1?price='+this.data.price+"&id="+this.data.id+'&num='+this.data.num,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
     
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
            price: res.data.goodsPrice,
            id: res.data.id,
            num: 1,
            img: "",
            pro: res.data.goodsName,
            dis: res.data.productDesc,
            image: []

          })
        }else{
          that.setData({
            price: res.data.goodsPrice,
            id: res.data.id,
            num: 1,
            img: res.data.imageUrl.split(",")[res.data.imageUrl.split(",").length-1],
            pro: res.data.goodsName,
            dis: res.data.productDesc,
            image: res.data.imageUrl.split(",")

          })
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