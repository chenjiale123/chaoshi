// pages/detail/detail.js
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leng1:[
      {id:1, specName:"50 元 \n 提货券"},
      { id: 2,specName: "100 元 \n 提货券" },
      { id: 3, specName: "200 元 \n 提货券" },
      { id: 4, specName: "300 元 \n 提货券" },
      { id: 5, specName: "500 元 \n 提货券" },
      { id: 6,specName: "1000 元 \n 提货券" }
    ]
  },
  address:function(){
    wx.navigateTo({
      url: '/pages/select/select?price='+this.data.price.split(" ")[0]+"&id="+this.data.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  clicktap(e) {

    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      price: e.currentTarget.dataset.price
    })
    for (let i = 0; i < this.data.leng1.length; i++) {
      if (this.data.leng1[i].id == id) {
        //当前点击的位置为true即选中
        this.data.leng1[i].checked = true;
      }
      else {
        //其他的位置为false
        this.data.leng1[i].checked = false;
      }
    }
    this.setData({
      leng1: this.data.leng1,
      msg: "id:" + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id
    var icon = options.icon
    var name = options.name
    console.log(name)
    this.setData({
      api:api.url,
      id:id,
      icon:icon,
      name:name
    })
    this.data.leng1[0].checked = true;
    this.setData({
      leng1: this.data.leng1,
      price: this.data.leng1[0].specName
    })
   

  },
  change:function(){

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