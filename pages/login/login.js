// pages/login/login.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:13528023223,
    password:602596259,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //表单验证
  verification(event) {
    let flag = event.currentTarget.id;
    this.setData({
      [flag]:event.detail.value
    })
  },
  //登录
  async login() {
    let {phone,password} = this.data;
    if(!phone) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号码错误',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if(!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    let res = await request("/login/cellphone",{phone,password,isLogin:true});
    if(res.code === 200) {
      wx.setStorageSync('userInfo', res.profile)
      wx.reLaunch({
        url:"/pages/personal/personal"
      })

      //设置cookies



    }else {
      wx.showToast({
        title: '登录失败',
        icon: 'error',
        duration: 2000
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})