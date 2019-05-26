<template>
  <div class="guide flexColBetweenRowCenter pageBox">
    <div class="textBlock flexItem110">
      <div class="title">营养评估问卷</div>
      <div class="text text1">为了医生给您提供精准的营养评估与建议，请认真填写问卷，包括以下三个方面：</div>
      <div class="text">1.风险筛查</div>
      <div class="text">2.膳食评估</div>
      <div class="text">3.健康习惯</div>
    </div>
    <button open-type="getUserInfo" class="btn" @getuserinfo="bindGetUserInfo">进入R+ 营养师</button>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: "guide",
    data(){
      return {
        canIUse:wx.canIUse('button.open-type.getUserInfo')
      }
    },
    components:{
    },
    onLoad(){
      var that = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                that.login({}).then((loginRes) => {
                  that.jumpPage(loginRes)
                })
              }
            })
          }
        }
      })
    },
    methods: {
      ...mapActions(
        {
          login: 'user/login',
        }),
      jumpPage(data) {
        if(true){
          wx.switchTab({
            url: '../home/main'
          })
        }else{
          wx.navigateTo({
            url: '../hospitalInfo/main'
          })
        }
      },
      bindGetUserInfo(e) {
        if(this.canIUse == true){
          if (e.mp.detail.rawData){
            this.login({data:{}}).then(res => {
              this.jumpPage(res.data)
            })
          } else {
            wx.showToast({
              title: '请同意授权后使用',
              icon: "none",
              duration: 2000
            })
          }
        }else{
          wx.showToast({
            title: '微信版本过低，请先升级',
            icon: "none",
            duration: 2000
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .guide {
    position: fixed;
    height: 100%;
    width: 100%;
    padding: 30rpx;
    background-color: #F7FCFE;
    background-image: url("https://image1.postop.cn/SmallProgram/yingyangshi/201902/kongbiji.png");
    background-size: 100% auto;
    background-position: bottom;
    background-repeat: no-repeat;
    .textBlock{
      padding: 76rpx 38rpx 10rpx 38rpx;
      .title {
        font-size: 60rpx;
        color: #333;
        margin-bottom: 60rpx;
      }

      .text {
        font-size: 30rpx;
        line-height: 1.4;
        color: #666;
      }

      .text1 {
        margin-bottom: 60rpx;
      }
    }
    .btn {
      box-sizing: border-box;
      height: 100rpx;
      width: 100%;
      -webkit-border-radius: 100rpx;
      -moz-border-radius: 100rpx;
      border-radius: 100rpx;
      color: white;
      font-size: 36rpx;
      text-align: center;
      line-height: 100rpx;
      background-color: #0ed2b1;
    }
  }

</style>
