<template>
  <div class="products flexColCenterRowCenter">
    <scroll-view scroll-y class="mealBox">
      <div class="preference">
        <div class="preferenceTitle">口味偏好</div>
        <div class="preferenceContent flexRowCenterColCenter">
          <div class="preferenceCell">
            <div class="preferenceTag" :class="{preferenceTag_this:preference.rice == 0}"
                 @click="changePrefrence('rice',0)">杂粮饭
            </div>
            <div class="preferenceTag" :class="{preferenceTag_this:preference.rice == 1}"
                 @click="changePrefrence('rice',1)">白米饭
            </div>
          </div>
          <div class="preferenceCell">
            <div class="preferenceTag" :class="{preferenceTag_this:preference.spicy == 0}"
                 @click="changePrefrence('spicy',0)">不吃辣
            </div>
            <div class="preferenceTag" :class="{preferenceTag_this:preference.spicy == 1}"
                 @click="changePrefrence('spicy',1)">吃辣
            </div>
          </div>
          <div class="preferenceCell">
            <div class="preferenceTag" :class="{preferenceTag_this:preference.egg == 0}"
                 @click="changePrefrence('egg',0)">能吃鸡蛋
            </div>
            <div class="preferenceTag" :class="{preferenceTag_this:preference.egg == 1}"
                 @click="changePrefrence('egg',1)">不吃鸡蛋
            </div>
          </div>
        </div>
      </div>
      <div class="mealBlock" v-for="(someDay,n) in meals" :key="n">
        <div class="someDayTitle flexRowBetweenColCenter">
          <div class="checkMeal">
            <checkbox-group class="flexRowStartColCenter" v-if="meals[n].overdue == false && meals[n].ordered == false" @change="checkSomeDay(n,$event)">
              <input type="checkbox"  :checked="radioArr[n]" value="n">
              <div class="radioChecked"></div>
            </checkbox-group>
          </div>
          <div class="flexItem110">{{someDay.date.month}}月{{someDay.date.day}}日 {{someDay.date.week}}</div>
          <div @click="gotoSomeDay(n)">{{!meals[n].overdue && someDay.count > 0? "查看详情 >":"暂不提供" }}</div>
        </div>
        <div class="someDayContent">
          <div class="someDayMeal" v-for="(cell,i) in someDay.meal" :key="i">
            <div v-for="(item,m) in cell" :key="m" class="mealCell flexRowBetweenColStart" v-if="item"
                 :style="{opacity:item.overdue?0.3:1}">
              <div class="mealImg flexItem000">
                <img
                  :src="'https://mall.postop.cn/postopmall-core/download/'+item.mealImg">
              </div>
              <div class="mealInfo flexItem110 flexColStartRowStart">
                <div class="mealName textLineClamp1">{{item.mealName}}</div>
                <div class="mealDesc flexRowStartColStart">致敏信息：{{item.description ? item.description : '无'}}</div>
                <div class="mealPrice flexRowBetweenColCenter">
                  <span>{{i==0?"早餐":i==1?"午餐":i==2?"晚餐":""}}</span>
                  <span>￥{{item.mealPrice}}</span>
                </div>
              </div>
              <div class="mealOperation flexItem000 flexRowEndColCenter">
                <div v-if="item.ordered" class="ordered flexItem000">已订</div>
                <div v-else-if="item.overdue" class="overdue flexItem000">已过时</div>
                <div v-else-if="item.soldOut" class="soldOut flexItem000">售罄</div>
                <div class="mealNum flexRowEndColCenter" v-else>
                  <div class="subBtn" :class="{noSub:item.count==0}" @click="sub(n,i,m)">-
                  </div>
                  <div class="count">{{item.count}}
                  </div>
                  <div class="addBtn" :class="{noSub:item.count>=1}" @click="add(n,i,m)">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <div class="bottomBox flexRowEndColCenter" v-if="bottomBoxShow">
      <!--<label class="flexRowStartColCenter">-->
      <!--<input type="checkbox" @change="checkAll"-->
      <!--:checked="selectedAll">-->
      <!--<div class="radioChecked"></div>-->
      <!--<div class="radioText">全选</div>-->
      <!--</label>-->
      <div class="settleBtn flexRowCenterColCenter" :class="{canSettle:canSettle}" @click="gotoSettle"><span
        class="totalPrice">￥{{totalPrice}}</span>结算
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: "products",
    data() {
      return {
        text: {},
        date: [],
        checkedIndex: 0,
        todayIndex: 0,
        meals: null,
        nowMealIndex: 0,
        canSettle: false,  //是否可以点击"去结算"
        totalPrice: 0,
        selectedAll: false,
        orderList: [],  //用于存放用户选择的商品
        timestamp: null,
        dayNum: 11,
        defaultCheck:7,
        radioArr: [],
        mealSource: new Array(31),
        bottomBoxShow: false,
        preference: {
          rice: 0,   // 0 杂粮饭   1 白米饭
          spicy: 0,   // 0 不吃辣   1 吃辣
          egg: 0   // 0 吃鸡蛋   1 不吃鸡蛋
        },
        mealNum:1  //每餐最多显示1个饭
      }
    },
    computed: {
      ...mapState({
        userInfo: state =>state.user.userInfo,
        qrCodeInfo: state => {return {}},
        mealList: state => {return []},
        orderReload: state => true,
        selectedArr: state => {return []},
        isCashPayWx: state => false,
      })
    },
    onLoad(){
      this.radioArr = this.selectedArr
      if (this.orderReload) {
        var productId = this.qrCodeInfo.productCategory
        productId = "74tVjyKqb"
        Promise.all([
          this.getProducts({data:{productId: productId}}),
          this.getOrderListByDate({data: {
              unionId: "oncDLvgQ_fjM8DLrBIbGCHhaa9fQ", //this.userInfo.unionId,oncDLvrZIZnNyS0pUsrMeHn11NOE
              beginDate: this.getTime(0).date,
              endDate: this.getTime(this.dayNum - 1).date
            }
          })
        ]).then((result) => {
          // console.log(result)
          this.date = [this.getTime(0), this.getTime(1), this.getTime(2), this.getTime(3), this.getTime(4), this.getTime(5), this.getTime(6)]
          this.dataFormat(result)
        }).catch((error) => {

        })
      } else {
        this.meals = this.mealList
        for (var item of this.radioArr) {
          if (item == false) {
            this.selectedAll = false
            break
          } else {
            this.selectedAll = true
          }
        }
        this.calculateTotal()
      }
      this.$store.commit('mall/SetOrderReload', true)
    },
    watch: {
      "meals": function () {
        this.$nextTick(() => {
          //alert(1)
          this.bottomBoxShow = true
        })
      }
    },
    methods: {
      ...mapActions({
        getProducts: 'mall/getProducts',
        getOrderListByDate: 'mall/getOrderListByDate',
        getFoodInfo: 'mall/getFoodInfo',
      }),
      getFoodInfo2(foods) {
        var foodIdList = []
        for (var i = 0; i < foods.length; i++) {
          for (var m = 0; m < foods[i].meal.length; m++) {
            for (var n = 0; n < foods[i].meal[m].length; n++) {
              if (foods[i].meal[m][n].remark) foodIdList.push(foods[i].meal[m][n].remark)
            }
          }
        }
        if (foodIdList.length > 0) {
          this.getFoodInfo({data:{ids: foodIdList.join(",")}}).then(res => {
                // console.log(res.data)
            var resData = res.data || []
            for (var e = 0; e < resData.length; e++) {
              for (var i = 0; i < foods.length; i++) {
                for (var m = 0; m < foods[i].meal.length; m++) {
                  for (var n = 0; n < foods[i].meal[m].length; n++) {
                    if (foods[i].meal[m][n].remark == resData[e].id) {
                      var s = 0
                      switch (this.getSpec(m)) {
                        case 'A':
                          s = 0;
                          break
                        case 'B':
                          s = 1;
                          break
                        case 'C':
                          s = 2;
                          break
                      }
                      foods[i].meal[m][n].description = resData[e].description
                      for (var f = 0; f < resData[e].compositions.length; f++) {
                        if (resData[e].compositions[f].name == "热量") {
                          foods[i].meal[m][n].compositions.energy = Math.round(resData[e].compositions[f].value * resData[e].units[s].equalGram / 100)
                        } else if (resData[e].compositions[f].name == "蛋白质") {
                          foods[i].meal[m][n].compositions.protien = Math.round(resData[e].compositions[f].value * resData[e].units[s].equalGram / 100)
                        }
                      }
                    }
                  }
                }
              }
            }
            this.meals = foods
            this.$store.commit('mall/SetOrder', foods)
          })
        } else {
          this.meals = foods
          this.$store.commit('mall/SetOrder', foods)
        }
      },
      isOverdue(x, y) {
        if (x == 0) {   //今天的餐，标识为已过订餐时间
          return true
        } else if (x == 1) {
          var hour = this.getTime(x).hour
          //return false
          if (y == 0) {
            if (hour < 15) {   //下午三点后不可以订第二天的早餐
              return false
            } else {
              return true
            }
          } else {
            if (hour < 18) {   //下午六点后不可以订第二天的午餐和晚餐
              return false
            } else {
              return true
            }
          }
        } else {
          return false
        }
      },
      dataFormat(arr) {
        try {
          var productSort = this.productSort(JSON.parse(arr[0].data).data)
          //var productSort = this.productSort([])
          var products = []
          for (var c = 0; c < this.dayNum; c++) {
            var index = this.getTime(c).day - 1
            products.push(productSort[index])
          }
          for (var c = 0; c < products.length; c++) {
            if(!products[c]) continue
            for (var d = 0; d < products[c].length; d++) {
              if(!products[c][d]) continue
              for (var e = 0; e < products[c][d].length; e++) {
                products[c][d][e].overdue = this.isOverdue(c, d)
              }
            }
          }
          var orders = []
          if (this.isCashPayWx != true) {
            orders = JSON.parse(arr[1].data) || []
          }

          //初始化meals
          var mealsModel = new Array(this.dayNum)
          this.radioArr = new Array(this.dayNum)
          for (var n = 0; n < mealsModel.length; n++) {
            mealsModel[n] = {
              meal: products[n] || [],
              date: this.getTime(n),
              count: 0,
              overdue: true, //是否已经全部过期
              ordered:true,  //是否已经全部购买
            }
            this.radioArr[n] = false
          }
          //this.$store.commit('mall/SetSelectedArr', this.radioArr)
          for (var n = 0; n < orders.length; n++) {
            if (!orders[n]) break
            var nutritiouMealsJson = JSON.parse(orders[n].buyerNote).nutritiouMeals
            for (var m = 0; m < nutritiouMealsJson.product.length; m++) {
              var mealsModelIndex = 0;
              for (var p = 0; p < mealsModel.length; p++) {
                if (nutritiouMealsJson.date[m] == mealsModel[p].date.date) {
                  mealsModelIndex = p
                  break
                }
                mealsModelIndex = -1
              }
              if (mealsModelIndex == -1) continue
              var typeIndex = nutritiouMealsJson.typeIndex[m]   // 0 1 2
              var orderStatus = false
              switch (orders[n].status) {
                case "PENDING_PAYMENT":  //待付款
                  orderStatus = false;
                  break

                case "READY_TO_SHIP":  //待发货
                  orderStatus = true;
                  break

                case "SHIPPED":  //待收货
                  orderStatus = true;
                  break

                case "RECEIPTED":  //已收货
                  orderStatus = false;
                  break

                case "CANCELLED":  //已撤单
                  orderStatus = false;
                  break

                case "PAYMENT_TIMEOUT":  //付款逾期
                  orderStatus = false;
                  break

                case "REFUNDED":  //已退款
                  orderStatus = false;
                  break

                case "PENDING_REFUND":  //待退款
                  orderStatus = false;
                  break
              }
              var sameHospital = false
              if (nutritiouMealsJson.qrCodeId && this.qrCodeInfo.qrCodeId) {
                if (nutritiouMealsJson.qrCodeId.substring(0, 5) == this.qrCodeInfo.qrCodeId.substring(0, 5)) {
                  sameHospital = true
                } else {
                  sameHospital = false
                }
              }
              if (orderStatus == true && sameHospital) {
                if (mealsModel[mealsModelIndex].meal[typeIndex].length == 0) {
                  mealsModel[mealsModelIndex].meal[typeIndex].push({
                    mealName: orders[n].items[m].name,
                    mealImg: orders[n].items[m].picture,
                    mealPrice: orders[n].items[m].price,
                    mealId: orders[n].items[m].productSpec.id,
                    ordered: orderStatus,
                    overdue: (mealsModelIndex == 0 ? true : false),
                    date: nutritiouMealsJson.date[m],
                    count: nutritiouMealsJson.quantity[m],
                    remark: orders[n].items[m].remark,
                    description: orders[n].items[m].description,
                    compositions: {}
                  })
                } else {
                  for (var z = 0; z < mealsModel[mealsModelIndex].meal[typeIndex].length; z++) {
                    var name = orders[n].items[m].productSpec.Label
                    mealsModel[mealsModelIndex].meal[typeIndex][z].mealName = orders[n].items[m].name;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].mealImg = orders[n].items[m].picture;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].mealPrice = orders[n].items[m].price;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].mealId = orders[n].items[m].productSpec.id;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].ordered = orderStatus;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].overdue = (mealsModelIndex == 0 ? true : mealsModel[mealsModelIndex].meal[typeIndex][z].overdue);
                    mealsModel[mealsModelIndex].meal[typeIndex][z].soldOut;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].selected;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].date = nutritiouMealsJson.date[m];
                    mealsModel[mealsModelIndex].meal[typeIndex][z].count = nutritiouMealsJson.quantity[m];
                    mealsModel[mealsModelIndex].meal[typeIndex][z].remark = orders[n].items[m].remark;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].description = orders[n].items[m].description;
                    mealsModel[mealsModelIndex].meal[typeIndex][z].compositions = {};
                  }
                }
              }
            }
          }

          var hasOrdered = false
          for (var n = 0; n < mealsModel.length; n++) {
            for (var m = 0; m < mealsModel[n].meal.length; m++) {
              for (var x = 0; x < mealsModel[n].meal[m].length; x++) {
                if (mealsModel[n].meal[m][x].overdue == false) {
                  mealsModel[n].overdue = false
                }
                if (mealsModel[n].meal[m][x].ordered == false) {
                  mealsModel[n].ordered = false
                }else{
                  hasOrdered = true
                }
                mealsModel[n].count += 1
              }
            }
          }

          // 是否已有订单
          if(hasOrdered == false){
            var defaultCheckBegin = 0
            for (var n = 0; n < mealsModel.length; n++) {
              if(mealsModel[n].overdue == true && defaultCheckBegin == 0){
                defaultCheckBegin = n + 1
                continue
              }else{
                for (var m = 0; m < mealsModel[n].meal.length; m++) {
                  for (var x = 0; x < mealsModel[n].meal[m].length; x++) {
                    if (n >= defaultCheckBegin && n < defaultCheckBegin + this.defaultCheck) {
                      mealsModel[n].meal[m][x].selected = true
                      mealsModel[n].meal[m][x].count = 1
                    }
                  }
                  if (n >= defaultCheckBegin && n < defaultCheckBegin + this.defaultCheck) {
                    this.radioArr[n] = true
                  }
                }
              }
            }
            //this.$store.commit('mall/SetSelectedArr', this.radioArr)
            this.meals = mealsModel
            this.calculateTotal()
          }
          this.getFoodInfo2(mealsModel)
        } catch (e) {
          console.error(e)
        }
      },
      productSort(products) {
        var mealSource = new Array(31)
        for (var i = 0; i < mealSource.length; i++) {
          mealSource[i] = new Array(3)
          for (var c = 0; c < mealSource[i].length; c++) {
            mealSource[i][c] = []
          }
        }
        for (var n = 0; n < products.length; n++) {
          for (var m = 0; m < products[n].values.length; m++) {
            var indexArray = products[n].values[m].name.split("-")
            if (indexArray.length == 2) {
              //---------------该代码段是为了过滤重复的餐----------------
              var continueFlag = false
              if (mealSource[parseInt(indexArray[0]) - 1][parseInt(indexArray[1])]) {
                for (var c of mealSource[parseInt(indexArray[0]) - 1][parseInt(indexArray[1])]) {
                  if (c.mealName == products[n].name.replace(/[0-9]/ig, "") && c.typeIndex == parseInt(indexArray[1])) {
                    continueFlag = true
                    break
                  }
                }
              }
              if (continueFlag == true) continue
              //-------------------------------
              mealSource[parseInt(indexArray[0]) - 1][parseInt(indexArray[1])].push({
                mealName: products[n].name.replace(/[0-9]/ig, ""),  // 去掉后端返回单位名称中的数字,
                mealImg: products[n].picture,
                mealPrice: products[n].price,
                mealId: products[n].id,
                typeIndex: parseInt(indexArray[1]), // 0 1 2
                ordered: false,  //是否已经购买过
                soldOut: (products[n].stocks && products[n].stocks > 0) ? false : true,  //是否售罄
                overdue: false, //是否过了订餐时间
                selected: false, //是否是新选中的，如果ordered为false且selected为true则表示是用户此次操作新选中的商品
                dayNum: parseInt(indexArray[0]),
                count: 0,  //选中数量
                remark: products[n].remark,
                description: "",
                compositions: {}
              })
            }
          }
        }
        return mealSource
      },
      getTime(n) {
        var day = new Date()
        //var day = new Date();
        day.setTime(day.getTime() + n * 24 * 60 * 60 * 1000);
        var s = day.getFullYear() + "-" + (day.getMonth() + 1 > 9 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1)) + "-" + (day.getDate() > 9 ? day.getDate() : "0" + day.getDate());
        var week = null
        var hour = day.getHours();
        switch (day.getDay()) {
          case 0:
            week = "周日";
            break;
          case 1:
            week = "周一";
            break;
          case 2:
            week = "周二";
            break;
          case 3:
            week = "周三";
            break;
          case 4:
            week = "周四";
            break;
          case 5:
            week = "周五";
            break;
          case 6:
            week = "周六";
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
        if (this.todayIndex <= n && n <= this.todayIndex + this.dayNum) {
          this.checkedIndex = n
          this.nowMealIndex = n - this.todayIndex
        } else {
          // this.DG.toast("暂时只支持预定" + this.dayNum + "天的营养餐")
          wx.showToast({
            title: '暂时只支持预定+ this.dayNum + "天的营养餐',
            icon: 'none',
            duration: 2000
          })
        }
      },
      sub(x, y, z) {
        // console.log(this.meals[x])
        if (this.meals[x].meal[y][z].count > 0) {
          this.meals[x].meal[y][z].count--
          this.meals[x].meal[y][z].selected = false
          this.calculateTotal()
          this.radioArr[x] = false
          this.$store.commit('mall/SetSelectedArr', this.radioArr)
        }
      },
      add(x, y, z) {
        if (this.meals[x].meal[y][z].count < 1) {
          this.meals[x].meal[y][z].count++
          this.meals[x].meal[y][z].selected = true
          this.calculateTotal()
          for (var n = 0; n < this.meals[x].meal.length; n++) {
            for (var m = 0; m < this.meals[x].meal[n].length; m++) {
              if (this.meals[x].meal[n][m].selected == false) {
                this.radioArr[x] = false
                return
              }
            }
          }
          this.radioArr[x] = true
          this.$store.commit('mall/SetSelectedArr', this.radioArr)
        }
      },
      checkAll(e) {
        this.canSettle = e.target.checked
        this.selectedAll = !this.selectedAll
        if (this.canSettle) {
          var totalPrice = 0
          for (var x = 0; x < this.meals.length; x++) {
            this.radioArr[x] = true
            for (var y = 0; y < this.meals[x].meal.length; y++) {
              for (var z = 0; z < this.meals[x].meal[y].length; z++) {
                if (!this.meals[x].meal[y][z].ordered && !this.meals[x].meal[y][z].overdue && !this.meals[x].meal[y][z].soldOut) {
                  this.meals[x].meal[y][z].selected = true
                  this.meals[x].meal[y][z].count = 1
                }
              }
            }
          }
        } else {
          for (var x = 0; x < this.meals.length; x++) {
            this.radioArr[x] = false
            for (var y = 0; y < this.meals[x].meal.length; y++) {
              for (var z = 0; z < this.meals[x].meal[y].length; z++) {
                if (!this.meals[x].meal[y][z].ordered && !this.meals[x].meal[y][z].overdue && !this.meals[x].meal[y][z].soldOut) {
                  this.meals[x].meal[y][z].selected = false
                  this.meals[x].meal[y][z].count = 0
                }
              }
            }
          }
        }
        this.$store.commit('mall/SetSelectedArr', this.radioArr)
        this.calculateTotal()
        this.checkedDate(this.checkedIndex)
      },
      calculateTotal() {
        var orderList = []
        var totalPrice = 0
        for (var x = 0; x < this.meals.length; x++) {
          for (var y = 0; y < this.meals[x].meal.length; y++) {
            for (var z = 0; z < this.meals[x].meal[y].length; z++) {
              if (!this.meals[x].meal[y][z].ordered && this.meals[x].meal[y][z].selected && !this.meals[x].meal[y][z].overdue && !this.meals[x].meal[y][z].soldOut) {
                totalPrice = (totalPrice * 100 + parseFloat(this.meals[x].meal[y][z].mealPrice) * 100) / 100
                orderList.push({
                  ...this.meals[x].meal[y][z],
                  date: this.meals[x].date.date
                })
              }
            }
          }
        }
        if (orderList.length > 0) this.canSettle = true
        else this.canSettle = false
        this.totalPrice = totalPrice
        this.orderList = orderList
      },
      gotoSettle() {
        try {
          if (this.canSettle) {
            //var url = config.mallUrl + "?"
            var product = []
            var quantity = []
            // console.log(this.userInfo)
            var buyerNote = {    //该数据格式用于后端检测不允许改变
              nutritiouMeals: {
                date: [],
                typeIndex: [],  //0、1、2  ,  分别表示"早餐"  "午餐"  "晚餐"
                product: product,
                quantity: quantity,
                address: this.qrCodeInfo,
                // userId: this.$store.state.login.userInfo.id,
                // openId: this.$store.state.login.userInfo.openId,   //openId要在管理系统中用来获取测评信息
                // unionId: this.$store.state.login.userInfo.unionId,
                // userName: this.$store.state.login.userInfo.username,
                userId: this.userInfo.id,
                openId: this.userInfo.openId,   //openId要在管理系统中用来获取测评信息
                unionId: this.userInfo.unionId,
                userName: this.userInfo.username,
                spec: [],  //A、B、C
                qrCodeId: this.qrCodeInfo.qrCodeId,
                preference: this.preference
              }
            }
            // var energy = this.userInfo.energy
            for (var x = 0; x < this.orderList.length; x++) {
              product.push(this.orderList[x].mealId)
              quantity.push(1)  //this.orderList[x].count
              buyerNote.nutritiouMeals.date.push(this.orderList[x].date)
              buyerNote.nutritiouMeals.typeIndex.push(this.orderList[x].typeIndex)
              var s = this.getSpec(this.orderList[x].typeIndex)
              buyerNote.nutritiouMeals.spec.push(s)
            }

            // var address = ""
            // if (this.DG.getLength(this.qrCodeInfo) > 0 && this.qrCodeInfo.hospital) {
            //   address = "" + this.qrCodeInfo.address + this.qrCodeInfo.hospital + this.qrCodeInfo.department + (this.userInfo.bedNumber == "000" ? "" : this.userInfo.bedNumber + "床") + "&province=" + this.qrCodeInfo.province + "&city=" + this.qrCodeInfo.city + "&district=" + this.qrCodeInfo.district
            // } else {
            //   address = ""
            // }

            //var username = this.$store.state.login.userInfo.username
            //if (username && username.length > 10) username = ""
            //url = url + "product=" + product.join(",") + "&quantity=" + quantity.join(",") + "&address=" + encodeURI(address) + "&buyerNote=" + encodeURIComponent(JSON.stringify(buyerNote)) + "&username=" + encodeURI(username) + "&cash=" + this.isCashPayWx

            this.$store.commit('mall/SetCheckedOrder', {
              orderList: this.orderList,
              buyerNote: buyerNote,
              meals: this.meals
            })
            // this.$router.push({path: "/orderSubmit"})
            wx.navigateTo({
              url: '/pages/orderSubmit/main'
            })
          }
        } catch (e) {
          // this.DG.toast("error:" + JSON.stringify(e))
          wx.showToast({
            title: "error:" + JSON.stringify(e),
            icon: 'none',
            duration: 2000
          })
        }
      },
      checkSomeDay(n, e) {
        // console.log(n,e)s
        if (e.target.value==0) {
          this.selectedAll = false
          this.radioArr[n] = false
        } else {
          this.radioArr[n] = true
        }
        for (var x = 0; x < this.meals[n].meal.length; x++) {
          for (var y = 0; y < this.meals[n].meal[x].length; y++) {
            if (e.target.value==0) {
              this.meals[n].meal[x][y].count = 0
              this.meals[n].meal[x][y].selected = false
            } else {
              this.meals[n].meal[x][y].count = 1
              this.meals[n].meal[x][y].selected = true
            }
          }
        }
        this.$store.commit('mall/SetSelectedArr', this.radioArr)

        this.calculateTotal()
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
      },
      gotoSomeDay(n) {
        // if (this.meals[n].count > 0) this.$router.push({path: "/someDayOrder", query: {index: n}})
        if (this.meals[n].count > 0)
          wx.navigateTo({
            url: '/pages/someDayOrder/main?index='+n
          })
      },
      changePrefrence(key, val) {
        this.preference[key] = val
      }
    }
  }
</script>

<style scoped lang="scss">
  .products{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #f6f6f6;
    .mealBox {
      height: calc(100% - 100rpx);
      width: 100%;
      .mealBlock {
        background-color: white;
        margin-bottom: 20rpx;
        padding: 0 30rpx;
        .someDayTitle {
          height: 120rpx;
          border-bottom: 2rpx solid #ebebeb;
          .checkMeal {
            margin-right: 20rpx;
          }
          div {
            &:nth-child(2) {
              font-size: 36rpx;
              font-weight: bold;
              color: #333;
            }
            &:nth-child(3) {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
        .someDayContent {
          .someDayMeal{
            .mealCell {
              padding: 30rpx;
              padding-left: 68rpx;
              padding-right: 0;
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
                  font-size: 28rpx;
                  color: #666;
                  margin-bottom: 20rpx;
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
                  height: 44rpx;
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
                  border: 2rpx solid #ddd;
                  height: 44rpx;
                  width: 60rpx;
                  line-height: 40rpx;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .preference {
        padding: 30rpx;
        background-color: white;
        margin-bottom: 20rpx;
        .preferenceTitle {
          font-size: 36rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 30rpx;
        }
        .preferenceContent {
          .preferenceCell {
            margin: 0 16rpx;
            .preferenceTag {
              height: 60rpx;
              width: 180rpx;
              border-radius: 30rpx;
              text-align: center;
              line-height: 56rpx;
              border: 2rpx solid #999;
              background-color: white;
              color: #999;
              font-size: 24rpx;
              &:first-child {
                margin-bottom: 20rpx;
              }
            }
            .preferenceTag_this {
              border: 2rpx solid #00D0AA;
              background-color: #00D0AA;
              color: white;
            }
          }
        }
      }
    }

    .bottomBox {
      height: 100rpx;
      background-color: white;
      width: 100%;
      padding-left: 20rpx;
      label {
        .radioText {
          font-size: 26rpx;
          color: #666;
          margin-left: 14rpx;
        }
      }
      .settleBtn {
        height: 100%;
        width: 260rpx;
        font-size: 28rpx;
        color: white;
        background-color: #ccc;
        .totalPrice {
          color: white;
          margin-right: 10rpx;
          font-size: 32rpx;
        }
      }
      .canSettle {
        background-color: #0ed2b1;
      }
    }
  }
</style>
