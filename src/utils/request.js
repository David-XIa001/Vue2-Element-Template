import axios from 'axios'
import { Message } from 'element-ui'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
import { getAccessToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 公共请求头
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  timeout: 5000, // 超时时间
  // 默认的响应方式
  responseType: 'json'
})

service.interceptors.request.use(
  (config) => {
    if (getAccessToken()) {
      config.headers.Authorization = getAccessToken()
    }
    config.headers.uuid = uuidv4()
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log('response =', response)

    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      console.log('222 =', 222)

      return Promise.reject(response)
    }
  },
  (error) => {
    console.log('error =', error)
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break

          // 403 token过期
        case 403:
          Message({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break

          // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          })
          break
          // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.msg,
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    }
  }
)
// response interceptor
// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 200) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
