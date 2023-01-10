import {
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  setExpiresTime
} from '@/utils/auth'
import { refresh } from '@/api/user'

/**
 * 刷新token
 * 成功返回新的token，失败返回空字符串
 */
const refreshToken = () => {
  return new Promise((resolve) => {
    // 获取本地记录的刷新凭证
    const REFRESH_TOKEN = getRefreshToken() || ''
    // 请求刷新
    refresh(REFRESH_TOKEN)
      .then((res) => {
        // 存储token信息
        const data = res.data
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setExpiresTime(data.expiresTime)
        resolve(data.accessToken)
      })
      .catch((msg) => {
        resolve('')
      })
  })
}

export default refreshToken
