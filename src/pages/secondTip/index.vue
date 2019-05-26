<template>
  <div class="secondTip flexColAroundRowStretch">
    <div class="main">
      <div class="image flexColCenterRowCenter">
        <img
        src="https://image1.postop.cn/SmallProgram/yingyangshi/201904/second_tip.png"
        @error="handelError"
      >
      </img>
      </div>
      <ul class="tip flexColCenterRowStart">
        <li><span class="dian"></span>{{tips[0]}}</li>
        <li><span class="dian"></span>{{tips[1]}}</li>
      </ul>
    </div>
    <div class="button">
      <next-button :text="'下一步'"
                   @clickBtn="clickButton"
      >
      </next-button>
    </div>

  </div>
</template>

<script>
  import NextButton from '@/components/NextButton/NextButton.vue'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

export default {
  components: {
    'next-button':NextButton
  },
  data () {
    return {
      nextPath:"/pages/baseEvaluation/main",
      tips:[]
    }
  },
  onLoad(){
    this.getTips()
  },
  created() {

  },
  methods:{
    ...mapActions({
      getDiseaseResult:'evaluation/getDiseaseResult'
    }),
    clickButton(){
      wx.navigateTo({
        url:this.nextPath
      })
    },
    handelError(){
      wx.showLoading({
        title: '加载中',
      }),
      setTimeout(()=>{
        wx.showToast({
          title: '图片加载失败',
          icon: 'none',
          duration: 1500
        })
      },2000)

    },
    getTips(){
      this.getDiseaseResult(
        {
          id:''
        }
      ).then((res)=>{
        this.tips=res.data.tips
      })
    }

  }

}
</script>

<style scoped lang="scss">
.secondTip{
  position:fixed;
  height: 100%;
  width: 100%;
  border-top: 2rpx solid #EBEBEB;
}
.main{
  flex:1;
  margin:0 20rpx -40rpx 20rpx;
  font-size:36rpx;

  .image{
    height: 60%;
    img{
      width:400rpx;
      height: 460rpx;
    }
  }
  .tip li{
    padding-left: 20rpx;
    font-size: 34rpx;
    color: #999;
    height: 64rpx;
    line-height: 64rpx;
  }
.tip li .dian{
  margin: 0 20rpx;
  display: inline-block;
  width:12rpx;
  height:12rpx;
  border-radius:50%;
  background-color: $themeColor;

}
  .tip li .strong {
    font-size: 34rpx;
    font-weight: 600;
    color:#333;
  }
    .tip li,.tip li b{
  font-size: 34rpx;
  height: 80rpx;
  line-height: 80rpx;
}
  .tip li b{
    color:#333;
  }

}
  .button{
    margin-bottom:40rpx;
  }

</style>
