<template>
    <div class="btn flexColCenterRowCenter" @click.stop="toNextPage"
         :class="{transBtn:type=='trans',noRadius:shape=='noRadius',
                  small:size=='small',middle: size=='middle',
                  moreIcon:icon=='more'
                  }"
         :style="{'width':Width+'rpx','height':Height+'rpx','opacity':Opacity}"
    >

      <a :style="{'width':Width+'rpx','height':Height+'rpx'}">
        {{text}}
      </a>
    </div>
</template>

<script>
    export default {
      name: "nextButton",
      props:{
          text:{default:'默认值'},
          type:String,
          shape:String,
          size:String,
          icon:String,
          Width:String,
          Height:String,
          Opacity:Number
      },
      methods:{
        toNextPage(){
          this.$emit('clickBtn')
        }
      },
      created(){

      }
    }
</script>

<style scoped lang="scss">

.btn{
  a{
    font-size:36rpx;
    color:#fff;
    width:700rpx;
    height:100rpx;
    line-height: 100rpx;
    text-align: center;
    background:$themeColor;
    border-radius:200rpx;
  }
}
  .transBtn {
    a{
      background:linear-gradient(360deg,rgba(73,138,121,1) 0%,rgba(98,204,116,0.01) 100%);
    }
  }
  .noRadius {
    a{
      border-radius:0;
      font-size: 36rpx;
      width:270rpx;
      height: 100rpx;
    }
  }
.small {
  a{
    width:210rpx;
    height: 60rpx;
    line-height: 70rpx;
    font-size: 28rpx;
  }
}
.middle {
   a{
     width:210rpx;
     height: 70rpx;
     line-height: 70rpx;
     font-size: 28rpx;
   }
 }
.moreIcon{
    a::after{
      content:">" ;
      font-size: 30rpx;
    }
  }

</style>
