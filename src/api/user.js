import http from '../libs/http.request'

export default {
  login: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/user/login",
      method: 'post',
      data: data
    })
  },
  getHomeInfo: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/user/getHomeInfo",
      method: 'get',
      data: data
    })
  }
}
