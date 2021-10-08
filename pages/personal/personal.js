// pages/personal/personal.js
import request from "../../utils/request"
//定义移动的距离变量
let startY = 0;
let moveY = 0;
let move = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translateY:"",
    transition:"",
    userInfo:{},
    recordList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
  // /user/record
    if(userInfo){

      this.setData({
        userInfo:userInfo
      })  
      this.getRecordList(this.data.userInfo.userId);
    }
  },

  async getRecordList(uid) {
    let res = await request("/user/record",{uid,type:1});
    
    if(res.code === 200) {
      this.setData({
        recordList:res.weekData
      })
    }
  },
  // 注意！！！js中的所有函数都不能使用箭头函数，不然无法找到this
  // 手指按下时触发
  handleTouchStart(event) {
    // 小程序中也是有事件对象的存在的  
    //touches 是个数组，因为可能有多个手指
    this.setData({
      transition:""
    })
    startY = event.touches[0].clientY;
  },
  // 手指移动时触发
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    move = moveY - startY;
    //限定不能往上拉
    if(move < 0) {
      return;
    };
    // 限定往下拉不能大于80rpx
    if(move >= 80) {
      this.setData({
        translateY : 80
      })
      return;
    }

    this.setData({
      translateY : move
    })
  },
  // 手指离开时触发
  handleTouchEnd(){
   this.setData({
      translateY : 0,
      transition:"transform .3s linear"
  })

  },

  goLogin() {
    if(!this.data.userInfo.nickname) {
      // wx.navigateTo({  //这里不能使用navigateTo去跳转，因为会保留当前的页面，导致数据无法更新
      wx.reLaunch({
        url:"/pages/login/login"
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