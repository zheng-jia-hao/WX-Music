// pages/songDetail/songDetail.js
import request from "../../../utils/request"
// Error: module "pages/songDetail/pubsub-js.js" is not defined
// 所有使用npm下载的包都需要到  工具--> 构建npm 中构建一下小程序才能够使用
import PubSub from "pubsub-js"
import moment from "moment"

let appInstance = getApp();
//任何在app中定义的变量都是全局的变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:true, //标识音乐是否播放
    songInfo:{},
    musicId:"",
    currentTime:'00:00',
    durationTime:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      songInfo:{}
    })
    this.setData({
      musicId:options.ids
    })
    this.getSongInfo(options.ids);
     // 把他挂到this是为了解决音频播放时的小程序窗口和页面的状态不同
     this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.contRolPlay(this.data.isPlay,options.ids,true)
     this.backgroundAudioManager.onPlay(()=>{
       this.setData({
         isPlay:true
       })
     })
     this.backgroundAudioManager.onPause(()=>{
      this.setData({
        isPlay:false
      })
     })
     this.backgroundAudioManager.onStop(()=>{
      this.setData({
        isPlay:false,
        songInfo:{}
      })
     })
     this.backgroundAudioManager.onTimeUpdate(()=>{
       this.setData({
         currentTime:moment(this.backgroundAudioManager.currentTime *1000).format("mm:ss")
       })
     })
     //关于获取上/下一首歌的id只能在这里订阅，不然会绑定多次订阅
     PubSub.subscribe("id",(msg,data)=>{
      this.getSongInfo(data)
      this.setData({
        musicId:data
      })
      this.contRolPlay(this.data.isPlay,this.data.musicId,true);
    })
  },
  //根据id获取音乐详情
  async getSongInfo(ids) {
    await request("/song/detail",{ids}).then(res => {

      this.setData({
        songInfo:res.songs[0],
        durationTime:moment(res.songs[0].dt).format("mm:ss")
      })
      wx.setNavigationBarTitle({
        title: this.data.songInfo.name,
      })
    })
    
  },

    // 暂停/播放
    handleMusicPlay() {
      let isPlay = !this.data.isPlay;
      this.contRolPlay(isPlay,this.data.musicId,false);
    },
    async contRolPlay(isPlay,id,flag) {
      if(isPlay) {
        if(flag) {
          let musicData = await request("/song/url",{id})
          this.url = musicData.data[0].url
        }
        this.backgroundAudioManager.src = this.url;
        this.backgroundAudioManager.title = this.data.songInfo.name;
        // backgroundAudioManager.play();
      }else {
        this.backgroundAudioManager.pause();
      }
    },


  //  上/下 一首歌
  handleSwitch(event) {
    let type = event.currentTarget.id;
    // vue.$eimt
    PubSub.publish("preOrNxetID",type)
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