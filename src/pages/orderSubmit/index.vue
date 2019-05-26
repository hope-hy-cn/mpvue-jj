<template>
  <div class="orderSubmit flexColBetweenRowCenter">
    <div class="emptyAddress flexRowBetweenColCenter flexItem000" v-if="addressInfo == null" @click="showAddressBox">
      <div>没有地址信息，请填写</div>
      <div class="icon_more"></div>
    </div>
    <div class="mallAddress flexRowBetweenColCenter flexItem000" v-else @click="showAddressBox">
      <div class="addressInfo flexItem110">
        <div>地址：</div>
        <div class="textLineLimit1">{{addressInfo.hospital}} {{addressInfo.department}} {{addressInfo.bedNumber +
          "床"}}
        </div>
        <div>{{addressInfo.name}} {{addressInfo.mobile}}</div>
      </div>
      <div class="icon_more flexItem000"></div>
    </div>
    <div class="orderTitle flexRowStartColCenter flexItem000">订单详情</div>
    <div class="orderInfo flexItem110 flexRowStartColStart flexWrapRowStartColStart">
      <div v-for="(item,index) in meals" :key="index" class="mealCell" :class="{hasSelected:item.hasSelected}">
        <div class="mealCellDate flexRowBetweenColCenter">
          <div>{{item.date.week}}</div>
          <div>{{item.date.day}}</div>
        </div>
        <div class="noOrder" v-if="!item.hasSelected">{{item.count > 0 ? "未订餐" : "暂不提供"}}</div>
        <div class="orderBox" v-else>
          <div v-for="(meal,i) in item.meal" :key="i">
            <div v-if="meal.length == 0" class="mealInfo">
              <div>{{i == 0 ? "" : "无"}}</div>
            </div>
            <div v-if="n < 1" v-for="(cell,n) in meal" :key="n" class="mealInfo flexRowBetweenColCenter">
              <div>{{cell.mealName}}</div>
              <div class="flexItem000 ordered" v-if="cell.ordered == true">已订</div>
              <div class="flexItem000" v-else-if="cell.count == 0">未订</div>
              <div class="flexItem000 icon_gou" v-else></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomBox flexRowBetweenColCenter card flexItem000">
      <div class="totalPrice">合计：<span>￥{{totalPrice}}</span></div>
      <div class="payBtn flexRowCenterColCenter" :class="{payBtn2:paid}" @click="orderSubmit">
        <div class="btnText">去支付</div>
      </div>
    </div>
    <div class="addressBox" v-if="addressShow">
      <div class="addressBg" @click="closeAddressBox"></div>
      <div class="addressInfo">
        <div class="addressCell flexRowStartColCenter">
          <div class="flexItem000">姓名：</div>
          <input type="text" placeholder="请输入真实姓名" v-model="addressInfo.name">
        </div>
        <div class="addressCell flexRowStartColCenter">
          <div class="flexItem000">医院：</div>
          <div>{{addressInfo.hospital}}</div>
        </div>
        <div class="addressCell flexRowStartColCenter">
          <div class="flexItem000">科室：</div>
          <input type="text" placeholder="请输入您住院的科室" v-model="addressInfo.department">
        </div>
        <div class="addressCell flexRowStartColCenter">
          <div class="flexItem000">床号：</div>
          <input type="text" placeholder="请输入您的床号" v-model="addressInfo.bedNumber">
        </div>
        <div class="addressCell flexRowStartColCenter">
          <div class="flexItem000">住院号：</div>
          <input type="text" placeholder="请输入您的住院号" v-model="addressInfo.hospitalNum">
        </div>
        <div class="addressCell flexRowStartColCenter">
          <div class="flexItem000">手机号码：</div>
          <input type="number" placeholder="请输入您的手机号码" v-model="addressInfo.mobile">
        </div>
        <div class="addressBtn" @click="changeAddress">提 交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
  import {deepClone, formVerifyBlock} from "../../libs/tools"

  export default {
    name: "orderSubmit",
    data() {
      return {
        addressInfo: {},
        addressInfoOrigin: {},
        totalPrice: 0,
        addressShow: false,
        hasChange: false,
        paid: false,
        isDiff: false
      }
    },
    computed: {
      ...mapState({
        orderList: state => state.mall.checkedOrder.orderList,
        buyerNote:state => state.mall.checkedOrder.buyerNote,
        meals: state => state.mall.checkedOrder.meals,
        isCashPayWx: state => {
          return false
        },
        userInfo: state => state.user.userInfo,
        qrCodeInfo: state => {
          return {}
        },
        mallAccountInfo: state => {
          return state.mall.mallAccountInfo
        },
      }),
      ...mapGetters({
        orderAddress: "mall/orderAddress",
        userInfo:"user/userInfo"
      })
    },
    onLoad() {
      //this.$store.commit('login/changeIsCashPay',false)
      // console.log(this.orderList,this.buyerNote,this.meals)

      if (this.orderList.length == 0) this.paid = true
      if (this.meals.length == 7) this.meals.splice(0, 1)
      for (var item of this.meals) {
        for (var meal of item.meal) {
          for (var cell of meal) {
            if (cell.selected || cell.ordered) {
              item.hasSelected = true
              break
            }
          }
        }
      }
      // console.log(this.orderList)
      for (var item of this.orderList) {
        var dateArr = item.date.split("-")
        item.mealDate = parseInt(dateArr[1]) + "." + parseInt(dateArr[2])
        switch (item.typeIndex) {
          case 0:
            item.mealType = "早餐";
            break
          case 1:
            item.mealType = "午餐";
            break
          case 2:
            item.mealType = "晚餐";
            break
        }
        this.totalPrice = (item.count * (item.mealPrice * 100) + this.totalPrice * 100) / 100
      }
      // console.log("总价"+this.totalPrice)

      this.mallLogin({
        data: {
          unionid: "oncDLvrZIZnNyS0pUsrMeHn11NOE", //this.userInfo.unionId,
          nickname: "王晨煚"//this.userInfo.nickName
        },
      }).then(res => {
        this.getMallAddress({
          data: {
            customerId: this.mallAccountInfo.id
          }
        }).then(res => {
          // console.log(res)
          //this.$store.commit('order/SetOrderAddress', this.$store.state.qrCodeInfo)
          //this.$store.commit('login/changeIsCashPay',false)
          var address = this.orderAddress.address + this.orderAddress.hospital + this.orderAddress.department + this.orderAddress.bedNumber + "床"
          this.addressInfo = (this.isCashPayWx == true ? {} : res)
          this.addressInfo.zip = "610000"
          if (this.isCashPayWx == true || res.address != address || res.name != this.orderAddress.name) {
            if (this.isCashPayWx == true || !this.addressInfo.province) {
              this.addressInfo.province = this.qrCodeInfo.province
              this.addressInfo.city = this.qrCodeInfo.city
              this.addressInfo.district = this.qrCodeInfo.district
            }
            this.addressShow = true
            this.addressInfo.name = this.orderAddress.name
            this.addressInfo.hospital = this.orderAddress.hospital
            this.addressInfo.department = this.orderAddress.department
            this.addressInfo.bedNumber = this.orderAddress.bedNumber
            this.addressInfo.hospitalNum = this.orderAddress.hospitalNum
            this.addressInfo.mobile = (this.isCashPayWx == true ? "" : this.addressInfo.mobile)

            this.addressInfo.address = address
            this.isDiff = true
          } else {
            this.addressInfo.bedNumber = this.orderAddress.bedNumber
            this.addressInfo.hospital = this.orderAddress.hospital
            this.addressInfo.department = this.orderAddress.department
            this.addressInfo.hospitalNum = this.orderAddress.hospitalNum

            this.addressInfoOrigin = deepClone(this.addressInfo)
          }
        }, err => {
          wx.showToast({
            title: JSON.stringify(err),
            icon: "none",
            duration: 2000
          })
        })
      }, err => {
        // this.$store.state.DG.toast("商城登录失败")
        wx.showToast({
          title: '商城登陆失败',
          icon: 'none',
          duration: 2000
        })
      })
    },

    methods: {
      ...mapActions({
        mallLogin: 'mall/mallLogin',
        getMallAddress: 'mall/getMallAddress',
        createOrder: 'mall/createOrder',
        updateAddress: 'mall/updateAddress',
        insertAddress: 'mall/insertAddress',
        getPayParams:'mall/getPayParams'
      }),

      setAddressData() {
        this.hasChange = true
        this.addressInfo.address = this.orderAddress.address + this.addressInfo.hospital + this.addressInfo.department + this.addressInfo.bedNumber + "床"
        this.$store.commit('mall/SetBuyerNoteAddress', {
          ...this.buyerNote.nutritiouMeals.address,
          hospital: this.addressInfo.hospital,
          department: this.addressInfo.department,
          bedNumber: this.addressInfo.bedNumber
        })
      },
      orderSubmit() {

        if (this.paid == true) return
        var canSettle = this.canSettle()

        if (canSettle) {
          this.createOrder({
            data: {
              consigneeId: this.addressInfo.id,
              productIds: this.buyerNote.nutritiouMeals.product.join(","),
              quantities: this.buyerNote.nutritiouMeals.quantity.join(","),
              buyerNote: JSON.stringify(this.buyerNote)
            }
          }).then(res => {
            var data = JSON.parse(res.data).data[0]
            // console.log(data)
            if (data.paymentType == "CASH") {   // 如果是现金账号则会有paymentType字段，否则没有该字段
              this.paid = true
              wx.showToast({
                title: "下单成功",
                icon: "none",
                duration: 2000
              })
              //this.$store.commit('mall/SetCheckedOrder', {})
              // this.$router.replace({path: "/home"})

            } else {
              this.paid = true
              var orderId = data.id
              var fee = data.payment * 100
              // this.$store.commit('mall/SetCheckedOrder', {})
              // wx.miniProgram.redirectTo({url: '../wxPay/wxPay?orderId=' + orderId + '&fee=' + fee});
              this.getPayParams({
                data: {
                  orderId: orderId,
                  amount: fee,
                  // openId: this.userInfo.openId
                  openId:'odnCu4gdHGSCP72IguCLq6DX85N0'
                }
              }).then((res=>{
                // console.log(res.data)
                wx.requestPayment({
                  "timeStamp": res.data.timeStamp,
                  "nonceStr": res.data.nonceStr,
                  "package": res.data.package,
                  "signType": res.data.signType,
                  "paySign": res.data.paySign,
                  success(res) {
                    wx.showToast({
                      title: '支付成功',
                      icon: 'none',
                      duration: 2000
                    })
                    wx.redirectTo({
                      url: '/pages/orders/main'
                    })
                  },
                  fail(res) {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      duration: 2000
                    })
                    // wx.redirectTo({
                    //   url: '/pages/orderSubmit/main'
                    // })
                  }
                })
              }))

            }
          })
        }
      },
      canSettle() {
        //先判断时间
        var nowTime = this.getTime(0)
        var nowYear = nowTime.year
        var nowMonth = nowTime.month
        var nowDay = nowTime.day
        var nowHour = nowTime.hour
        for (var n = 0; n < this.buyerNote.nutritiouMeals.date.length; n++) {
          var item = this.buyerNote.nutritiouMeals.date[n]
          var itemArr = item.split("-")
          var year = parseInt(itemArr[0])
          var month = parseInt(itemArr[1])
          var day = parseInt(itemArr[2])
          if (year < nowYear) {
            wx.showToast({
              title: "部分餐已经过了订餐时间，请重新选择",
              icon: "none",
              duration: 2000
            })
            return false
          } else if (year == nowYear) {
            if (month < nowMonth) {
              wx.showToast({
                title: "部分餐已经过了订餐时间，请重新选择",
                icon: "none",
                duration: 2000
              })
              return false
            } else if (month == nowMonth) {
              if (day < nowDay) {
                wx.showToast({
                  title: "部分餐已经过了订餐时间，请重新选择",
                  icon: "none",
                  duration: 2000
                })
                return false
              } else if (day == nowDay) {
                var typeIndex = this.buyerNote.nutritiouMeals.typeIndex[n]
                if (typeIndex == 0) {
                  if (nowHour < 15) {
                    wx.showToast({
                      title: "部分餐已经过了订餐时间，请重新选择",
                      icon: "none",
                      duration: 2000
                    })
                    return false
                  }
                } else {
                  if (nowHour < 18) {
                    wx.showToast({
                      title: "部分餐已经过了订餐时间，请重新选择",
                      icon: "none",
                      duration: 2000
                    })
                    return false
                  }
                }
              }
            }
          }
        }
        return true
      },
      getTime(n) {
        //var timestamp = new Date().getTime() - this.$store.state.csInterval
        //var timestamp = this.$store.state.csInterval
        var timestamp = new Date().getTime()
        var day = new Date(parseInt(timestamp))
        //var day = new Date();
        day.setTime(day.getTime() + n * 24 * 60 * 60 * 1000);
        var s = day.getFullYear() + "-" + (day.getMonth() + 1 > 9 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1)) + "-" + (day.getDate() > 9 ? day.getDate() : "0" + day.getDate());
        var week = null
        var hour = day.getHours();
        return {
          year: day.getFullYear(),
          month: day.getMonth() + 1,
          day: day.getDate(),
          hour: hour,
          date: s
        }
      },
      showAddressBox() {
        this.addressShow = true
      },
      closeAddressBox() {
        if (this.isDiff == true) {
          // 现金账号或者修改过住院号、床号等，则必须要求修改地址
          wx.showToast({
            title: "请提交收货地址信息",
            icon: "none",
            duration: 2000
          })
        } else if (this.hasChange == true) {
          var that = this
          wx.showModal({
            title: '修改提示',
            content: '是否保存修改后的地址信息?',
            success(res) {
              if (res.confirm) {
                that.changeAddress()
              } else if (res.cancel) {
                that.addressInfo = deepClone(that.addressInfoOrigin)
                that.addressShow = false
                that.hasChange = false
              }
            }
          })
        } else {
          this.addressShow = false
        }
      },
      changeAddress() {
        this.setAddressData()
        var flag = this.addressInputVerify()
        if (flag) {
          if (this.addressInfo.id) {   // 更新收货地址
            this.updateAddress({
              data: {
                id: this.addressInfo.id,
                name: this.addressInfo.name,
                province: this.addressInfo.province,
                city: this.addressInfo.city,
                district: this.addressInfo.district,
                address: this.addressInfo.address,
                zip: this.addressInfo.zip,
                mobile: this.addressInfo.mobile
              }
            }).then(res => {
              // console.log(res)
              if (JSON.parse(res.data).success == false) {
                wx.showToast({
                  title: "提交收货地址失败",
                  icon: "none",
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: "修改收货地址成功",
                  icon: "none",
                  duration: 2000
                })
                this.addressInfoOrigin = deepClone(this.addressInfo)
                this.addressShow = false
                this.hasChange = false
                this.isDiff = false
                this.$store.commit("order/SetOrderAddress", {
                  ...this.$store.state.order.orderAddress,
                  name: this.addressInfo.name,
                  department: this.addressInfo.department,
                  bedNumber: this.addressInfo.bedNumber,
                  hospitalNum: this.addressInfo.hospitalNum,
                  mobile: this.addressInfo.mobile
                })
              }
            }, err => {
              wx.showToast({
                title: "修改收货地址失败",
                icon: "none",
                duration: 2000
              })
            })
          }
          else {
            this.insertAddress({
              data: {
                customerId: this.mallAccountInfo.id,
                name: this.addressInfo.name,
                province: this.addressInfo.province,
                city: this.addressInfo.city,
                district: this.addressInfo.district,
                address: this.addressInfo.address,
                zip: this.addressInfo.zip,
                mobile: this.addressInfo.mobile
              }
            }).then(res => {
              var resJson = JSON.parse(res.data)
              if (resJson.success == false) {
                wx.showToast({
                  title: "创建地址失败",
                  icon: "none",
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: "创建地址成功",
                  icon: "none",
                  duration: 2000
                })
                this.addressInfo.id = resJson.data[0].id
                this.addressInfoOrigin = deepClone(this.addressInfo)
                this.addressShow = false
                this.hasChange = false
                this.isDiff = false
                this.$store.commit("order/SetOrderAddress", {
                  ...this.$store.state.order.orderAddress,
                  name: this.addressInfo.name,
                  department: this.addressInfo.department,
                  bedNumber: this.addressInfo.bedNumber,
                  hospitalNum: this.addressInfo.hospitalNum,
                  mobile: this.addressInfo.mobile
                })
              }
            }, err => {
              wx.showToast({
                title: "创建地址失败",
                icon: "none",
                duration: 2000
              })
            })
          }
        }
      },
      addressInputVerify() {
        var verifyData = []
        for (var item in this.addressInfo) {
          switch (item) {
            case "name":
              verifyData.push({
                value: this.addressInfo[item],
                verify: "notNull,length",
                maxLen: 10,
                minLen: 2,
                verifyErrorMsg: "请正确填写姓名"
              })
              break;
            case "hospital":
              verifyData.push({
                value: this.addressInfo[item],
                verify: "notNull",
                verifyErrorMsg: "请填写医院"
              })
              break;
            case "department":
              verifyData.push({
                value: this.addressInfo[item],
                verify: "notNull",
                verifyErrorMsg: "请填写科室"
              })
              break;
            case "bedNumber":
              verifyData.push({
                value: this.addressInfo[item],
                verify: "notNull",
                verifyErrorMsg: "请填写床号"
              })
              break;
            case "hospitalNum":
              verifyData.push({
                value: this.addressInfo[item],
                verify: "notNull",
                verifyErrorMsg: "请填写住院号"
              })
              break;
            case "mobile":
              verifyData.push({
                value: this.addressInfo[item],
                verify: "notNull,phone",
                verifyErrorMsg: "请正确填写手机号码"
              })
              break;
          }
        }
        return formVerifyBlock(verifyData)
      }
    }
  }
</script>

<style scoped lang="scss">
  .orderSubmit {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #f6f6f6;
    .emptyAddress {
      height: 120rpx;
      width: 100%;
      padding: 30rpx;
      background-color: white;
      div {
        font-size: 28rpx;
        color: #999;
      }
    }
    .mallAddress {
      height: 160rpx;
      width: 100%;
      padding: 0 30rpx;
      background-color: white;
      .addressInfo {
        width: calc(100% - 90rpx);
        div {
          font-size: 28rpx;
          color: #333;
          margin-top: 10rpx;
          &:first-child {
            margin-top: 0;
            color: #999;
          }
        }
      }
    }
    .orderTitle {
      width: 100%;
      margin-top: 20rpx;
      font-size: 40rpx;
      color: #333;
      height: 120rpx;
      padding: 30rpx;
      background-color: white;
      border-bottom: 1px solid #ebebeb;
    }
    .orderInfo {
      height: 100%;
      width: 100%;
      overflow: auto;
      background-color: white;
      padding: 30rpx 14rpx;
      margin-bottom: 20rpx;
      flex-wrap: wrap;
      .mealCell {
        height: 200rpx;
        width: 220rpx;
        border: 1px dashed #ccc;
        overflow: hidden;
        padding: 6rpx 12rpx;
        border-radius: 12rpx;
        margin: 10rpx;
        &.hasSelected {
          background-color: #dffcf7;
          border: 1px solid #dffcf7;
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
          div {
            .mealInfo {
              margin-bottom: 16rpx;
              div {
                height: 26rpx;
                font-size: 24rpx;
                color: #666;
                &:first-child {
                  width: 120rpx;
                  height: 24rpx;
                  overflow:hidden;
                }
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

    .bottomBox {
      height: 100rpx;
      background-color: white;
      width: 100%;
      padding-left: 20rpx;
      .totalPrice {
        font-size: 34rpx;
        color: #999;
        span {
          font-size: 34rpx;
          color: #ffc557;
        }
      }
      .payBtn {
        height: 100%;
        width: 260rpx;
        font-size: 28rpx;
        color: white;
        background-color: #0ed2b1;
        .btnText {
          color: white;
          margin-right: 10rpx;
          font-size: 32rpx;
        }
      }
      .payBtn2 {
        background-color: gray;
      }
    }
    .addressBox {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      .addressBg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }
      .addressInfo {
        position: absolute;
        top: 0;
        width: 100%;
        background-color: white;
        .addressCell {
          height: 100rpx;
          border-bottom: 1px solid #f6f6f6;
          padding: 0 30rpx;
          &:last-child {
            border-bottom: none;
          }
          div {
            font-size: 28rpx;
            width: calc(28rpx * 5);
            color: #333;
            text-align: right;
          }
          input {
            font-size: 28rpx;
            color: #333;
            height: 100%;
            width: 100%;
            border: none;
          }
        }
        .addressBtn {
          height: 50px;
          width: 100%;
          font-size: 14px;
          color: #0ed2b1;
          background-color: white;
          line-height: 50px;
          text-align: center;
        }
      }
    }
  }

  .icon_more {
    height: 30rpx;
    width: 20rpx;
    background-image: url("../../../static/images/ic_more.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
