import { setToken } from "@/redux/reducers/User";
import { API } from "./api"
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string) => {
    try {
        const res = await API.post("/auth", {email, password})
        await SecureStore.setItemAsync('token', res.data.token)
        setToken(res.data.token)
        return res.data
    } catch (error) {
        console.log('error at login', error)
        return error
    }
}

export const register = async (email: string, password: string) => {
    try {
        const res = await API.post("/users", {email, password})
        console.log('res at register', res)
        return res.data
    } catch (error) {
        console.log('error at register', error)
        return error
    }
}