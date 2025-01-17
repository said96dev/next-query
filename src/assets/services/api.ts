import axios from "axios"
import { Todo } from "../../types/todo"

const BASE_URL = 'http://localhost:8080'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getTodosIds = async () => {
    return (
        await axiosInstance.get<Todo[]>('/todos')
    ).data.map((todo) => {
        return todo.id
    })
}


export const getSingleTodo = async (id: number) => {
    return (
        await axiosInstance.get<Todo>(`/todos/${id}`)
    ).data
}

export const createTodo = async (data: Todo) => {
    console.log(data)
    return (
        await axiosInstance.post<Todo>('todos', data)
    )
}