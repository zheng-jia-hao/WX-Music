import request from "../../utils/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommendList:[],
    topList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 小程序只会发https请求,并且要求拥有服务器,所以如果是有真实的接口,需要到微信小程序中去写入接口地址
    // 如果不是真实的接口需要在  详情->本地设置 ->不校验不合法域名
    // 函数内的this是指向当前实例对象的,所有的方法调用都需要使用this
    this.getInitData();
  },
  //封装初始化数据函数
  async getInitData() {
    //轮播
    let result = await request("/banner",{type:2});
    this.setData({
      banners:result.banners
    });

    //推荐
    result = await request("/personalized");
    console.log(result);
    this.setData({
      recommendList:result.result
    });
    // /top/list
    // 排行榜

  /*  这种方法并不友善，数据太晚到达，页面渲染较慢
    let result1 = request("/top/list",{idx:0});
    let result2 = request("/top/list",{idx:1});
    let result3 = request("/top/list",{idx:2});
    let result4 = request("/top/list",{idx:3});
    let result5 = request("/top/list",{idx:4});
    
    Promise.all([result1,result2,result3,result4,result5]).then((res)=> {
      let resultArr = res.reduce((pre,item) => {
        pre.push({name:item.playlist.name,tracks:item.playlist.tracks.slice(0,3)});
        return pre
      },[])
      this.setData({
        topList:resultArr
      })
    })
      */

    // 虽然下面的方法也并不友善并且多次渲染页面，但是不会让用户等待
    let topList = [];
    let index = 0;
    while(index<5) {
      result = await request("/top/list",{idx:index++});
      topList.push({name:result.playlist.name,tracks:result.playlist.tracks.slice(0,3)})
      this.setData({
        topList:topList
      });
    }
    
      
      

  },
  gotoRecommend() {
    wx.navigateTo({
      url: '/subpackages-SongPackage/pages/recommendSong/recommendSong',
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