const Mock = require('mockjs')
const Random = Mock.Random
const list = Mock.mock({
  'records|10': [
    {
      bizId: '@id',
      nickName: '@name',
      phone: /^1[385][1-9]\d{8}/,
      email: '@email',
      'status|1': ['正常', '异常'],
      username: '@name',
      createBy: '@name',
      createTime: '@datetime',
      updateBy: '@name',
      updateTime: '@datetime',
      password: '123456456'
      // pageviews: '@integer(300, 5000)'
    }
  ],
  total: 10
})

const list1 = Mock.mock({
  'records|10': [
    {
      bizId: '@id',
      nickName: '@name',
      realName: '@name',
      phone: /^1[385][1-9]\d{8}/,
      email: '@email',
      'sex|1': ['男', '女'],
      username: '@name',
      lastTime: '@datetime'
    }
  ],
  total: 10
})

function login() {
  return {
    code: 200,
    data: {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMTIzMTIzMTIzIiwiZXhwIjoxNjcwODIzOTAyLCJpYXQiOjE2NzA4MjM2MDIsInVzZXJuYW1lIjoibHgifQ.wfxYa2nZfYZ_ovDr-njZYmt8EQ-j0fZ2XJK4vZETP07z_6qCUvUrylbQueV5_n6wr8lQ2QsosCwJPQSaEdHbNg',
      expiresTime: 1670925002000,
      refreshToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMTIzMTIzMTIzIiwiZXhwIjoxNjcwODI0MjAyLCJpYXQiOjE2NzA4MjM2MDIsInVzZXJuYW1lIjoibHgifQ.MDRyQCfoEnr2VjEvTWttyel5R1F__wYb1cnaA-wO97hmZqEDNGfSBRamzDKWi2LHSCHd3XMP0ydMX2AvKerfyQ'
    }
  }
}

function refreshToken() {
  return {
    code: 200,
    data: {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMTIzMTIzMTIzIiwiZXhwIjoxNjcwODIzOTAyLCJpYXQiOjE2NzA4MjM2MDIsInVzZXJuYW1lIjoibHgifQ.wfxYa2nZfYZ_ovDr-njZYmt8EQ-j0fZ2XJK4vZETP07z_6qCUvUrylbQueV5_n6wr8lQ2QsosCwJPQSaEdHbNg',
      expiresTime: 1680925002000,
      refreshToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiMTIzMTIzMTIzIiwiZXhwIjoxNjcwODI0MjAyLCJpYXQiOjE2NzA4MjM2MDIsInVzZXJuYW1lIjoibHgifQ.MDRyQCfoEnr2VjEvTWttyel5R1F__wYb1cnaA-wO97hmZqEDNGfSBRamzDKWi2LHSCHd3XMP0ydMX2AvKerfyQ'
    }
  }
}

function doLogin() {
  return {
    code: 200,
    data: {
      nickName: '小A',
      username: 'aaaa',
      phone: '12333333',
      avatar: '/static/img/22.6633dafa.webp'
    }
  }
}

function logout() {
  return {
    code: 200,
    data: 'success'
  }
}

// 获取用户信息列表
function getList1(options) {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!localStorage.getItem('userList')) {
    localStorage.setItem('userList', list1)
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  var userList = localStorage.getItem('userList')
  return { code: 200, data: userList }
}

// 获取单个用户信息
function getUserInfo(options) {
  var arr = options.url.split('/')
  var bizId = arr[arr.length - 1 ]
  // 先从 localStorage 中拉取数据
  var userList = localStorage.getItem('userList')
  // 遍历数组，返回id 与传来 id 相当的一个对象
  for (const index in userList.records) {
    if (userList.records[index].bizId === bizId) {
      var user = userList.records[index]
      return { code: 200, data: user }
    }
  }
}

// 获取管理员用户信息列表
function getList() {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!localStorage.getItem('adminList')) {
    localStorage.setItem('adminList', list)
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  var adminList = localStorage.getItem('adminList')
  return { code: 200, data: adminList }
}

// 获取单个用户信息
function getInfo(options) {
  var arr = options.url.split('/')
  var bizId = arr[arr.length - 1 ]
  // 先从 localStorage 中拉取数据
  var adminList = localStorage.getItem('adminList')
  // 遍历数组，返回id 与传来 id 相当的一个对象
  for (const index in adminList.records) {
    if (adminList.records[index].bizId === bizId) {
      var user = adminList.records[index]
      return { code: 200, data: user }
    }
  }
}

// 删除用户信息
function deleteInfo(options) {
  var arr = options.url.split('/')
  var bizId = arr[arr.length - 1 ]
  // 先从 localStorage 中拉取数据
  var adminList = localStorage.getItem('adminList')
  // 根据传递的 id 删除 用户
  for (const index in adminList.records) {
    if (adminList.records[index].bizId === bizId) {
      adminList.records.splice(index, 1)
      localStorage.setItem('adminList', adminList)
    }
  }
  return {
    code: 200,
    data: '用户删除成功'
  }
}

// 添加用户信息
function addInfo(options) {
  // 先从 localStorage 中拉取数据
  var adminList = localStorage.getItem('adminList')
  // 获取传入用户信息对象，是一个字符串，需要转化为对象
  var user = options.body
  // 使用 mock 随机生成一个 id
  user.bizId = Random.id()
  // 将 user 插入到 adminList 中
  adminList.records.unshift(user)
  // 重新将 adminList 存入 localStorage 中
  localStorage.setItem('adminList', adminList)
  return {
    code: 200,
    data: '用户添加成功'
  }
}

// 更新用户信息
function updateInfo(options) {
  // 先从 localStorage 中拉取数据
  var adminList = localStorage.getItem('adminList')
  var user = options.body
  // 遍历 adminList 根据传入对象的 id 更新用户信息
  for (const index in adminList.records) {
    if (adminList.records[index].bizId === user.bizId) {
      adminList.records[index] = user
    }
  }
  localStorage.setItem('adminList', adminList)
  return {
    code: 200,
    data: '用户更新成功'
  }
}

module.exports = [
  { url: '/admin-users/login', type: 'post', response: login },
  { url: '/admin-users/doLogin', type: 'get', response: doLogin },
  { url: '/admin-users/refreshToken', type: 'get', response: refreshToken },
  { url: '/admin-users/logout', type: 'post', response: logout },
  { url: '/admin-users/list', type: 'post', response: getList },
  { url: '/app-users/list', type: 'post', response: getList1 },
  { url: '/app-users', type: 'get', response: getUserInfo },
  { url: '/admin-users', type: 'get', response: getInfo },
  { url: '/admin-users', type: 'delete', response: deleteInfo },
  { url: '/admin-users', type: 'post', response: addInfo },
  { url: '/admin-users', type: 'put', response: updateInfo }
]
