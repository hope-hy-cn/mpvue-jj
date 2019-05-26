<template>
  <div class="firstTip flexColAroundRowStretch">
    <div class="main">
      <div class="image flexColCenterRowCenter">
        <img
        src="https://image1.postop.cn/SmallProgram/yingyangshi/201904/first_tip.png"
        @error="handelError"
      >
      </div>
      <ul class="tip flexColCenterRowStart">
        <li><span class="dian"></span>生病时，你<span class="strong">需要特殊的营养</span></li>
        <li><span class="dian"></span>请你填写基础信息来判断现在的病情</li>
      </ul>
      <div>

      </div>
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
  import NextButton from '../../components/NextButton/NextButton.vue'

export default {
  components: {
    'next-button':NextButton
  },
  data () {
    return {
        nextPath:'/pages/personalInfo/main'
    }
  },
onLoad(){

},
  created() {

  },
  methods:{
    clickButton(){
      wx.navigateTo({
        url:this.nextPath
      })
    },
    handelError(){
      setTimeout(()=>{
        wx.showToast({
          title: '图片加载失败',
          icon: 'none',
          duration: 1000
        })
      },2000)

    }
  }

}
</script>

<style scoped lang="scss">
.firstTip{
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
