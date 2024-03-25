import { useMutation } from "@tanstack/react-query"
import { createTodo } from "./api"
import { Todo } from "../../types/todo"

export function useCreateTodo() {
    return useMutation({
        mutationFn: (data: Todo) => createTodo(data)
    })
}