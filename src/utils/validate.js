// 校验规则
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 是否为正整数
export function isPosInteger(num) {
  return /^d+$/.test(num)
}

// 邮箱是否正确
export function isEmail(str) {
  const ePattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return ePattern.test(str)
}

// 手机号是否正确
export function isPhone(str) {
  const mPattern = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
  return mPattern.test(str)
}

// 身份证号是否正确
export function isIdCard(str) {
  const idPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idPattern.test(str)
}

// 车牌号号是否正确
export function isCarCard(str) {
  const carPattern =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  return carPattern.test(str)
}

// 长度是否符合
export function isLengthOk(str, length) {
  return str.length === length
}

