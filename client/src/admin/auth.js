const KEY = 'velora_admin'

export const demoAccount = {
  email: 'admin@velorabay.com',
  password: 'demo1234',
}

export function login(email, password) {
  if (email === demoAccount.email && password === demoAccount.password) {
    localStorage.setItem(KEY, JSON.stringify({ email, at: Date.now() }))
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem(KEY)
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem(KEY))
}
