'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { User, UserRole } from '@/types'
import { api } from '@/lib/api'

const SESSION_KEY = 'skillx_session'
const TOKEN_KEY = 'skillx_token'

type AuthContextValue = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function saveLocal(user: User, token: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  localStorage.setItem(TOKEN_KEY, token)
}

function clearLocal() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

function loadLocalUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setUser(loadLocalUser())
      setLoading(false)
      return
    }
    api
      .me()
      .then(({ user: u }) => {
        setUser(u)
        localStorage.setItem(SESSION_KEY, JSON.stringify(u))
      })
      .catch(() => {
        clearLocal()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { user: u, token } = await api.login(email, password)
    saveLocal(u, token)
    setUser(u)
    return u
  }, [])

  const signup = useCallback(
    async (name: string, email: string, password: string, role: UserRole) => {
      const { user: u, token } = await api.register(name, email, password, role)
      saveLocal(u, token)
      setUser(u)
      return u
    },
    []
  )

  const logout = useCallback(() => {
    clearLocal()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading, login, signup, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
