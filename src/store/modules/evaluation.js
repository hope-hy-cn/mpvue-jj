import evaluationApi from '../../api/evaluation'
import * as types from '../mutation-types'
import userApi from "../../api/user";

const state = {
  getEvaluation1Status:null,
  getReportsListStatus:null,
  getReportDetailStatus:null,
  getDiseaseResult:null,
  getNutritionalRisk:null,
  putBaseEvaluationStatus:null
}

const getters = {
  // cartProducts: (state, getters, rootState) => {
  //   return state.items.map(({ id, quantity }) => {
  //     const product = rootState.products.all.find(product => product.id === id)
  //     return {
  //       title: product.title,
  //       price: product.price,
  //       quantity
  //     }
  //   })
  // }
}

// actions
const actions = {
  getEvaluation1Info ({ commit, state },obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetEvaluation1_In_Doing)
      evaluationApi.getEvaluation1Info(obj).then(res => {
        commit(types.GetEvaluation1_In_Done)
        resolve(res)
      }).catch(err => {
        commit(types.GetEvaluation1_In_Error)
        reject(err)
      })
    })
  },
  getReportsList ({ commit, state },obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetReportsList_In_Doing)
      evaluationApi.getReportsList(obj).then(res => {
        commit(types.GetReportsList_In_Done,res)
        resolve(res)
      }).catch(err => {
        commit(types.GetReportsList_In_Error)
        reject(err)
      })
    })
  },
  getReportDetail ({ commit, state },obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetReportDetail_In_Doing)
      evaluationApi.getReportDetail(obj).then(res => {
        commit(types.GetReportDetail_In_Done,res)
        resolve(res)
      }).catch(err => {
        commit(types.GetReportDetail_In_Error)
        reject(err)
      })
    })
  },
  getDiseaseResult({commit,state},obj){
    return new Promise((resolve,reject)=>{
      commit(types.GetDiseaseResult_In_Doing)
      evaluationApi.getDiseaseResult(obj)
        .then((res) => {
          commit(types.GetDiseaseResult_In_Done,res)
          resolve(res)
        })
        .catch((err)=>{
          commit(types.GetDiseaseResult_In_Error)
          reject(err)
        })
    })
  },
  getNutritionalRisk({commit,state},obj){
    return new Promise((resolve,reject)=>{
      commit(types.GetNutritionalRisk_In_Doing)
      evaluationApi.getNutritionalRisk(obj)
        .then((res) => {
          commit(types.GetNutritionalRisk_In_Done,res)
          resolve(res)
        })
        .catch((err)=>{
          commit(types.GetNutritionalRisk_In_Error)
          reject(err)
        })
    })
  },
  putBaseEvaluation({commit,state},obj){
    return new Promise((resolve,reject)=>{
      commit(types.PutUserInfo_In_Doing)
      evaluationApi.putBaseEvaluation(obj)
        .then((res)=>{
          commit(types.PutUserInfo_In_Done,res)
          resolve(res)
        })
        .catch((err)=>{
          commit(types.PutUserInfo_In_Error)
          reject(err)
        })
    })

  }
}

// mutations
const mutations = {
  [types.GetEvaluation1_In_Doing] (state) {
    state.getEvaluation1Status = "doing"
  },
  [types.GetEvaluation1_In_Done] (state) {
    state.getEvaluation1Status = "done"
  },
  [types.GetEvaluation1_In_Error] (state) {
    state.getEvaluation1Status = "error"
  },
  [types.GetReportsList_In_Doing] (state) {
    state.getReportsListStatus = "doing"
  },
  [types.GetReportsList_In_Done] (state) {
    state.getReportsListStatus = "done"
  },
  [types.GetReportsList_In_Error] (state) {
    state.getReportsListStatus = "error"
  },
  [types.GetReportDetail_In_Doing] (state) {
    state.getReportDetailStatus = "doing"
  },
  [types.GetReportDetail_In_Done] (state) {
    state.getReportDetailStatus = "done"
  },
  [types.GetReportDetail_In_Error] (state) {
    state.getReportDetailStatus = "error"
  },
  [types.GetDiseaseResult_In_Doing] (state) {
    state.getDiseaseResultStatus = "doing"
  },
  [types.GetDiseaseResult_In_Done] (state) {
    state.getDiseaseResultStatus = "done"
  },
  [types.GetDiseaseResult_In_Error] (state) {
    state.getDiseaseResultStatus = "error"
  },
  [types.GetNutritionalRisk_In_Doing] (state) {
    state.getNutritionalRiskStatus = "doing"
  },
  [types.GetNutritionalRisk_In_Done] (state) {
    state.getNutritionalRiskStatus = "done"
  },
  [types.GetNutritionalRisk_In_Error] (state) {
    state.getNutritionalRiskStatus = "error"
  },
  [types.PutUserInfo_In_Doing](state){
    state.putBaseEvaluationStatus="doing"
  },
  [types.PutUserInfo_In_Done](state){
    state.putBaseEvaluationStatus="done"
  },
  [types.PutUserInfo_In_Error](state){
    state.putBaseEvaluationStatus="error"
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
