import { API } from "./api"

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export type Todo = {
    _id: string,
    task: string,
    status: number,
    img: string,
    isSynced?: boolean,
}

export const getTodos = async () => {
    const response = await API.get<Todo[]>(`${BASE_URL}/todos/me`)
    return response.data
}

export const createTodo = async (task: string, img?: string) => {

    // get axios header
    const header = API.defaults.headers.common['Authorization']
    console.log('header', header)

    const todo = {
        task,
        desc: '',
        status: 0,
        private: true,
    }
    const response = await API.post<Todo>(`${BASE_URL}/todos`, todo)
    return response.data
}

export const updateTodo = async (todo: Todo) => {
    const response = await API.put<Todo>(`${BASE_URL}/todos/${todo._id}`, todo)
    return response.data
}

export const deleteTodo = async (id: string) => {
    await API.delete(`${BASE_URL}/todos/${id}`)
    return id
}