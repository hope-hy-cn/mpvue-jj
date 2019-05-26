<template>
  <div class="home">
    <div class="headBlock flexRowCenterColCenter">
      <canvas canvas-id="canvas" class="pie"></canvas>
    </div>
    <div class="adImage">
      <img :src="adImage">
    </div>
    <div class="intakeBox" v-if="!isEmpty">
      <div class="intakeTitle">今日营养摄入</div>
      <div class="intakeContent">
        <div class="intakeBgBox">
          <div class="intakeBgColBox flexRowCenterColCenter">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="intakeBgColText flexRowCenterColCenter">
            <div>偏少</div>
            <div>正常</div>
            <div>偏多</div>
          </div>
          <div class="intakeSource">*营养来源：{{nutritionSourceStr}}</div>
        </div>
        <div class="intakeChartBox">
          <div class="intakeCell flexRowCenterColEnd">
            <div class="intakeName">能量</div>
            <canvas canvas-id="energy" class="intakeProgressCanvas"></canvas>
          </div>
          <div class="intakeCell flexRowCenterColEnd">
            <div class="intakeName">脂肪</div>
            <canvas canvas-id="fat" class="intakeProgressCanvas"></canvas>
          </div>
          <div class="intakeCell flexRowCenterColEnd">
            <div class="intakeName">蛋白质</div>
            <canvas canvas-id="protein" class="intakeProgressCanvas"></canvas>
          </div>
          <div class="intakeCell flexRowCenterColEnd">
            <div class="intakeName">碳水化合物</div>
            <canvas canvas-id="carb" class="intakeProgressCanvas"></canvas>
          </div>
          <div class="intakeCell flexRowCenterColEnd">
            <div class="intakeName">钠</div>
            <canvas canvas-id="na" class="intakeProgressCanvas"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="emptyBlock" v-else>
      <img src="../../../static/images/ic_intake_empty.png">
      <div class="tips">您还没有预定特膳</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
  import {Pie, Progress} from '../../components/Charts/Charts'

  export default {
    name: "home",
    data() {
      return {
        isEmpty:false,
        adImage: "https://image1.postop.cn/SmallProgram/yingyangshi/201812/chengban.jpg",
        nutritionSourceStr:""
      }
    },
    onLoad() {
      this.getHomeInfo(
        {
          data: {
            id: "",
            date: ""
          }
        }
      ).then(res => {
        if(res.data == null){
          this.isEmpty = true
        }else{
          this.isEmpty = false
          this.setData(res.data)
        }
      })
    },
    methods: {
      ...mapActions({
        getHomeInfo: 'user/getHomeInfo'
      }),
      setData(resData) {
        var that = this

        this.nutritionSourceStr = resData.nutritionSource.length > 0 ? resData.nutritionSource.join("、") : "暂无"

        new Pie('canvas', {
          height: 130,
          width: 130,
          count: resData.scoreTarget,
          number: resData.score,
          startColor: "red",
          endColor: "blue",
          bgColor: "rgba(255,255,255,0.4)",
          color: "white",
          startAngle: 0,
          lineWidth: 7,
          title: {
            text: 60,
            fontSize: 36,
            color: "white"
          },
          subTitle: {
            text: "营养评分",
            fontSize: 12,
            color: "white"
          }
        })

        new Progress('energy', {
          lineWidth: 6,
          width: 244,
          height: 28,
          lineColor: that.getIntakeStatusColor(resData.nutritionIntake.energy,resData.nutritionTarget.energy),
          bgColor: "#F2F2F2",
          percentage: that.getPercentage(resData.nutritionIntake.energy,resData.nutritionTarget.energy),
          text: resData.nutritionIntake.energy + "g",
          textColor: "#999",
          textSize: 12,
          textPosition: "top"
        })
        new Progress('fat', {
          lineWidth: 6,
          width: 244,
          height: 28,
          lineColor: that.getIntakeStatusColor(resData.nutritionIntake.fat,resData.nutritionTarget.fat),
          bgColor: "#F2F2F2",
          percentage: that.getPercentage(resData.nutritionIntake.fat,resData.nutritionTarget.fat),
          text: resData.nutritionIntake.fat + "g",
          textColor: "#999",
          textSize: 12,
          textPosition: "top"
        })
        new Progress('protein', {
          lineWidth: 6,
          width: 244,
          height: 28,
          lineColor: that.getIntakeStatusColor(resData.nutritionIntake.protein,resData.nutritionTarget.protein),
          bgColor: "#F2F2F2",
          percentage: that.getPercentage(resData.nutritionIntake.protein,resData.nutritionTarget.protein),
          text: resData.nutritionIntake.protein + "g",
          textColor: "#999",
          textSize: 12,
          textPosition: "top"
        })
        new Progress('carb', {
          lineWidth: 6,
          width: 244,
          height: 28,
          lineColor: that.getIntakeStatusColor(resData.nutritionIntake.carbohydrate,resData.nutritionTarget.carbohydrate),
          bgColor: "#F2F2F2",
          percentage: that.getPercentage(resData.nutritionIntake.carbohydrate,resData.nutritionTarget.carbohydrate),
          text: resData.nutritionIntake.carbohydrate + "g",
          textColor: "#999",
          textSize: 12,
          textPosition: "top"
        })
        new Progress('na', {
          lineWidth: 6,
          width: 244,
          height: 28,
          lineColor: that.getIntakeStatusColor(resData.nutritionIntake.na,resData.nutritionTarget.na),
          bgColor: "#F2F2F2",
          percentage: that.getPercentage(resData.nutritionIntake.na,resData.nutritionTarget.na),
          text: resData.nutritionIntake.na + "",
          textColor: "#999",
          textSize: 12,
          textPosition: "top"
        })
      },
      getPercentage(value,standard){
        var percentage = 0
        if(value >= standard[0] && value < standard[1]){
          percentage = (1 / 3) * (value / standard[1])
        }else if(value >= standard[1] && value < standard[2]){
          percentage = (1 / 3) + (1 / 3) * ((value - standard[1]) / (standard[2] - standard[1]))
        }else if(value >= standard[2] && value < standard[3]){
          percentage = (2 / 3) + (1 / 3) * ((value - standard[2]) / (standard[3] - standard[2]))
        }else{
          percentage = 1
        }
        return percentage
      },
      getIntakeStatusColor(value,standard){
        var color
        if(value >= standard[1] && value < standard[2]){
          color = "#00D1AC"
        }else{
          color = "#F0655D"
        }
        return color
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    .headBlock {
      width: 100%;
      height: 550rpx-128rpx;
      background: #498A79;
      .pie {
        height: 260rpx;
        width: 260rpx;
      }
    }
    .adImage {
      margin: 40rpx 30rpx;
      height: 252rpx;
      background-color: #ccc;
      -webkit-border-radius: 10rpx;
      -moz-border-radius: 10rpx;
      border-radius: 10rpx;
      overflow: hidden;
      @include shadow();
      img {
        height: 100%;
        width: 100%;
      }
    }
    .intakeBox {
      padding: 16rpx 30rpx 0rpx 30rpx;
      margin-top: 16rpx;
      .intakeTitle {
        font-size: 40rpx;
        font-weight: 600;
        color: #333;
      }
      .intakeContent {
        position: relative;
        width: 100%;
        .intakeBgBox {
          width: 492rpx;
          padding-bottom: 50rpx;
          position: absolute;
          right: calc((100% - 492rpx - 120rpx - 30rpx) / 2);
          top: 54rpx;
          .intakeBgColBox {
            height: 370rpx;
            width: 100%;
            border-bottom: 2rpx dashed #DDDDDD;
            div {
              height: 100%;
              width: 164rpx;
              background-color: #FFF7F6;
              opacity: 0.1;
              &:nth-child(2) {
                background-color: $themeColor;
                opacity: 0.2;
              }
            }
          }
          .intakeBgColText {
            width: 100%;
            div {
              height: 100%;
              width: 164rpx;
              font-size: 24rpx;
              text-align: center;
              color: #F0655D;
              margin-top: 6rpx;
              &:nth-child(2) {
                color: $themeColor;
              }
            }
          }
          .intakeSource {
            width: 100%;
            font-size: 20rpx;
            color: #999;
            line-height: 1.5;
            margin-top: 24rpx;
          }
        }
        .intakeChartBox {
          .intakeCell {
            margin-top: 24rpx;
            .intakeName {
              width: 120rpx;
              text-align: right;
              font-size: 24rpx;
              color: #999;
              margin-right: 30rpx;
            }
            .intakeProgressCanvas {
              height: 56rpx;
              width: 492rpx;
            }
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
    }
  }
</style>
