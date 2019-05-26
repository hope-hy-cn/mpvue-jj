import getDiseaseApi from '../../api/disease.js'
import * as types from '../mutation-types'

const state={
  getDiseaseTypeStatus:null,
  diseaseTypes:null,
}
// mutations
const mutations={
  [types.GetDiseaseType_In_Doing](state){
    state.getDiseaseTypeStatus='doing'
  },
  [types.GetDiseaseType_In_Done](state,res){
    state.getDiseaseTypeStatus='done'
    state.diseaseTypes=res.data
  },
  [types.GetDiseaseType_In_Error](state){
    state.getDiseaseTypeStatus='err'
  }
}

//actions
const actions={
  getDiseaseTypeAsync({commit,state},obj){
    return new Promise((resolve,reject)=>{
      commit(types.GetDiseaseType_In_Doing)
      getDiseaseApi.getDiseaseType(obj)
        .then(res=>{
          commit(types.GetDiseaseType_In_Done,res)
          resolve(res)
        }).catch(err=>{
        commit(types.GetDiseaseType_In_Error)
        reject(err)
      })
    })
  }
}
//getters
const getters={
  diseaseTypes:(state, getters)=>{
    return state.diseaseTypes
  }
}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
