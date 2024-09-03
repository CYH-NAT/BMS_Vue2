import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '@/utils/https'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    row:{},
    role:''
  },
  getters: {
  },
  mutations: {
    setRow(state,payload){
      state.row=payload
    },
    setRole(state,payload){
      state.role=payload
    }
  },
  actions: {
    async getRole({commit}){
      let {role}=await get('/getRole');
      commit('setRole',role)
      //實現vuex數據持久化→利用導航守衛在頁面切換之前重新賦值
    }
  },
  modules: {
  }
})
