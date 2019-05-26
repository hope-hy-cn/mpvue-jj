<template>
  <scroll-view scroll-y lower-threshold @scrolltolower="scrolltolower" class="orders">
    <div class="headBlock flexColCenterRowCenter" v-if="todayInfo">
      <div class="title">今日已订特膳</div>
      <div class="endDate">结束日期：{{todayInfo.endDate}}</div>
      <div class="btn" @click="goToOrder">预定特膳</div>
    </div>
    <div class="headBlock2 flexColCenterRowCenter" v-else>
      <img class="icon" src="https://image1.postop.cn/SmallProgram/yingyangshi/201904/no_order.png"/>
      <div class="text">今日未预订特膳</div>
      <div class="btn2" @click="goToOrder">预定特膳</div>
    </div>
    <div class="orderList" v-if="list.length > 0">
      <div class="orderCell" v-for="(item,n) in list" :key="n" @click="goToDetail(item.id)">
        <div class="orderTitle flexRowStartColCenter">
          <div class="icon_meal flexItem000"></div>
          <div class="hospitalName flexItem110">{{item.hospitalName}}特膳</div>
          <div class="moreText flexItem000">查看详情</div>
          <div class="icon_more flexItem000"></div>
        </div>
        <div class="orderInfo flexRowStartColCenter">
          <div class="orderImage flexItem000"><img :src="item.orderImage"></div>
          <div class="orderDuration flexItem110">
            <div class="startDate">开始时间：{{item.beginDate}}</div>
            <div class="endDate">结束时间：{{item.endDate}}</div>
          </div>
        </div>
        <div class="orderAmount flexRowEndColCenter">
          <div class="orderCount">共{{item.count}}餐</div>
          <div class="orderPrice">总价：￥{{item.price}}</div>
        </div>
      </div>
    </div>
    <div v-else class="emptyBlock flexColCenterRowCenter" v-else>
      <img src="../../../static/images/ic_intake_empty.png">
      <div class="tips">您还没有预定特膳</div>
      <div class="btn2" @click="goToOrder">预定特膳</div>
    </div>
  </scroll-view>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: "orders",
    data() {
      return {
        list: [],
        ajaxData: {
          pageSize: 10,
          pageNum: 1,
          id: ""
        },
        totalCount: 0,
        todayInfo:null,
        todayIsOrdered:false
      }
    },
    components: {},

    onLoad() {
      this.mallLogin({
        data:{
          // unionid: this.userInfo.unionId,
          // nickname: this.userInfo.nickName
        }
      }).then(res => {

      })
      this.mallLogin({
        data:{
          // unionid: this.userInfo.unionId,
          // nickname: this.userInfo.nickName
        }
      }).then(res => {
        this.getList()
      }, err => {
        wx.showToast({
          title: '商城登录失败',
          icon: "none",
          duration: 2000
        })
      })
    },
    methods: {
      ...mapActions({
        getOrderList: 'mall/getOrderList',
        mallLogin:'mall/mallLogin'
      }),
      getList() {
        this.getOrderList({data: this.ajaxData}).then(res=> {
          console.log(res)
          this.list = this.list.concat(res.data.list)
          this.totalCount = res.data.totalCount
          if(this.todayIsOrdered == false) this.getTodayInfo()
          if(this.todayIsOrdered){
            wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#498A79'
            })
          }else{
            wx.setNavigationBarColor({
              frontColor: '#000000',
              backgroundColor: '#f6f6f6'
            })
          }
        })
      },
      scrolltolower() {
        if(this.ajaxData.pageNum * this.ajaxData.pageSize >= this.totalCount) return
        this.ajaxData.pageNum ++
        this.getList()
      },
      getTodayInfo(){
        var nowDate = new Date()
        //此处需注意 2019-4-26 和 2019-04-26 的时间戳不一样，需要统一格式进行计算比较
        var nowDateStr = nowDate.getFullYear() + "-" + (nowDate.getMonth()+1 > 9 ? nowDate.getMonth()+1 : '0'+(nowDate.getMonth()+1)) + "-" + nowDate.getDate()
        var now = Date.parse(new Date(nowDateStr))
        for(var item of this.list){
          var begin = Date.parse(new Date(item.beginDate))
          var end = Date.parse(new Date(item.endDate))
          if(begin <= now && now <= end){
            this.todayIsOrdered = true
            this.todayInfo = item
          }
        }
      },
      goToDetail(id){
        wx.navigateTo({
          url: '../orderDetail/main?id='+id
        })
      },
      goToOrder(){
        wx.navigateTo({
          url: '../products/main'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .orders {
    position: fixed;
    width: 100%;
    height: 100%;
    .headBlock {
      width: 100%;
      height: 410rpx-108rpx;
      background: #498A79;
      .title {
        font-size: 60rpx;
        color: white;
      }
      .endDate {
        font-size: 24rpx;
        color: white;
        margin-top: 16rpx;
      }
      .btn {
        font-size: 28rpx;
        color: white;
        padding: 10rpx 36rpx;
        border-radius: 60rpx;
        margin-top: 34rpx;
        background-color: rgba(255, 255, 255, 0.4);
        opacity: 0.5;
        &:active{
          opacity: 1;
        }
      }
    }
    .headBlock2{
      width: 100%;
      height: 410rpx-108rpx;
      background: #f6f6f6;
      .icon{
        width:238rpx;
        height:148rpx;
        margin-bottom: 18rpx;
      }
      .text{
        font-size: 30rpx;
        color: #333;
      }
      .btn2 {
        font-size: 28rpx;
        color: white;
        padding: 10rpx 36rpx;
        background-color: $themeColor;
        border-radius: 60rpx;
        margin-top: 26rpx;
      }
    }
    .orderList {
      padding: 20rpx 0;
      background-color: #F6F6F6;
      .orderCell {
        width: 100%;
        background-color: white;
        margin-bottom: 20rpx;
        padding: 24rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .orderTitle {
          .hospitalName {
            font-size: 28rpx;
            color: #999;
            margin-left: 20rpx;
          }
          .moreText {
            font-size: 24rpx;
            color: #999;
            margin-right: 10rpx;
          }
        }
        .orderInfo {
          background-color: #f6f6f6;
          margin-top: 24rpx;
          .orderImage {
            height: 100rpx;
            width: 100rpx;
            overflow: hidden;
            margin-right: 20rpx;
            background-color: #999;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .orderDuration {
            .startDate {
              font-size: 24rpx;
              color: #333;
              margin-bottom: 14rpx;
            }
            .endDate {
              font-size: 24rpx;
              color: #333;
            }
          }
        }
        .orderAmount {
          margin-top: 20rpx;
          .orderCount {
            font-size: 24rpx;
            color: #333;
            margin-right: 10rpx;
          }
          .orderPrice {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
    }
    .emptyBlock{
      padding: 120rpx 0;
      img{
        height: 60rpx;
        width: 84rpx;
        margin: 0 auto;
      }
      .tips{
        text-align: center;
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #999;
      }
      .btn2 {
        font-size: 28rpx;
        color: white;
        padding: 16rpx 36rpx;
        background-color: $themeColor;
        border-radius: 60rpx;
        margin: 0 auto;
        margin-top: 50rpx;
      }
    }
  }
</style>
