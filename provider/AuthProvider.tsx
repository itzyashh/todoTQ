import { API } from "@/api/api"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

type AuthProviderProps = {
    token: string | null
    onRegister: (email: string, password: string) => Promise<any>
    onLogin: (email: string, password: string) => Promise<any>
    onLogout: () => Promise<void>
    initialized: boolean
}

const AuthContext = createContext<Partial<AuthProviderProps>>({})

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState('')
    console.log('token', token)
    const [initialized, setInitialized] = useState(false)


    useEffect(() => {
      const getToken = async () => {
        const storedToken = await SecureStore.getItemAsync('token')
        console.log('storedToken', storedToken)
        if (storedToken) {
          setToken(storedToken)
          API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        }
        setInitialized(true)
        }
        getToken()
    } , [])


    const handleLogin = async (email: string, password: string) => {
        try {
            const res = await API.post(`${BASE_URL}/auth`, { email, password })
            setToken(res.data.token)
            await SecureStore.setItemAsync('token', res.data.token)
            API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            return res
        } catch (error) {
            console.log('err in login', error)      
        }
    }
      const handleRegister = async (email: string, password: string) => {
        try {
            const res = await API.post(`${BASE_URL}/users`, { email, password })
            return res
        } catch (error) {
            console.log('err in register', error)
        }
    }
    const handleLogout = async () => {
        setToken('')
        await SecureStore.deleteItemAsync('token')
        delete API.defaults.headers.common['Authorization']
    }
  
    const values = useMemo(() => ({ token, onLogin: handleLogin, onLogout: handleLogout, onRegister: handleRegister, initialized }), [token, handleLogin, handleLogout, handleRegister, initialized]);
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}