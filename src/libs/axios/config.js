import { v4 as uuidv4 } from 'uuid'
/**
 * axios的公共配置
 */
const config = {
  baseURL: process.env.VUE_APP_BASE_API,
  // 公共请求头
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Request-Id': uuidv4()
  },
  timeout: 5000, // 超时时间
  // 默认的响应方式
  responseType: 'json'
}

export default config
