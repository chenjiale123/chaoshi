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
    ],
    login:false
  },
  address:function(){
    var userId = wx.getStorageSync('user').loginId || ""
    if (userId==""){
      this.setData({
        login:true
      })
    }else{
      wx.navigateTo({
        url: '/pages/select/select',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
  clicktap(e) {

    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      price: e.currentTarget.dataset.price,
      id2: e.currentTarget.dataset.id
    })
    for (let i = 0; i < this.data.list1.length; i++) {
      if (this.data.list1[i].id == id) {
        //当前点击的位置为true即选中
        this.data.list1[i].checked = true;
      }
      else {
        //其他的位置为false
        this.data.list1[i].checked = false;
      }
    }
    this.setData({
      list1: this.data.list1,
      msg: "id:" + id,
    })
    const app = getApp();

    app.globalData.id1 = this.data.id2
    console.log(this.data.id2)
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
    var icon = options.icon
    var name = options.name
    console.log(name)
    this.setData({
      api: api.url,
      id: id,
      icon1: icon,
      name1: name
    })

    api._get('/cardFace/selectCardFaceValueInfo?cardId=' + id).then(res => {
      console.log(res)
      if (res.isSuc == true) {
        console.log(res.data.cardFaceValuesList)
        res.data.cardFaceValuesList[0].checked=true
        this.setData({
          list1: res.data.cardFaceValuesList,
          price: res.data.cardFaceValuesList[0].face,
          id2: res.data.cardFaceValuesList[0].id
        
        })
         
        const app = getApp();

        app.globalData.price = this.data.price
        app.globalData.id1 = this.data.id2

        console.log(this.data.price, this.data.id2)

      }



    }).catch(e => {
      console.log(e)
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