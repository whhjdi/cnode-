// pages/topics/topics.js
let navList = [
  { id: "all", title: "全部" },
  { id: "good", title: "精华" },
  { id: "share", title: "分享" },
  { id: "ask", title: "问答" },
  { id: "job", title: "招聘" }
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 20,
    tab: 'all',
    postList: [],
    navList,
    activeIndex: 0,
  },
  onPostTap:function(e){
    var postId = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?id=' + postId,
    })
  },
  onTapItem:function(e){
    let index = e.currentTarget.dataset.index;
    let tab = e.currentTarget.id
    this.setData({
      activeIndex: index,
      tab:tab,
      page:1
    })
    if (tab !== 'all') {
      this.getData({ tab: tab });
    } else {
      this.getData();
    }
  },
  onTapPost:function(){

  },
  // 滑动到底部事件
  lower: function(e) {
    console.log(1)
    this.setData({
      page: this.data.page + 1
    })
    this.getData({
      page: this.data.page,
      tab: this.data.tab
    })
  },
  category:function(item){
    return 1
  },
  // 数据请求函数
  getData: function() {
    let tab = this.data.tab
    let page = this.data.page
    let limit = this.data.limit
    let baseUrl = `https://cnodejs.org/api/v1/topics`
    let _this = this
    wx.request({
      url: baseUrl,
      data: {
        tab: tab,
        page: page,
        limit: limit,
      },
      success: function(res) {
        _this.setData({
          postList: res.data.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.getData()
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