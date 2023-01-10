import axios from './instance'
import {
  getAccessToken,
  getExpiresTime,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  setExpiresTime
} from '@/utils/auth'
import { refresh } from '@/api/user'

// 防止重复刷新的状态开关
let isRefreshing = false
// 被拦截的请求列表
let requests = []
/**
 * 请求拦截
 * 在这里要判断是否需要刷新token
 * 帮助用户自动延长登录有效期
 */
axios.interceptors.request.use((config) => {
  /**
   * 刷新token
   */
  // 计算token的剩余有效时间
  const OLD_TOKEN_EXP = getExpiresTime() || 0
  const NOW_TIMESTAMP = Date.now()
  const TIME_DIFF = OLD_TOKEN_EXP - NOW_TIMESTAMP
  // 判断本地是否有记录
  const HAS_LOCAL_TOKEN = !!getAccessToken()
  const HAS_LOCAL_TOKEN_EXP = !!OLD_TOKEN_EXP
  // 获取接口url
  const API_URL = config.url.split('?')[0] || ''
  // 非刷新请求、有本地记录、已过期，同时满足，才会进入刷新流程
  if (
    API_URL !== '/admin-users/refreshToken' &&
    HAS_LOCAL_TOKEN &&
    HAS_LOCAL_TOKEN_EXP &&
    TIME_DIFF <= 2000
  ) {
    // 如果没有在刷新，则执行刷新
    if (!isRefreshing) {
      // 打开状态
      isRefreshing = true
      // 获取新的token
      const REFRESH_TOKEN = getRefreshToken() || ''
      // 请求刷新
      refresh(REFRESH_TOKEN)
        .then((res) => {
          // 存储token信息
          const data = res.data
          setAccessToken(data.accessToken)
          setRefreshToken(data.refreshToken)
          setExpiresTime(data.expiresTime)
          // 如果新的token存在，用新token继续之前的请求，然后重置队列
          if (data.accessToken) {
            config.headers['Authorization'] = data.accessToken
            requests.forEach((cb) => cb(config))
            requests = []
          }
          // 关闭状态，允许下次继续刷新
          isRefreshing = false
        })
        .catch(() => {
          isRefreshing = false
          requests = []
        })
    }
    // 并把刷新完成之前的请求都存储为请求队列
    return new Promise((resolve) => {
      requests.push(() => {
        resolve(config)
      })
    })
  }
  return Promise.resolve(config)
})

export default axios
