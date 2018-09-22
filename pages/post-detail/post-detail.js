// pages/post-detail/post-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCollected: null,
    postDetail: null,
  },
  getData: function(postId) {
    let baseUrl = `https://cnodejs.org/api/v1/topic/${postId}`
    let _this = this
    wx.request({
      url: baseUrl,
      success: function(res) {
        _this.setData({
          postDetail: res.data.data,
        })
        let postsCollected = wx.getStorageSync('collection')
        if (!!postsCollected) {
          let postCollected = postsCollected[postId]
          _this.setData({
            isCollected: postCollected,
            postId: postId
          })
        } else {
          let postsCollected = {};
          postsCollected[postId] = false;
          let postCollected = postsCollected[postId];
          _this.setData({
            isCollected: postCollected,
            postId: postId
          })
          wx.setStorageSync('collection', postsCollected);
        }

      }
    })
  },
  onTapCollect: function(e) {
    let postsCollected = wx.getStorageSync('collection');
    let postCollected = postsCollected[this.data.postId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    wx.setStorageSync('collection', postsCollected);
    this.setData({
      isCollected: postCollected,
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})