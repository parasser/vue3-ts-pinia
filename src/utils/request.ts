import axios from 'axios'
import { decode } from "js-base64";
import { userStore } from "../store/useStore";
import cookie from 'js-cookie'
const instance = axios.create({
  baseURL: '/api',
  timeout: 15000
})
// 请求拦截器
instance.interceptors.request.use(config => {
  let jwt = cookie.get('jwt') || ''
  // let jwt = sessionStorage.getItem("jwt") || "";
  if (jwt) {
    let token = null;
    try {
      token = JSON.parse(decode(jwt));
    } catch (e) {
      console.log("%c The user's JWT is error", "color:red");
    }
    !!token && userStore().setUser(token);
    config.headers = config.headers || {}
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(result => {
  return result.data
}, err => {
  return Promise.reject(err)
})
export default instance