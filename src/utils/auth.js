import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设定一个独一无二的key
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const timeKey = 'hrsaas-timestamp-key' // 设置一个独一无二的key
export  function setTimeStamp(){
  return Cookies.set(timeKey,Date.now())
}
export  function getTimeStamp(){
  return Cookies.get(timeKey)
}
