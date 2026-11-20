// This is only a guest hint, never proof of authentication. Tokens stay in memory.
const KEY = 'fastfactor:session'

export const sessionHint = {
  isGuest() {
    try {
      return localStorage.getItem(KEY) === 'guest'
    } catch {
      return false
    }
  },
  set(value: 'guest' | 'member') {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      // Session restoration also works when browser storage is unavailable.
    }
  },
}
