// Simple local auth — stores accounts & session in localStorage

export interface User {
  id: string
  name: string
  phone: string
  area: string
  joinedAt: string
}

const USERS_KEY = 'punya_users'
const SESSION_KEY = 'punya_session'

function getUsers(): Record<string, User> {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) ?? '{}') } catch { return {} }
}

function saveUsers(users: Record<string, User>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession(): User | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null') } catch { return null }
}

function saveSession(user: User | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  else localStorage.removeItem(SESSION_KEY)
}

export function phoneExists(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return Object.values(getUsers()).some(u => u.phone.replace(/\D/g, '') === cleaned)
}

export function register(name: string, phone: string, area: string): { ok: true; user: User } | { ok: false; error: string } {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length < 9) return { ok: false, error: 'Nomor HP tidak valid' }
  if (phoneExists(phone)) return { ok: false, error: 'Nomor HP sudah terdaftar. Silakan masuk.' }

  const user: User = {
    id: `u_${Date.now()}`,
    name: name.trim(),
    phone: cleaned,
    area,
    joinedAt: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
  }
  const users = getUsers()
  users[user.id] = user
  saveUsers(users)
  saveSession(user)
  return { ok: true, user }
}

export function login(phone: string): { ok: true; user: User } | { ok: false; error: string } {
  const cleaned = phone.replace(/\D/g, '')
  const user = Object.values(getUsers()).find(u => u.phone.replace(/\D/g, '') === cleaned)
  if (!user) return { ok: false, error: 'Nomor HP belum terdaftar. Silakan daftar dulu.' }
  saveSession(user)
  return { ok: true, user }
}

export function logout() {
  saveSession(null)
}

// Deterministic demo OTP — last 4 digits of phone, padded
export function generateOtp(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.slice(-4).padStart(4, '1')
}
