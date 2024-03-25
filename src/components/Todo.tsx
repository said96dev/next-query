import { useCreateTodo } from '../assets/services/mutations';
import { useTodosIds, useSingleTodo } from '../assets/services/queries';
import { Todo } from '../types/todo';
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form";

const Todo = () => {
    const { register, handleSubmit } = useForm<Todo>()
    const { data, isPending, isError } = useTodosIds();
    const todosQueries = useSingleTodo(data)
    const createTodoMutation = useCreateTodo();

    const handleCreateTodoSubmit: SubmitHandler<Todo> = data => {
        createTodoMutation.mutateAsync(data)
    }

    if (isPending) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>Error...</p>
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
                <h4>New todo:</h4>
                <input placeholder="Title" {...register("title")} />
                <br />
                <input placeholder="Description" {...register("description")} />
                <br />
                <input
                    type="submit"
                    disabled={createTodoMutation.isPending}
                    value={createTodoMutation.isPending ? "Creating..." : "Create todo"}
                />
            </form>

            <ul>
                {todosQueries.map(({ data }) => (
                    <li key={data?.id}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title:</strong> {data?.title},{" "}
                            <strong>Description:</strong> {data?.description}
                        </span>
                        <div>
                            <button
                                disabled={data?.checked}
                            >
                                {data?.checked ? "Done" : "Mark as done"}
                            </button>
                            {data && data.id && (
                                <button>
                                    Delete
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todo