import {orgModuleApi} from '../api/main'
const state = {
  user: null,
  role: null,
  isLogin: false,
}

const actions = {
  async login({commit}, user) {
    commit('SET_DOING_LOGIN', true)
    // 模拟登录
    return new Promise((resolve, reject) => {
      orgModuleApi.login(user).then((res)=>{
        if(res.success){
          let data = res.data.data
          commit('SET_LOGIN_TOKEN', 'ddddd')
          commit('SET_DOING_LOGIN', false)
          setTimeout(() => {
            resolve(res)
          }, 1000)
        }else{
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  async getLoginUser ({commit}) {
    // 模拟请求用户信息
    return new Promise((resolve, reject) => {
      var params = {
        token: sessionStorage.getItem('token')
      }
      orgModuleApi.loginInfo(params).then((res)=>{
        if(res.code === '0'){
          let data = res.data
          sessionStorage.setItem('user', JSON.stringify(data.info))
          sessionStorage.setItem('role', JSON.stringify(data.role))
          commit('SET_LOGIN_USER', JSON.stringify(data.info))
          commit('SET_LOGIN_ROLE', JSON.stringify(data.role))
          setTimeout(() => {
            resolve(res)
          }, 1000)
        }else{
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  async logout ({commit},params) {
    // 模拟退出
    return new Promise((resolve, reject) => {
      orgModuleApi.loginout(params).then((res)=>{
        if(res.code == 0){
          setTimeout(() => {
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('role')
            commit('SET_LOGIN_USER', null)
            resolve(res)
          }, 100)
        }else {
          resolve(res)
        }
      })
    })
  }
}

const mutations = {
  SET_LOGIN_USER (state, user) {
    state.user = user
  },
  SET_LOGIN_ROLE (state, role) {
    state.role = role
  },
  SET_LOGIN_TOKEN (state, token) {
    if (token) {
      sessionStorage.setItem('token', token)
    } else {
      sessionStorage.removeItem('token')
    }
  },
  SET_DOING_LOGIN (state, isLogin) {
    state.isLogin = isLogin
  },
}

export default {
  state,
  actions,
  mutations
}
