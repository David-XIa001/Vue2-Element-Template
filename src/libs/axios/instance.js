import axios from 'axios'
import config from './config'
import { Message } from 'element-ui'
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  removeExpiresTime
} from '@/utils/auth'
import router from '@/router'
import i18n from '@/lang'

/**
 * 创建一个独立的axios实例
 * 把常用的公共请求配置放这里添加
 */
const instance = axios.create(config)

/**
 * 请求拦截
 * 添加一些全局要带上的东西
 */
instance.interceptors.request.use(
  // 正常拦截
  (config) => {
    // 添加token
    const LOCAL_TOKEN = getAccessToken()
    if (LOCAL_TOKEN) {
      config.headers['Authorization'] = LOCAL_TOKEN
    }
    return Promise.resolve(config)
  },

  // 拦截失败
  (err) => Promise.reject(err)
)

/**
 * 返回拦截
 * 在这里解决数据返回的异常问题
 */
instance.interceptors.response.use(
  // 正常响应
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },

  // 异常响应（统一返回一个msg提示即可）
  (err) => {
    if (err.response && err.response.status) {
      switch (err.response.status) {
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
            duration: 1000
          })
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
            duration: 1500
          })
          break
        // 其他错误，直接抛出错误提示
        case 500:
          Message({
            message: i18n.t(`error.${err.response.data.code}`),
            duration: 1500,
            type: 'error'
          })
          if (err.response.data.code === 'TOKEN_INVALID') {
            removeAccessToken()
            removeExpiresTime()
            removeRefreshToken()
            router.replace({
              path: '/404'
            })
          }
          break
        default:
          return
      }
      return Promise.reject(err.response)
    } else {
      try {
        Message({
          message: '服务器异常',
          duration: 1500,
          type: 'error'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
)

export default instance
