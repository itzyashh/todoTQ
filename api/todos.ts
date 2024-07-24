import { API } from "./api"

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export type Todo = {
    _id: string,
    task: string,
    status: number,
    img: string,
}

export const getTodos = async () => {
    const response = await API.get<Todo[]>(`${BASE_URL}/todos/me`)
    return response.data
}

export const createTodo = async (task: string, img?: string) => {
    const todo = {
        task,
        desc: '',
        status: 0,
        private: true,
    }
    const response = await API.post<Todo>(`${BASE_URL}/todos`, todo)
    return response.data
}