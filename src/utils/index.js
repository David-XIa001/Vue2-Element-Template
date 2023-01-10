import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// 参数从url格式转为object
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 参数从object格式转为url
export function objToString(object) {
  let url = ''
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (url.indexOf('?') === -1) {
        url += '?' + key + '=' + object[key]
      } else {
        url += '&' + key + '=' + object[key]
      }
    }
  }
  return url
}

// 文件下载
export function downloadFile(url, name) {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  name && (a.download = name)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// UTC时间与当地时间的转换
export function transformDate(date, type) {
  if (type === 'local') {
    // 传入local则将UTC时间转换为本地时间
    return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
  } else if (type === 'UTC') {
    // 传入UTC则将时间转换为UTC时间
    return dayjs(date).utc().format()
  } if (type === 'unix') {
    // 将时间转换为时间戳
    return dayjs(date).unix()
  }
}

// 防抖
export function debounce(fn, delay) {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

// 节流
export function throttle(fn, delay) {
  let timer = null
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, delay)
    }
  }
}

// 数组转对象
export function arrayToObj(array) {
  const result = {}
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    result[item.value] = item.key
  }
  return result
}
