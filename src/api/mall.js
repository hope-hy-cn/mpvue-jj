import http from '../libs/http.request'

export default {
  mallLogin: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/login",
      method: 'post',
      data: data
    })
  },
  getOrderList: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/getOrderList",
      method: 'get',
      data: data
    })
  },
  getOrderDetail: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/getOrderDetail",
      method: 'get',
      data: data
    })
  },
  getProducts: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/products",
      method: 'get',
      data: data
    })
  },
  getOrderListByDate: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/order",
      method: 'get',
      data: data
    })
  },
  createOrder: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/createOrder",
      method: 'post',
      data: data
    })
  },
  getMallAddress: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/getAddress",
      method: 'get',
      data: data
    })
  },
  updateAddress: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/updateAddress",
      method: 'post',
      data: data
    })
  },
  insertAddress: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "mall/insertAddress",
      method: 'post',
      data: data
    })
  },
  getFoodInfo: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "food/foodComponentsByIdList",
      method: 'get',
      data: data
    })
  },
  getPayParams:(obj)=>{
    const data = obj.data || {}
    return http.request({
      url: "pay/preOrder",
      method: 'get',
      data: data
    })
  }
}
