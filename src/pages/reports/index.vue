<template>
  <scroll-view scroll-y lower-threshold @scrolltolower="scrolltolower" class="reports">
    <div class="headBlock flexColCenterRowStart" v-if="list[0]">
      <div class="title">测评结果您目前(根据NRS-2002量表)</div>
      <div class="riskTips">{{list[0].title}}</div>
      <div class="tags flexRowStartColCenter flexWrap">
        <div class="tag" v-for="(tag,i) in list[0].tags" :key="i"><span>{{tag}}</span></div>
      </div>
      <div class="btn" @click="reEvaluation">继续测评</div>
    </div>
    <div class="list">
      <div class="reportCell flexRowStartColStart" v-for="(item,index) in list " :key="index" @click="goToDetail(item.reportId)">
        <div class="reportIcon flexItem000">
          <img v-if="item.riskType == 0" src="../../../static/images/ic_normal.png">
          <img v-if="item.riskType == 1" src="../../../static/images/ic_venture.png">
          <img v-if="item.riskType == 2" src="../../../static/images/ic_bad.png">
        </div>
        <div class="reportInfo flexItem110 flexColStartRowStart">
          <div class="riskTips">{{item.title}}</div>
          <div class="tags flexRowStartColCenter flexWrap">
            <div class="tag" v-for="(tag,i) in item.tags" :key="i"><span>{{tag}}</span></div>
          </div>
          <div class="createOn">{{item.createOn}}</div>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: "reports",
    data() {
      return {
        list:[],
        ajaxData:{
          id:"",
          pageSize:10,
          pageNum:1
        },
        totalCount:0
      }
    },
    onLoad() {
      this.getList()
    },
    methods:{
      ...mapActions({
        getReportsList: 'evaluation/getReportsList'
      }),
      getList() {
        this.getReportsList({data: this.ajaxData}).then(res => {
          this.list = this.list.concat(res.data.list)
          this.totalCount = res.data.totalCount
        })
      },
      scrolltolower() {
        if(this.ajaxData.pageNum * this.ajaxData.pageSize >= this.totalCount) return
        this.ajaxData.pageNum ++
        this.getList()
      },
      goToDetail(id){
        wx.navigateTo({
          url: '../reportDetail/main?reportId=' + id + "&canOrder=false"
        })
      },
      reEvaluation(){
        wx.navigateTo({
          url: '../hospitalInfo/main'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .reports{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    .headBlock {
      width: 100%;
      height: 550rpx-108rpx;
      background: #498A79;
      padding: 40rpx;
      .title {
        font-size: 24rpx;
        color: white;
      }
      .riskTips {
        font-size: 60rpx;
        color: white;
        margin-top: 20rpx;
      }
      .tags{
        margin-top: 32rpx;
        .tag{
          background-color: rgba(255,255,255,0.3);
          padding: 8rpx 20rpx;
          margin-right: 20rpx;
          margin-bottom: 20rpx;
          span{
            font-size: 24rpx;
            color: #f6f6f6;
          }
        }
      }
      .btn {
        font-size: 28rpx;
        color: white;
        padding: 20rpx 36rpx;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 60rpx;
        margin-top: 60rpx;
        opacity: 0.5;
        &:active{
          opacity: 1;
        }
      }
    }
    .list{
      width: 100%;
      padding: 30rpx 26rpx;
      .reportCell{
        width: 100%;
        min-height: 180rpx;
        background-color: white;
        -webkit-border-radius: 10rpx;
        -moz-border-radius: 10rpx;
        border-radius: 10rpx;
        overflow: hidden;
        padding: 30rpx;
        margin-bottom: 20rpx;
        &:last-child{
          margin-bottom: 0;
        }
        .reportIcon{
          height: 100rpx;
          width: 100rpx;
          margin-right: 30rpx;
          margin-top: 8rpx;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .reportInfo{
          height: 100%;
          .riskTips{
            font-size: 28rpx;
            color: #333;
            font-weight: bold;
          }
          .tags{
            margin-top: 14rpx;
            .tag{
              background-color: rgba(0,208,170,0.1);
              border:2rpx solid rgba(0,208,170,0.5);
              padding: 10rpx;
              margin-right: 10rpx;
              margin-bottom: 10rpx;
              span{
                font-size: 20rpx;
                color: #666666;
              }
            }
          }
          .createOn{
            font-size: 20rpx;
            color: #999;
            margin-top: 10rpx;
          }
        }
      }
    }
  }
</style>
