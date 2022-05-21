import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = ''
    removeToken()
  },
  setUserInfo(state, result) {
    state.userInfo = { ...result }

  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {

  async login({ commit }, data) {
    console.log('login-jr')
    // 调用api接口
    //data里面只有token
    const result = await login(data) // 拿到token
    setTimeStamp() //写入时间戳
    commit('setToken', result) // 设置token
    // 拿到token说明登录成功
  },
  async getUserInfo({ commit }) {
    // 调用api接口
    const result = await getUserInfo() //
    const obj=await  getUserDetailById(result.userId)
    commit('setUserInfo', {...result,...obj}) //
    return result
  },
  logout({commit}){
    commit('removeToken')
    commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
