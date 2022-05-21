import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '@/router'

import { getTimeStamp, removeToken } from '@/utils/auth'

const TimeOut = 3600 // 定义超时时间
function IsCheckTimeOut() {
  console.log('zzzzzz222')
  let currentTime = Date.now() // 当前时间戳
  let timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // true表示token过期
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout') //清除token和用户信息
      router.push('/login')
      return Promise.reject('登录超时')
    }
  }
  //设置token
  config.headers['Authorization'] = `Bearer ${store.getters.token}`
  return config
}, err => {
  Promise.reject(err)
})

service.interceptors.response.use(function(response) {
  // axios默认加了一层data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return new Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout');
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
