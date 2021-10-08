import serverConfig from "./serverConfig"
export default (reqUrl,data={},method="GET") => {
   return new Promise((resolve,reject) => {
    wx.request({
      method,
      url: serverConfig.host + reqUrl,
      data,
      header:{
        // 这里为什么使用toString方法？
        // 因为 header中会自动将内容进行 Object.toString ,而Object.toString之后是以 [object Array]的方式转换成字符串，
        // 如果不是对象并不会转换内容，会转换成 [object Array] 所以进行手动的toString
        cookie:wx.getStorageSync('cookie')? wx.getStorageSync('cookie').toString () : ''
      },
      success: (res) => {
        if(res.data.code === 200) {
          if(data.isLogin && !wx.getStorageSync('cookie')) {
            // this.header = res.cookies 没办法直接存储在header中 所以存在storage中
            let cookie = res.cookies.find(item => item.indexOf("MUSIC_U") !== -1);
            wx.setStorageSync('cookie', cookie);
          }
          resolve(res.data)
        }else {
          console.log("err");
          reject(res);
        }
      },
      fail: (err) => {
        if(reqUrl === "/video/group") {
          wx.showToast({
            title: '请先登录',
            icon:"error",
            duration:2000
          })
        }
        reject(err);
      }
    })
   })
}