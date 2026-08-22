export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function safeLocalStorageGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback

  try {
    const item = localStorage.getItem(key)
    if (!item) return fallback

    return JSON.parse(item) as T
  } catch (err) {
    console.error('safeLocalStorageGet parse error', err)
    return fallback
  }
}

export function safeLocalStorageSet<T>(key: string, value: T) {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('safeLocalStorageSet error', err)
  }
}
