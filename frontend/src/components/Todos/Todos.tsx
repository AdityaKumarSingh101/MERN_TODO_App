import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "./TodoContainer";

type Todos = [
  {
    id: string;
    task: string;
    completed: string;
    createdOn: string;
    tags: [];
  }
];

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

  const [todoTag, setTodoTag] = useState<string>("");
  const [todoTask, setTodoTask] = useState<string>("");

  let [toggleAdd, setToggleAdd] = useState<boolean>(false);

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

  async function AddTodo() {
    await axios
      .post(`http://localhost:3001/users/${userid}/todos/create`, {
        task: todoTask,
        tags: todoTag,
      })
      .then((res) => {
        const todoResponse = res.data;
        console.log(todoResponse);
        setTodosFromResponse(todoResponse);
      });
  }
  return (
    <>
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
                  updateTodoTask={async (task: string) => {
                    await axios
                      .put(
                        `http://localhost:3001/users/${userid}/todos/update/${todo.id}`,
                        {
                          id: todo.id,
                          task: task,
                          completed: todo.completed,
                          createdOn: todo.createdOn,
                          tags: todo.tags,
                        }
                      )
                      .then((res) => {
                        const todoResponse = res.data;
                        setTodosFromResponse(todoResponse);
                      });
                  }}
                  updateTodoCompleted={async (completed: string) => {
                    await axios
                      .put(
                        `http://localhost:3001/users/${userid}/todos/update/${todo.id}`,
                        {
                          id: todo.id,
                          task: todo.task,
                          completed: completed,
                          createdOn: todo.createdOn,
                          tags: todo.tags,
                        }
                      )
                      .then((res) => {
                        const todoResponse = res.data;
                        setTodosFromResponse(todoResponse);
                      });
                  }}
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
          <div>
            <div>No Todos Found! Click the ADD TODO button to get started!</div>
          </div>
        )}
      </div>
      {/*Add TODO Container*/}
      <div className="my-2 w-[100%] py-1">
        {toggleAdd ? (
          // ADD TODO Form
          <div className="flex flex-row gap-2 w-[100%]">
            {/*Task and Tag*/}
            <div className="flex flex-grow">
              <span className="bg-gray-500 text-black h-[100%] w-[30px] pr-10 pl-1 py-1 border-2 border-r-0 border-black align-middle">
                <b>Task</b>
              </span>
              <input
                type="text"
                className="border-black border-2 w-[80%] px-2 focus:outline-none"
                value={todoTask}
                onChange={(e) => setTodoTask(e.target.value)}
              />
              <span className="bg-gray-500 text-black h-[100%] w-[30px] ml-3 pr-10 pl-2 py-1 border-2 border-r-0 border-black align-middle">
                <b>Tag</b>
              </span>
              <input
                type="text"
                className="border-black border-2 w-[20%] px-2 mr-3 focus: outline-none"
                value={todoTag}
                placeholder=""
                onChange={(e) => setTodoTag(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="border-black border-2 bg-black text-white px-3"
              onClick={AddTodo}
            >
              Add
            </button>
            <button
              className="border-black border-2 bg-black text-white px-3"
              onClick={() => setToggleAdd(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          // ADD TODO Toggle Button
          <div>
            <button
              className="w-[100%] border-black border-2 bg-black text-white py-1"
              onClick={() => setToggleAdd(true)}
            >
              Add Todo
            </button>
          </div>
        )}
      </div>
    </>
  );
}
