import Vue from 'vue'
import vuex from 'vuex'


import evaluation_store from './modules/evaluation'
import user_store from './modules/user'
import userInfo_store from './modules/userInfo.js'
import mall_store from './modules/mall'
import disease_store from './modules/disease'

Vue.use(vuex);

export default new vuex.Store({
  strict:true,
  state: {
  },
  modules: {
    evaluation: evaluation_store,
    user: user_store,
    mall: mall_store,
    userInfo:userInfo_store,
    disease:disease_store
  }
})
