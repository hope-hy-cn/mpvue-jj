<template>
  <div class="reportDetail" :class="{hasOrderBtn:hasOrderBtn}">
    <div class="block">
      <div class="blockContent">
        <div class="explain">测评结果您目前(根据NRS-2002量表)</div>
        <div class="reportTitle">{{resData.title}}</div>
        <div class="createOn">{{resData.createOn}}</div>
        <div class="tags flexRowStartColCenter">
          <div class="tag" v-for="(tag,i) in resData.tags" :key="i">{{tag}}</div>
        </div>
      </div>
    </div>
    <div class="reportTipsWrap">
      <div class="reportTips">{{resData.tips}}</div>
    </div>
    <div class="block">
      <div class="blockTitle flexRowBetweenColCenter">
        <div class="titleText">身体质量指数<span>(BMI)</span></div>
        <div class="titleText2">{{bmi.value}}</div>
      </div>
      <div class="blockContent">
        <div class="bmiProgress">
          <div class="bmiTag flexRowAroundColCenter flexItemStretch">
            <div>偏瘦</div>
            <div>正常</div>
            <div>偏胖</div>
            <div>肥胖</div>
          </div>
          <canvas canvas-id="bmi" class="bmiCanvas"></canvas>
          <div class="bmiStandard flexRowAroundColCenter flexItemStretch">
            <div></div>
            <div>18.5</div>
            <div>24</div>
            <div>28</div>
            <div></div>
          </div>
        </div>
        <div class="proposal flexRowStartColStart">
          <div class="dot flexItem000"></div>
          <div class="text">
            <span>建议：</span>{{bmi.proposal}}
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="blockTitle">
        <div class="titleText">建议每日摄入食物比例</div>
      </div>
      <div class="blockContent">
        <div class="charts flexRowAroundColCenter">
          <div class="chartsCell">
            <canvas canvas-id="carb"></canvas>
            <div>碳水化合物</div>
          </div>
          <div class="chartsCell">
            <canvas canvas-id="fat"></canvas>
            <div>脂肪</div>
          </div>
          <div class="chartsCell">
            <canvas canvas-id="protein"></canvas>
            <div>蛋白质</div>
          </div>
        </div>
        <div class="proposal flexRowStartColStart">
          <div class="dot flexItem000"></div>
          <div class="text">
            <span>建议：</span>{{targetIntake.proposal}}
          </div>
        </div>
      </div>
    </div>
    <div class="orderBtn" v-if="hasOrderBtn">个性订餐</div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
  import {Pie, Progress} from '../../components/Charts/Charts'

  export default {
    name: "reportDetail",
    data() {
      return {
        resData: {},
        bmi: {},
        targetIntake: {},
        hasOrderBtn: false
      }
    },
    onLoad(opts) {
      if (opts.canOrder == "true" || opts.canOrder == true) this.hasOrderBtn = true
      else this.hasOrderBtn = false
      this.getReportDetail({data: {reportId: opts.reportId}}).then(res => {
        this.resData = res.data
        this.bmi = res.data.bmi
        this.targetIntake = res.data.targetIntake
        const dd = wx.getSystemInfoSync()
        var barWidth = dd.windowWidth - 70
        var that = this
        new Progress('bmi', {
          lineWidth: 6,
          width: barWidth,
          height: 6,
          lineColor: that.getColor(that.bmi.value, [0, 18.5, 24, 28, 35]),
          bgColor: "#F2F2F2",
          percentage: that.getPercentage(that.bmi.value, [0, 18.5, 24, 28, 35]),
          hasCutLine: true,
          cutLineColor: "white",
          cutNum: 4
        })


        new Pie('carb', {
          height: 80,
          width: 80,
          count: 100,
          number: this.targetIntake.carbohydrate * 100,
          bgColor: "#f4f4f4",
          color: "#00D1AC",
          startAngle: 0,
          lineWidth: 7,
          title: {
            text: this.targetIntake.carbohydrate * 100 + "%",
            fontSize: 14,
            color: "#333"
          }
        })
        new Pie('fat', {
          height: 80,
          width: 80,
          count: 100,
          number: this.targetIntake.fat * 100,
          bgColor: "#f4f4f4",
          color: "#00D1AC",
          startAngle: 0,
          lineWidth: 7,
          title: {
            text: this.targetIntake.fat * 100 + "%",
            fontSize: 14,
            color: "#333"
          }
        })
        new Pie('protein', {
          height: 80,
          width: 80,
          count: 100,
          number: this.targetIntake.protein * 100,
          bgColor: "#f4f4f4",
          color: "#00D1AC",
          startAngle: 0,
          lineWidth: 7,
          title: {
            text: this.targetIntake.protein * 100 + "%",
            fontSize: 14,
            color: "#333"
          }
        })
      })
    },
    methods: {
      ...mapActions({
        getReportDetail: 'evaluation/getReportDetail'
      }),
      getPercentage(value, standard) {
        var percentage = 0
        if (value >= standard[0] && value < standard[1]) {
          percentage = (1 / 4) * (value / standard[1])
        } else if (value >= standard[1] && value < standard[2]) {
          percentage = (1 / 4) + (1 / 4) * ((value - standard[1]) / (standard[2] - standard[1]))
        } else if (value >= standard[2] && value < standard[3]) {
          percentage = (2 / 4) + (1 / 4) * ((value - standard[2]) / (standard[3] - standard[2]))
        } else if (value >= standard[3] && value < standard[4]) {
          percentage = (3 / 4) + (1 / 4) * ((value - standard[3]) / (standard[4] - standard[3]))
        } else {
          percentage = 1
        }
        return percentage
      },
      getColor(value, standard) {
        var color
        if (value >= standard[1] && value < standard[2]) {
          color = "#00D1AC"
        } else {
          color = "#F0655D"
        }
        return color
      }
    }
  }
</script>

<style scoped lang="scss">
  .reportDetail {
    background-color: #f6f6f6;
    &.hasOrderBtn {
      padding-bottom: 180rpx;
    }
    .block {
      background-color: white;
      margin-top: 20rpx;
      &:first-child {
        margin-top: 0;
      }
      .explain {
        font-size: 24rpx;
        color: #999;
      }
      .reportTitle {
        font-size: 60rpx;
        color: #333;
        margin-top: 18rpx;
      }
      .createOn {
        font-size: 20rpx;
        color: #999;
        margin-top: 14rpx;
      }
      .tags {
        margin-top: 24rpx;
        .tag {
          font-size: 24rpx;
          color: #333;
          padding: 10rpx 20rpx;
          border: 2rpx solid #ddd;
          margin-right: 20rpx;
          margin-top: 20rpx;
        }
      }
      .blockTitle {
        border-bottom: 2rpx solid #f6f6f6;
        padding: 40rpx 30rpx 30rpx 30rpx;
        .titleText {
          font-size: 36rpx;
          color: #333;
          font-weight: bold;
          span {
            font-size: 28rpx;
            color: #999;
            font-weight: bold;
          }
        }
        .titleText2 {
          font-size: 36rpx;
          color: #999;
          font-weight: bold;
        }
      }
      .blockContent {
        padding: 40rpx 30rpx;
        .bmiProgress {
          padding: 0 40rpx;
          .bmiTag {
            div {
              text-align: center;
              font-size: 28rpx;
              color: #999;
            }
          }
          .bmiCanvas {
            width: 100%;
            height: 12rpx;
            margin: 16rpx auto;
          }
          .bmiStandard {
            padding-bottom: 22rpx;
            border-bottom: 2rpx solid #f6f6f6;
            div {
              text-align: center;
              font-size: 28rpx;
              color: #999;
            }
          }
        }
        .proposal {
          margin-top: 30rpx;
          .dot {
            height: 12rpx;
            width: 12rpx;
            background-color: $themeColor;
            border-radius: 100%;
            margin-right: 22rpx;
            margin-top: 8rpx;
          }
          .text {
            font-size: 28rpx;
            color: #999;
            line-height: 1.5;
            span {
              color: #333;
            }
          }
        }
        .charts {
          .chartsCell {
            canvas {
              height: 160rpx;
              width: 160rpx;
            }
            div {
              margin-top: 20rpx;
              font-size: 24rpx;
              color: #333;
              text-align: center;
            }
          }
        }
      }
    }
    .reportTipsWrap {
      background-color: white;
      padding: 30rpx;
      border-top: 2rpx solid #f6f6f6;
      .reportTips {
        padding: 26rpx;
        line-height: 1.5;
        background-color: rgba($themeColor, 0.1);
        border: 2rpx solid rgba($themeColor, 0.5);
        border-radius: 20rpx;
        font-size: 32rpx;
        color: #333;
      }
    }
    .orderBtn {
      height: 100rpx;
      width: calc(100% - 60rpx);
      border-radius: 100rpx;
      background-color: $themeColor;
      position: fixed;
      bottom: 40rpx;
      left: 30rpx;
      line-height: 100rpx;
      font-size: 36rpx;
      color: white;
      text-align: center;
    }
  }
</style>
