import * as usersAPI from './users-api'

export async function signUp (userData) {
  const token = await usersAPI.signUp(userData)
  window.localStorage.setItem('token', token)
  return getUser()
}

export async function login (credentials) {
  const token = await usersAPI.login(credentials)
  window.localStorage.setItem('token', token)
  return getUser()
}

export async function update (userData) {
  window.localStorage.removeItem('token')
  const token = await usersAPI.update(userData)
  window.localStorage.setItem('token', token)
  return getUser()
}

export async function deleteUser (userData) {
  window.localStorage.removeItem('token')
  await usersAPI.deleteUser(userData)
  return null
}

export function getToken () {
  const token = window.localStorage.getItem('token')
  if (!token) return null
  const payload = JSON.parse(atob(token.split('.')[1]))
  if (payload.exp < Date.now() / 1000) {
    window.localStorage.removeItem('token')
    return null
  }
  return token
}

export function getUser () {
  const token = getToken()
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut () {
  window.localStorage.removeItem('token')
}
