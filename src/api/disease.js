import http from '../libs/http.request'

export default {
  getDiseaseType: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/disease/getDiseaseType",
      method: 'get',
      data: data
    })
  },

}
