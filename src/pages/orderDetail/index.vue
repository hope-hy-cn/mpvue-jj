<template>
  <div class="orderDetail">
    <div class="orderTitle flexRowStartColCenter flexItem000">订单详情</div>
    <div class="orderInfo flexItem110 flexRowStartColStart flexWrap">
      <div v-for="(item,index) in orders" :key="index" class="mealCell" :class="{hasSelected:item.mealName.length>0}">
        <div class="mealCellDate flexRowBetweenColCenter">
          <div>{{item.week}}</div>
          <div>{{item.day}}</div>
        </div>
        <div class="noOrder" v-if="item.mealName.length == 0">未订餐</div>
        <div class="orderBox" v-else>
          <div v-for="(meal,i) in item.mealName" :key="i" class="mealInfo flexRowStartColCenter">
            <div class="flexItem110">{{i == 0 ? meal || "" : meal || "未订"}}</div>
            <div class="flexItem000 icon_gou" v-if="meal"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
  import {getDateInfo, getDevice} from '../../libs/tools'
  import config from '../../config'

  export default {
    name: "orderDetail",
    data() {
      return {
        orders: []
      }
    },
    onLoad(opt) {
      this.getOrderDetail({data: {id: opt.id}}).then(res => {
        var nutritiouMeals = res.data.buyerNote.nutritiouMeals
        var firstOrderDateStr = nutritiouMeals.date[0]  //该订单最早的送餐日期
        //初始化展示列表
        var allOrders = []
        for (var i = 0; i < config.orderDayNumber; i++) {
          var dateInfo = getDateInfo(firstOrderDateStr, i);
          allOrders[i] = {
            date: dateInfo.date,
            week: dateInfo.week,
            day: dateInfo.day,
            mealName: [],
            typeIndex: [],
            quantity: [],
            spec: []
          }
        }
        for (var x = 0; x < nutritiouMeals.date.length; x++) {
          for (var y = 0; y < allOrders.length; y++) {
            if (nutritiouMeals.date[x] == allOrders[y].date) {
              var z = nutritiouMeals.typeIndex[x]
              allOrders[y].mealName[z] = nutritiouMeals.mealName[x]
              allOrders[y].typeIndex[z] = nutritiouMeals.typeIndex[x]
              allOrders[y].quantity[z] = nutritiouMeals.quantity[x]
              allOrders[y].spec[z] = nutritiouMeals.spec[x]
            }
          }
        }
        this.orders = allOrders
      })
    },
    methods: {
      ...mapActions({
        getOrderDetail: 'mall/getOrderDetail'
      }),
    }
  }
</script>

<style scoped lang="scss">
  .orderDetail {
    .orderTitle {
      width: 100%;
      margin-top: 20rpx;
      font-size: 40rpx;
      color: #333;
      font-weight: bold;
      height: 120rpx;
      padding: 30rpx;
      background-color: white;
      border-bottom: 2rpx solid #ebebeb;
    }
    .orderInfo {
      height: 100%;
      width: 100%;
      overflow: auto;
      background-color: white;
      padding: 30rpx 14rpx;
      margin-bottom: 20rpx;
      .mealCell {
        height: 200rpx;
        width: 220rpx;
        border: 2rpx dashed #ccc;
        overflow: hidden;
        padding: 6rpx 12rpx;
        border-radius: 12rpx;
        margin: 10rpx;
        &.hasSelected {
          background-color: #dffcf7;
          border: 2rpx solid #dffcf7;
        }
        .mealCellDate {
          div {
            &:first-child {
              font-size: 24rpx;
              color: #999;
            }
            &:last-child {
              font-size: 48rpx;
              color: #00D1AD;
            }
          }
          margin-bottom: 14rpx;
        }
        .noOrder {
          margin-top: 40rpx;
          font-size: 30rpx;
          color: #333;
          text-align: center;
          font-weight: bold;
        }
        .orderBox {
          .mealInfo {
            width: 100%;
            margin-bottom: 16rpx;
            div {
              height: 26rpx;
              font-size: 24rpx;
              color: #666;
              &.ordered {
                color: #00d0aa;
              }
            }
            .icon_gou {
              height: 24rpx;
              width: 24rpx;
              overflow: hidden;
              background-image: url("../../../static/images/spriteIcon1.png");
              background-size: 200% auto;
              background-position: 0 0;
            }
          }
        }
      }
    }
  }
</style>
