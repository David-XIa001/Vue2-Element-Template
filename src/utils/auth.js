
export function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export function setAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken)
}

export function removeAccessToken() {
  return localStorage.removeItem('accessToken')
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken')
}

export function setRefreshToken(refreshToken) {
  return localStorage.setItem('refreshToken', refreshToken)
}

export function removeRefreshToken() {
  return localStorage.removeItem('refreshToken')
}

export function getExpiresTime() {
  return localStorage.getItem('expiresTime')
}

export function setExpiresTime(expiresTime) {
  return localStorage.setItem('expiresTime', expiresTime)
}

export function removeExpiresTime() {
  return localStorage.removeItem('expiresTime')
}
