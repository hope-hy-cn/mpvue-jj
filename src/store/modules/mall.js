import mallApi from '../../api/mall'
import * as types from '../mutation-types'

const state = {
  mallLoginStatus: null,
  getOrderListStatus: null,
  getOrderDetailStatus: null,
  getProductsStatus: null,
  getOrderListByDateStatus: null,
  getMallAddressStatus: null,
  createOrderStatus: null,
  updateAddressStatus: null,
  insertAddressStatus: null,
  getFoodInfoStatus: null,
  getPayParamsStatus:null,
  orderAddress: {
    name:"王晨煚",
    hospital:"成办医院",
    department:"心内科",
    bedNumber:"加9",
    hospitalNum:"9595995",
    address:"洗面桥街XXX号",
  },
  checkedOrder:{},
  selectedArr:{},
  mallAccountInfo:{},
  mealList:null,
  orderReload: true,  //是否重新获取order页面数据

}

const getters = {
  orderAddress: (state, getters, rootState) => {
    return state.orderAddress
  }
}

// actions
const actions = {
  mallLogin({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.MallLogin_In_Doing)
      mallApi.mallLogin(obj).then(res => {
        var mallAccountInfo = JSON.parse(res.data).data[0]
        commit(types.MallLogin_In_Done, mallAccountInfo)
        resolve(res)
      }).catch(err => {
        commit(types.MallLogin_In_Error)
        reject(err)
      })
    })
  },
  getOrderList({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetOrderList_In_Doing)
      mallApi.getOrderList(obj).then(res => {
        commit(types.GetOrderList_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetOrderList_In_Error)
        reject(err)
      })
    })
  },
  getOrderDetail({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetOrderDetail_In_Doing)
      mallApi.getOrderDetail(obj).then(res => {
        commit(types.GetOrderDetail_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetOrderDetail_In_Error)
        reject(err)
      })
    })
  },
  getProducts({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetProducts_In_Doing)
      mallApi.getProducts(obj).then(res => {
        commit(types.GetProducts_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetProducts_In_Error)
        reject(err)
      })
    })
  },
  getOrderListByDate({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetOrderListByDate_In_Doing)
      mallApi.getOrderListByDate(obj).then(res => {
        commit(types.GetOrderListByDate_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetOrderListByDate_In_Error)
        reject(err)
      })
    })
  },
  getMallAddress({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetMallAddress_In_Doing)
      mallApi.getMallAddress(obj).then(res => {
        var resData
        if(res.data == "[]"){ //此种情况为该用户在商城中没有添加地址
          resData = {}
        }else{
          var mallAddress = JSON.parse(res.data).data
          resData = mallAddress[0]
        }
        commit(types.GetMallAddress_In_Done)
        resolve(resData)
      }).catch(err => {
        commit(types.GetMallAddress_In_Error)
        reject(err)
      })
    })
  },
  createOrder({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.CreateOrder_In_Doing)
      mallApi.createOrder(obj).then(res => {
        commit(types.CreateOrder_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.CreateOrder_In_Error)
        reject(err)
      })
    })
  },
  updateAddress({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.UpdateAddress_In_Doing)
      mallApi.updateAddress(obj).then(res => {
        commit(types.UpdateAddress_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.UpdateAddress_In_Error)
        reject(err)
      })
    })
  },
  insertAddress({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.InsertAddress_In_Doing)
      mallApi.insertAddress(obj).then(res => {
        commit(types.InsertAddress_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.InsertAddress_In_Error)
        reject(err)
      })
    })
  },
  getFoodInfo({commit, state}, obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetFoodInfo_In_Doing)
      mallApi.getFoodInfo(obj).then(res => {
        commit(types.GetFoodInfo_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetFoodInfo_In_Error)
        reject(err)
      })
    })
  },
  getPayParams({commit,state},obj){
    return new Promise((resolve, reject) => {
      commit(types.GetPayParams_In_Doing)
      mallApi.getPayParams(obj).then(res => {
        commit(types.GetPayParams_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetPayParams_In_Error)
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  [types.MallLogin_In_Doing](state) {
    state.mallLoginStatus = "doing"
  },
  [types.MallLogin_In_Done](state,mallAccountInfo) {
    state.mallAccountInfo = mallAccountInfo
    state.mallLoginStatus = "done"
  },
  [types.MallLogin_In_Error](state) {
    state.mallLoginStatus = "error"
  },
  [types.GetOrderList_In_Doing](state) {
    state.getOrderListStatus = "doing"
  },
  [types.GetOrderList_In_Done](state) {
    state.getOrderListStatus = "done"
  },
  [types.GetOrderList_In_Error](state) {
    state.getOrderListStatus = "error"
  },
  [types.GetOrderDetail_In_Doing](state) {
    state.getOrderDetailStatus = "doing"
  },
  [types.GetOrderDetail_In_Done](state) {
    state.getOrderDetailStatus = "done"
  },
  [types.GetOrderDetail_In_Error](state) {
    state.getOrderDetailStatus = "error"
  },
  [types.GetProducts_In_Doing](state) {
    state.getProductsStatus = "doing"
  },
  [types.GetProducts_In_Done](state) {
    state.getProductsStatus = "done"
  },
  [types.GetProducts_In_Error](state) {
    state.getProductsStatus = "error"
  },
  [types.GetOrderListByDate_In_Doing](state) {
    state.getOrderListByDateStatus = "doing"
  },
  [types.GetOrderListByDate_In_Done](state) {
    state.getOrderListByDateStatus = "done"
  },
  [types.GetOrderListByDate_In_Error](state) {
    state.getOrderListByDateStatus = "error"
  },
  [types.GetMallAddress_In_Doing](state) {
    state.getMallAddressStatus = "doing"
  },
  [types.GetMallAddress_In_Done](state) {
    state.getMallAddressStatus = "done"
  },
  [types.GetMallAddress_In_Error](state) {
    state.getMallAddressStatus = "error"
  },
  [types.CreateOrder_In_Doing](state) {
    state.createOrderStatus = "doing"
  },
  [types.CreateOrder_In_Done](state) {
    state.createOrderStatus = "done"
  },
  [types.CreateOrder_In_Error](state) {
    state.createOrderStatus = "error"
  },
  [types.UpdateAddress_In_Doing](state) {
    state.updateAddressStatus = "doing"
  },
  [types.UpdateAddress_In_Done](state) {
    state.updateAddressStatus = "done"
  },
  [types.UpdateAddress_In_Error](state) {
    state.updateAddressStatus = "error"
  },
  [types.InsertAddress_In_Doing](state) {
    state.insertAddressStatus = "doing"
  },
  [types.InsertAddress_In_Done](state) {
    state.insertAddressStatus = "done"
  },
  [types.InsertAddress_In_Error](state) {
    state.insertAddressStatus = "error"
  },
  [types.GetFoodInfo_In_Doing](state) {
    state.getFoodInfoStatus = "doing"
  },
  [types.GetFoodInfo_In_Done](state) {
    state.getFoodInfoStatus = "done"
  },
  [types.GetFoodInfo_In_Error](state) {
    state.getFoodInfoStatus = "error"
  },
  [types.GetPayParams_In_Doing](state) {
    state.getPayParamsStatus = "doing"
  },
  [types.GetPayParams_In_Done](state) {
    state.getPayParamsStatus = "done"
  },
  [types.GetPayParams_In_Error](state) {
    state.getPayParamsStatus = "error"
  },
  "SetBuyerNoteAddress"(state,obj) {
    //if(state.checkedOrder.buyerNote) state.checkedOrder.buyerNote.nutritiouMeals.address = obj
  },
  "SetCheckedOrder"(state, obj) {
    state.checkedOrder = obj
  },
  "SetOrderAddress"(state,obj){
    state.orderAddress = obj
  },
  "SetSelectedArr"(state,obj){
    state.selectedArr = obj
  },
  "SetOrder"(state, data) {
    state.mealList = data
  },
  "SetOrderReload"(state, value) {
    state.orderReload = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
