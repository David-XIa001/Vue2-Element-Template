import request from '@/libs/axios/index'
import { objToString } from '@/utils/index'

export function login(data) {
  return request({
    url: '/admin-users/login',
    method: 'post',
    data
  })
}

export function refresh(data) {
  return request({
    url: '/admin-users/refreshToken?token=' + data,
    method: 'get'
  })
}

export function getInfo1() {
  return request({
    url: '/admin-users/doLogin',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin-users/logout',
    method: 'post'
  })
}

// 获取app用户信息
export function getUserList(data) {
  return request({
    url: '/app-users/list',
    method: 'post',
    data: data

  })
}

export function getUserInfo(id) {
  return request({
    url: '/app-users/' + id,
    method: 'get'
  })
}

export function getUserChildrenInfo(id) {
  return request({
    url: '/app-users/children/' + id,
    method: 'get'
  })
}

// 获取管理员信息
export function getAdminList(data) {
  return request({
    url: '/admin-users/list',
    method: 'post',
    data: data
  })
}

export function getAdminInfo(id) {
  return request({
    url: '/admin-users/' + id,
    method: 'get'
  })
}

export function addAdmin(data, isEdit) {
  return request({
    url: '/admin-users',
    method: isEdit ? 'put' : 'post',
    data
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin-users/' + id,
    method: 'delete'
  })
}
