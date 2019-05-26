import http from '../libs/http.request'

export default {
  getHospitalInfo: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/userInfo/getHospital",
      method: 'get',
      data: data
    })
  },
  putUserInfo:(obj)=>{
    const data = obj.data || {}
    return http.request({
      url: "/userInfo/putUserInfo",
      method: 'put',
      data: data
    })
  }
}
