import { useState, useEffect } from "react";
import axios from "axios";

type Todo = [
  {
    id: string;
    task: string;
    completed: string;
    createdOn: string;
    tags: [];
  }
];

export default function FetchAllTodos({ userid }: { userid: string }) {
  const fetchTodoDataURL = `http://localhost:3001/users/${userid}/todos`;

  const [todos, setTodos] = useState<Todo>([
    {
      id: "",
      task: "",
      completed: "",
      createdOn: "",
      tags: [],
    },
  ]);

  async function fetchAllTodos() {
    await axios.get(fetchTodoDataURL).then((res) => {
      const todoResponse = res.data;
      const newTodos = todoResponse.map((todo: any) => ({
        id: todo._id,
        task: todo.task,
        completed: todo.completed,
        createdOn: todo.createdOn,
        tags: todo.tags,
      }));
      setTodos(newTodos);
    });
  }

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <div>
      <h2>Todos:</h2>
      {todos &&
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              Task: {todo.task}
              <br />
              Completed:{todo.completed ? "Yes" : "No"}
              Created On: {todo.createdOn}
              Tags: {todo.tags}
            </li>
          );
        })}
    </div>
  );
}
