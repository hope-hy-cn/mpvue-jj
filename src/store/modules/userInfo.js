import userInfoApi from '../../api/userInfo.js'
import * as types from '../mutation-types'

const state={
  getHospitalInfoStatus:null,
  putUserInfoStatus:null,
  hospitalInfo:null,
  hospitalInfoBlank:[],//医院页面填写信息
  selectedDiseases:[],//病人选择的疾病
}
// mutations
const mutations={
  [types.GetHospitalInfo_In_Doing](state){
    state.getHospitalInfoStatus='doing'
  },
  [types.GetHospitalInfo_In_Done](state,res){
    state.getHospitalInfoStatus='done'
    state.hospitalInfo=res.data
  },
  [types.GetHospitalInfo_In_Error](state){
    state.getHospitalInfoStatus='err'
  },
  [types.PutUserInfo_In_Doing](state){
    state.putUserInfoStatus="doing"
  },
  [types.PutUserInfo_In_Done](state){
    state.putUserInfoStatus="done"
  },
  [types.PutUserInfo_In_Error](state){
    state.putUserInfoStatus="error"
  },
  hospitalInfoBlank(state,arr){
      state.hospitalInfoBlank=arr
  },
  selectedDiseases(state,arr){
    state.selectedDiseases=arr
  }

}

//actions
const actions={
  getHospitalInfoAsync({commit,state},obj){
    return new Promise((resolve,reject)=>{
      commit(types.GetHospitalInfo_In_Doing)
      userInfoApi.getHospitalInfo(obj)
        .then(res=>{
          commit(types.GetHospitalInfo_In_Done,res)
          resolve(res)
      }).catch(err=>{
        commit(types.GetHospitalInfo_In_Error)
        reject(err)
      })
    })
  },
  putUserInfoAsync({commit,state},obj){
    return new Promise((resolve,reject)=>{
      commit(types.PutUserInfo_In_Doing)
      userInfoApi.putUserInfo(obj)
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
//getters
const getters={
  hospitalInfo:(state, getters)=>{
    return state.hospitalInfo
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
