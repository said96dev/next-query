import { useQuery, useQueries } from "@tanstack/react-query"
import { getTodosIds, getSingleTodo } from "./api"

export const useTodosIds = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getTodosIds,
        refetchOnWindowFocus: false,

    });
}

export const useSingleTodo = (ids: (number | undefined)[] | undefined) => {
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["todo", { id }],
                queryFn: () => getSingleTodo(id!),
            };
        }),
    });
}
