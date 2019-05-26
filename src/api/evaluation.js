import http from '../libs/http.request'

export default {
  getEvaluation1Info: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/user/lastHabitsEvaluation",
      method: 'get',
      data: data
    })
  },
  getReportsList: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/evaluation/getHomeInfo",
      method: 'get',
      data: data
    })
  },
  getReportDetail: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/evaluation/getEvaluationReport",
      method: 'get',
      data: data
    })
  },
  getDiseaseResult: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/evaluation/getDiseaseResult",
      method: 'get',
      data: data
    })
  },
  getNutritionalRisk: (obj) => {
    const data = obj.data || {}
    return http.request({
      url: "/evaluation/getNutritionalRisk",
      method: 'get',
      data: data
    })
  },
  putBaseEvaluation:(obj)=>{
    const data = obj.data || {}
    return http.request({
      url: "/evaluation/putBaseEvaluation",
      method: 'put',
      data: data
    })
  }
}
