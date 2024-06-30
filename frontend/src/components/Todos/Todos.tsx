import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "../../atoms/TodoContainer";

type Todos = [
  {
    id: string;
    task: string;
    completed: string;
    createdOn: string;
    tags: [];
  }
];

type Todo = {
  id: string;
  task: string;
  completed: string;
  createdOn: string;
  tags: [];
};

export default function Todos({ userid }: { userid: string }) {
  const fetchTodoDataURL = `http://localhost:3001/users/${userid}/todos`;

  const [todos, setTodos] = useState<Todos>([
    {
      id: "",
      task: "",
      completed: "",
      createdOn: "",
      tags: [],
    },
  ]);

  const [updatedTodo, setUpdatedTodo] = useState<Todo>({
    id: "",
    task: "",
    completed: "",
    createdOn: "",
    tags: [],
  });

  const setTodosFromResponse = (todoResponse: any) => {
    const newTodos = todoResponse.map((todo: any) => ({
      id: todo._id,
      task: todo.task,
      completed: todo.completed,
      createdOn: todo.createdOn,
      tags: todo.tags,
    }));
    setTodos(newTodos);
  };

  async function fetchAllTodos() {
    await axios.get(fetchTodoDataURL).then((res) => {
      const todoResponse = res.data;
      setTodosFromResponse(todoResponse);
    });
  }

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <div>
      {todos ? (
        todos.map((todo) => {
          return (
            <div key={todo.id}>
              <TodoContainer
                task={todo.task}
                createdOn={todo.createdOn}
                completed={todo.completed}
                tags={todo.tags}
                updateTodo={() => {}}
                deleteTodo={async () => {
                  await axios
                    .delete(
                      `http://localhost:3001/users/${userid}/todos/delete/${todo.id}`
                    )
                    .then((res) => {
                      const todoResponse = res.data;
                      setTodosFromResponse(todoResponse);
                    });
                }}
              />
            </div>
          );
        })
      ) : (
        <div>No Todos Found!</div>
      )}
    </div>
  );
}
