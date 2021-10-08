// pages/recommendSong/recommendSong.js
import request from "../../../utils/request";
import PubSub from "pubsub-js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:"",
    month:"",
    recommendList:[],
    currentIndex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //动态获取当前时间
    this.setData({
      // 小程序中 new Date().get(Date/Month/year)
      day:new Date().getDate(),
      month:new Date().getMonth()+1
    })
    this.getRecommendList();

    //当用户点击上一首歌或下一首歌时的监听
    PubSub.subscribe("preOrNxetID",(msg,data)=>{
      //通过data判断用户点击的是哪个
      let {recommendList,currentIndex} = this.data;
      if(data === "pre") {
        currentIndex === 0 ? currentIndex = recommendList.length -1 : currentIndex -= 1
      }else {
        currentIndex === recommendList.length -1 ? currentIndex = 0 : currentIndex += 1
      }
      let id = recommendList[currentIndex].id;
      PubSub.publish("id",id);
      //基本类型的浅拷贝并不会导致data中数据的改变，所以需要手动更新
      this.setData({
        currentIndex
      })
    })
  },
  // 动态获取推荐歌曲数组
  // /recommend/songs
  async getRecommendList() {
    // 当前请求需要携带cookie
    await request("/recommend/songs").then(res => {
      this.setData({
        recommendList:res.recommend
      })
    })
  }, 
  handleTap(event) {
    let ids = event.currentTarget.dataset.ids;
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentIndex:index
    })
    ids && wx.navigateTo({
    // 路由传参 query,  页面通过 onLoad生命周期函数的options拿参数 
      url: "/subpackages-SongPackage/pages/songDetail/songDetail?ids=" + ids,
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