// pages/components/beauty/beauty.js
var util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideWidth: 200,
    beautys: [
      {
        level: '0',
        name: '美少女1',
        leftHide: 'left: 0rpx',
        color: util.getRandColor(5)
      },
      {
        level: '1',
        name: '美少女2',
        leftHide: 'left: 0rpx',
        color: util.getRandColor(5)
      },
      {
        level: '2',
        name: '美少女3',
        leftHide: 'left: 0rpx',
        color: util.getRandColor(5)
      },
      {
        level: '3',
        name: '美少女4',
        state: false,
        leftHide: 'left: 0rpx',
        color: util.getRandColor(5)
      }
    ],
    idx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'beautys',
      success: function (res) {
        if (res.data) {
          that.setData({
            beautys: res.data
          })
        }
        // 设置页面滚动
        if (res.data.length > 8) {
          that.setData({
            scrollFlag: true
          })
        } else {
          that.setData({
            scrollFlag: false
          })
        }
      }
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
    this.setData({
      loading: false
    })
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

  },
  backHome: function () {
    wx.switchTab({
      url: '../../setting/setting'
    })
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var hideWidth = this.data.hideWidth;
      var leftStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        leftStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        leftStyle = "left:-" + hideWidth + "rpx";
      }
      var index = e.target.dataset.index;
      var beautys = this.data.beautys;
      beautys[index].leftHide = leftStyle;
      if (disX >= hideWidth) {
        beauty[index].display = 'display: none'
      }
      this.setData({
        beautys: beautys
      })
    }
  },
  touchE: function (e) {
    var index = e.target.dataset.index;
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var hideWidth = this.data.hideWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var leftStyle = disX > hideWidth / 4 ? "left:-" + hideWidth + "rpx" : "left:0rpx";
    }
    var beautys = this.data.beautys;
    beautys[index].leftHide = leftStyle;
    beautys[index].display = "display: none"
    this.setData({
      beautys: beautys
    })
    var that = this;
    setTimeout(function () {
      var index = e.target.dataset.index;
      var beautys = that.data.beautys;
      beautys[index].leftHide = 'left: 0';
      beautys[index].display = "display: block"
      that.setData({
        beautys: beautys
      })
    }, 4000)
  },
  outLoading: function () {
    this.setData({
      loading: false
    })
  },
  chooseBeauty: function (e) {
    let index = e.currentTarget.dataset.index;
    // console.log('每个index',index)
    this.setData({
      idx: index
    });
  }
})