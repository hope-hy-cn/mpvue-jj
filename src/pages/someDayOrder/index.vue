<template>
  <div class="order pageBox flexColCenterRowCenter">
    <div class="dateBar flexRowBetweenColCenter">
      <div v-for="(item,i) in date" class="flexItem110 flexColCenterRowCenter dateCell" :key="i"
           :class="{thisDateCell:i==nowMealIndex,canBuy:(!meals[i].overdue&&meals[i].count>0)}">
        <div class="weekItem" v-if="i==0">今日</div>
        <div class="weekItem" v-else>周{{item.week}}</div>
        <div :class="{checked:i==checkedIndex}" class="flexRowCenterColCenter dayNum" @click="checkedDate(i)">
          {{item.day}}
        </div>
        <div class="weekStatus">{{meals[i].overdue ? "不可订" : meals[i].count > 0 ? "可订":"未开放"}}</div>
      </div>
    </div>
    <scroll-view direction="y" class="mealBox flexItem110">
      <div class="card nutritiveBox">
        <div class="boxTitle">我的营养构成</div>
        <div class="progressBox">
          <div class="progressCell">
            <div class="progressTitle flexRowBetweenColCenter">
              <div class="progressTitleText">
                能量(<span>{{energy_select}}Kcal</span> / {{energy_total}}Kcal)
              </div>
            </div>
            <div class="progressBar">
              <div class="progressBarInner"
                   :style="{width:energy_select > energy_total ? '100%' : (energy_select / energy_total)*100+'%'}"></div>
            </div>
          </div>
          <div class="progressCell">
            <div class="progressTitle flexRowBetweenColCenter">
              <div class="progressTitleText">
                蛋白质(<span>{{protien_select}}g</span> / {{protien_total}}g)
              </div>
            </div>
            <div class="progressBar">
              <div class="progressBarInner"
                   :style="{width:protien_select > protien_total ? '100%' : (protien_select / protien_total)*100+'%'}"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(cell,index) in meals[nowMealIndex].meal" class="meal" :key="index">
        <div class="mealTitle flexRowStartColCenter">{{mealTitle[index]}}</div>
        <div v-if="cell.length==0" class="noMeal">暂不提供</div>
        <div  v-for="(item,i) in cell" class="mealCell flexRowBetweenColStart" :key="i"
             :style="{opacity:item.overdue?0.3:1}">
          <div class="mealImg flexItem000"><img :src="'https://mall.postop.cn/postopmall-core/download/'+item.mealImg">
          </div>
          <div class="mealInfo flexItem110 flexColStartRowStart">
            <div class="mealName textLineClamp1">{{item.mealName}}</div>
            <div class="mealDesc flexRowStartColStart">致敏信息：{{item.description ? item.description : '无'}}</div>
            <div class="mealDesc flexRowStartColStart" v-if="item.compositions.energy">
              能量：{{item.compositions.energy}} Kcal 蛋白质：{{item.compositions.protien}} g
            </div>
            <div class="mealPrice"><span>￥{{item.mealPrice}}</span></div>
          </div>
          <div class="mealOperation flexItem000 flexRowEndColCenter">
            <div v-if="item.ordered" class="ordered flexItem000">已订</div>
            <div v-else-if="item.overdue" class="overdue flexItem000">已过时</div>
            <div v-else-if="item.soldOut" class="soldOut flexItem000">售罄</div>
            <div class="mealNum flexRowEndColCenter" v-else>
              <div class="subBtn" :class="{noSub:item.count==0}" @click="sub(index,i)">-
              </div>
              <div class="count">{{item.count}}
              </div>
              <div class="addBtn" :class="{noSub:item.count>=1}" @click="add(index,i)">+</div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>

  import {mapGetters, mapState, mapMutations} from 'vuex'

  export default {
    name: "someDayOrder",
    data() {
      return {
        date: [],
        checkedIndex: 0,
        todayIndex: 0,
        meals: [],
        nowMealIndex: 0,
        mealTitle: ["早餐","午餐","晚餐"],
        canSettle: false,  //是否可以点击"去结算"
        totalPrice: 0,
        selectedAll: false,
        orderList: [],  //用于存放用户选择的商品
        timestamp: null,
        dayNum: 7,
        energy_total: Math.round(this.$store.state.user.userInfo.energy) || 0,
        energy_select: 0,
        // protien_total: this.$store.state.user.userInfo.compositionRule.CompositionQualities[2] ? Math.round(this.$store.state.user.userInfo.compositionRule.CompositionQualities[2].QualityValue) : 0,
        protien_select: 0,
        radioArr: []
      }
    },
    components: {

    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        // qrCodeInfo: state => state.qrCodeInfo,
        mealList: state => state.mall.mealList,
        orderReload: state => state.mall.orderReload,
        selectedArr: state => state.mall.selectedArr,
        // userInfo: state =>state.user.userInfo,
        // qrCodeInfo: state => {return {}},
        // mealList: state => {return []},
        // orderReload: state => true,
        // selectedArr: state => {return []}
      })
    },
    onLoad(options) {
      console.log(options.index)
      this.date = [this.getTime(0), this.getTime(1), this.getTime(2), this.getTime(3), this.getTime(4), this.getTime(5), this.getTime(6)]

      this.nowMealIndex = options.index
      this.todayIndex = 0
      this.meals = this.mealList
      this.getEnergy()
    },
    mounted() {
      this.$store.commit('mall/SetOrderReload', false)
      this.radioArr = this.selectedArr
    },
    methods: {
      getTime(n) {
        //var timestamp = new Date().getTime() - this.$store.state.csInterval
        // var timestamp = this.$store.state.csInterval
        var timestamp = new Date().getTime()
        var day = new Date(parseInt(timestamp))
        //var day = new Date();
        day.setTime(day.getTime() + n * 24 * 60 * 60 * 1000);
        var s = day.getFullYear() + "-" + (day.getMonth() + 1 > 9 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1)) + "-" + (day.getDate() > 9 ? day.getDate() : "0" + day.getDate());
        var week = null
        var hour = day.getHours();
        var weekTxt =["一", "二", "三", "四", "五", "六","日"];
        switch (day.getDay()) {
          case 0:
            week = weekTxt[6];
            break;
          case 1:
            week = weekTxt[0];
            break;
          case 2:
            week = weekTxt[1];
            break;
          case 3:
            week = weekTxt[2];
            break;
          case 4:
            week = weekTxt[3];
            break;
          case 5:
            week = weekTxt[4];
            break;
          case 6:
            week = weekTxt[5];
            break;
        }
        return {
          year: day.getFullYear(),
          month: day.getMonth() + 1,
          day: day.getDate(),
          hour: hour,
          week: week,
          date: s,
          weekNum: day.getDay()
        }
      },
      checkedDate(n) {
        return
        if (this.todayIndex <= n && n <= this.todayIndex + this.dayNum) {
          this.checkedIndex = n
          this.nowMealIndex = n - this.todayIndex
        } else {
          // this.DG.toast("暂时只支持预定" + this.dayNum + "天的营养餐")
          wx.showToast({
            title:"暂时只支持预定" + this.dayNum + "天的营养餐",
            icon: 'none',
            duration: 2000
          })
        }
        this.initEnergyData(n)
      },
      sub(y, z) {
        var x = this.nowMealIndex
        if (this.meals[x].meal[y][z].count > 0) {
          this.meals[x].meal[y][z].count--
          if(this.meals[x].meal[y][z].count == 0) this.meals[x].meal[y][z].selected = false
          this.radioArr[x] = false
          this.$store.commit('mall/SetSelectedArr', this.radioArr)
          this.getEnergy()
        }
      },
      add(y, z) {
        var x = this.nowMealIndex
        if (this.meals[x].meal[y][z].count < 1) {
          this.meals[x].meal[y][z].count++
          this.meals[x].meal[y][z].selected = true
          for (var n = 0; n < this.meals[x].meal.length; n++) {
            for (var m = 0; m < this.meals[x].meal[n].length; m++) {
              if (this.meals[x].meal[n][m].selected == false) {
                this.radioArr[x] = false
                this.getEnergy()
                return
              }
            }
          }
          this.radioArr[x] = true
          this.$store.commit('mall/SetSelectedArr', this.radioArr)
          this.getEnergy()
        }
      },
      changeCheck(e) {
        this.canSettle = e.target.checked
        this.selectedAll = !this.selectedAll
        if (this.canSettle) {
          var totalPrice = 0
          for (var x = 0; x < this.meals.length; x++) {
            for (var y = 0; y < this.meals[x].length; y++) {
              for (var z = 0; z < this.meals[x][y].length; z++) {
                if (!this.meals[x][y][z].ordered && !this.meals[x][y][z].overdue && !this.meals[x][y][z].soldOut) {
                  this.meals[x][y][z].selected = true
                }
              }
            }
          }
        } else {
          for (var x = 0; x < this.meals.length; x++) {
            for (var y = 0; y < this.meals[x].length; y++) {
              for (var z = 0; z < this.meals[x][y].length; z++) {
                if (!this.meals[x][y][z].ordered && !this.meals[x][y][z].overdue && !this.meals[x][y][z].soldOut) {
                  this.meals[x][y][z].selected = false
                }
              }
            }
          }
        }
        this.checkedDate(this.checkedIndex)
      },
      getEnergy() {
        var x = this.nowMealIndex
        var energy_select = 0 , protien_select = 0
        for (var y = 0; y < this.meals[x].meal.length; y++) {
          for (var z = 0; z < this.meals[x].meal[y].length; z++) {
            if (this.meals[x].meal[y][z].selected) {
              energy_select += (Math.round(this.meals[x].meal[y][z].compositions.energy) || 0)
              if (energy_select < 0) energy_select = 0
              protien_select += (Math.round(this.meals[x].meal[y][z].compositions.protien) || 0)
              if (protien_select < 0) protien_select = 0
            } else {
              // energy_select -= (Math.round(this.meals[x].meal[y][z].compositions.energy) || 0)
              // if (energy_select < 0) energy_select = 0
              // protien_select -= (Math.round(this.meals[x].meal[y][z].compositions.protien) || 0)
              // if (protien_select < 0) protien_select = 0
            }
          }
        }
        this.energy_select = energy_select
        this.protien_select = protien_select
      },
      initEnergyData(n) {
        this.energy_select = 0
        this.protien_select = 0
        for (var y = 0; y < this.meals[n].length; y++) {
          for (var z = 0; z < this.meals[n][y].length; z++) {
            if (this.meals[n][y][z].selected && this.meals[n][y][z].compositions.energy) {
              this.energy_select += (Math.round(this.meals[n][y][z].compositions.energy) || 0)
              this.protien_select += (Math.round(this.meals[n][y][z].compositions.protien) || 0)
            }
          }
        }
      },
      getSpec(typeIndex) {  //0、1、2  ,  分别表示"早餐"  "午餐"  "晚餐"
        var energy = this.userInfo.energy
        switch (typeIndex) {
          case 0:
            if (energy < 2000) {
              return "A"
            } else {
              return "B"
            }
            break
          case 1:
            if (energy < 1700) {
              return "A"
            } else if (energy >= 1700 && energy < 1900) {
              return "B"
            } else {
              return "C"
            }
            break
          case 2:
            if (energy < 1800) {
              return "A"
            } else if (energy >= 1800 && energy < 1900) {
              return "B"
            } else if (energy >= 1900 && energy < 2000) {
              return "A"
            } else if (energy >= 2000 && energy < 2100) {
              return "B"
            } else {
              return "C"
            }
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .order {
    background-color: #f6f6f6;
  }

  .dateBar {
    width: 100%;
    height: 160rpx;
    background-color: white;
  }

  .dateCell {
    width: 104rpx;
    height: 100%;
    .weekItem {
      font-size: 20rpx;
      color: #dbdbdb;
    }
    .dayNum {
      height: 56rpx;
      font-size: 40rpx;
      color: #dbdbdb;
    }
    .weekStatus {
      font-size: 20rpx;
      color: #dbdbdb;
    }
  }

  .thisDateCell {
    background-color: rgba(0, 209, 172, 0.15);
    .weekItem {
      color: #999;
    }
    .dayNum {
      color: #00D1AC !important;
    }
    .weekStatus {
      color: #00D1AC !important;
    }
  }
  .canBuy{
    .weekItem {
      color: #999;
    }
    .dayNum {
      color: #333;
    }
    .weekStatus {
      color: #FFAA29;
    }
  }

  .overdue {
    div {
      color: #ddd;
    }
  }

  .mealBox {
    height: 100%;
    width: 100%;
    margin-top: 20rpx;
    .meal {
      margin-bottom: 20rpx;
      background-color: white;
      .mealTitle {
        height: 120rpx;
        padding-left: 32rpx;
        font-size: 38rpx;
        color: #333;
        border-bottom: 2rpx solid #ebebeb;
        &:before {
          content: '';
          display: block;
          background-color: #0ed2b1;
          height: 28rpx;
          width: 6rpx;
          margin-right: 32rpx;
        }
      }
      .noMeal {
        height: 160rpx;
        line-height: 160rpx;
        text-align: center;
        font-size: 32rpx;
        color: #999;
      }
      .mealCell {
        padding: 30rpx;
        padding-left: 68rpx;
        border-bottom: 2rpx solid #f6f6f6;
        &:last-child {
          border-bottom: none;
        }
        .mealImg {
          height: 120rpx;
          width: 120rpx;
          border: 2rpx solid #999;
          overflow: hidden;
          margin-right: 30rpx;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .mealInfo {
          width: 80%;
          .mealName {
            font-size:28rpx;
            color: #666;
            margin-bottom: 10rpx;
          }
          .mealDesc {
            font-size: 24rpx;
            margin-bottom: 10rpx;
            line-height: 1.3;
            color: #999;
          }
          .mealPrice {
            width: 100%;
            span {
              &:first-child {
                font-size: 24rpx;
                color: #999;
              }
              &:last-child {
                font-size: 32rpx;
                color: #ffaa00;
              }
            }
          }
        }

        .mealOperation {
          width: 168rpx;
          height: 120rpx;
        }
        .ordered {
          color: #0ed2b1;
        }
        .soldOut {
          color: #dd4432;
        }
        .overdue {
          color: #666;
        }
        .mealNum {
          .subBtn {
            height:44rpx;
            width: 44rpx;
            color: #333;
            font-size: 24rpx;
            text-align: center;
            line-height: 36rpx;
          }
          .addBtn {
            height: 44rpx;
            width: 44rpx;
            color: #333;
            font-size: 24rpx;
            text-align: center;
            line-height: 36rpx;
          }
          .noSub {
            color: #ddd;
          }
          .count {
            color: #666;
            font-size: 24rpx;
            border:2rpx solid #ddd;
            height: 44rpx;
            width: 60rpx;
            line-height: 40rpx;
            text-align: center;
          }
        }
      }
    }
  }

  .nutritiveBox {
    margin: 32rpx;
    padding: 30rpx;
    -webkit-border-radius: 8rpx;
    -moz-border-radius: 8rpx;
    border-radius: 8rpx;
    background-color: white;
    .boxTitle {
      font-size: 32rpx;
      color: #333;
      font-weight: bold;
      margin-bottom:40rpx;
    }
  }

  .progressBox {
    margin: 0 30rpx;
    margin-bottom: 24rpx;
    .progressCell {
      margin-bottom: 30rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .progressTitle {
        margin-bottom: 20rpx;
        .progressTitleText {
          font-size: 26rpx;
          color: #999;
          span {
            font-size: 26rpx;
            color: #333;
          }
        }
        .progressNote {
          font-size: 26rpx;
          color: #dd4432;
        }
      }
      .progressBar {
        width: 100%;
        height: 12rpx;
        border-radius:22rpx;
        background-color: #f4f4f4;
        position: relative;
        overflow: hidden;
        .progressBarInner {
          height: 100%;
          width: 0;
          border-radius: 12rpx;
          background-color: #00d1ae;
          position: absolute;
          left: 0;
          top: 0;
        }
        .progressBarInner_full {
          background-color: #dd4432;
        }
      }
    }
  }
</style>
