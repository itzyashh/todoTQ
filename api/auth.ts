import { API } from "./api"

export const login = async (email: string, password: string) => {
    try {
        const res = await API.post("/auth", {email, password})
        console.log('res at login', res)
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