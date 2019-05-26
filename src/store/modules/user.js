import userApi from '../../api/user'
import * as types from '../mutation-types'

const state = {
  loginStatus:null,
  userInfo:{
    id:"1000",
    openId:"odnCu4gdHGSCP72IguCLq6DX85N0",
    unionId:"oncDLvgQ_fjM8DLrBIbGCHhaa9fQ",
    username:"心心",
    energy:1300
  },
  getHomeInfoStatus:null
}

const getters = {
  userInfo: (state, getters, rootState) => {
    return state.userInfo
  }
}

// actions
const actions = {
  login ({ commit, state },obj) {
    return new Promise((resolve, reject) => {
      commit(types.Login_In_Doing)
      userApi.login(obj).then(res => {
        commit(types.Login_In_Done,res)
        resolve(res)
      }).catch(err => {
        commit(types.Login_In_Error)
        reject(err)
      })
    })
  },
  getHomeInfo ({ commit, state },obj) {
    return new Promise((resolve, reject) => {
      commit(types.GetHomeInfo_In_Doing)
      userApi.getHomeInfo(obj).then(res => {
        commit(types.GetHomeInfo_In_Done,res)
        resolve(res)
      }).catch(err => {
        commit(types.GetHomeInfo_In_Error)
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  [types.Login_In_Doing] (state) {
    state.loginStatus = "doing"
  },
  [types.Login_In_Done] (state,res) {
    state.loginStatus = "done"
    state.userInfo = res.data
  },
  [types.Login_In_Error] (state) {
    state.loginStatus = "error"
  },
  [types.GetHomeInfo_In_Doing] (state) {
    state.getHomeInfoStatus = "doing"
  },
  [types.GetHomeInfo_In_Done] (state) {
    state.getHomeInfoStatus = "done"
  },
  [types.GetHomeInfo_In_Error] (state) {
    state.getHomeInfoStatus = "error"
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
