import { getToken } from '@/utils/cookie'
import userAPI from '@/api/user'
import * as types from '../mutation-types'

const state = {
  user: '', // 用户名
  token: getToken(),
  accessed: [], // 权限信息
  school: '' // 学校名
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },

  [types.SET_TOKEN] (state, token) {
    state.token = token
  },

  [types.SET_ACCESSED] (state, accessed) {
    state.accessed = accessed
  },

  [types.SET_SCHOOL] (state, school) {
    state.school = school
  }
}

const actions = {
  getAccessed ({ commit }) {
    return new Promise((resolve, reject) => {
      userAPI.getAccessed().then(response => {
        commit(types.SET_ACCESSED, response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  setToken ({ commit }, token) {
    commit(types.SET_TOKEN, token)
  }
}

export default {
  state,
  mutations,
  actions
}
