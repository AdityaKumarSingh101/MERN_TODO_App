import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "./TodoContainer";

type Todos = [
  {
    id: string;
    task: string;
    completed: string;
    createdOn: string;
    tag: string;
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
      tag: "",
    },
  ]);

  const [todoTask, setTodoTask] = useState<string>("");

  const [todoTag, setTodoTag] = useState<string>("");
  const todoTagOptions = ["Important", "Work", "Personal"];

  let [toggleAdd, setToggleAdd] = useState<boolean>(false);

  const setTodosFromResponse = (todoResponse: any) => {
    const newTodos = todoResponse.map((todo: any) => ({
      id: todo._id,
      task: todo.task,
      completed: todo.completed,
      createdOn: todo.createdOn,
      tag: todo.tag,
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
        tag: todoTag,
      })
      .then((res) => {
        setTodosFromResponse(res.data);
      });
    setToggleAdd(false);
    setTodoTag("");
    setTodoTask("");
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
                  tag={todo.tag}
                  updateTodoTask={async (task: string) => {
                    await axios
                      .put(
                        `http://localhost:3001/users/${userid}/todos/update/${todo.id}`,
                        {
                          id: todo.id,
                          task: task,
                          completed: todo.completed,
                          createdOn: todo.createdOn,
                          tag: todo.tag,
                        }
                      )
                      .then((res) => {
                        const todoResponse = res.data;
                        setTodosFromResponse(todoResponse);
                      });
                  }}
                  updateTodoTag={async (tag: string) => {
                    await axios
                      .put(
                        `http://localhost:3001/users/${userid}/todos/update/${todo.id}`,
                        {
                          id: todo.id,
                          task: todo.task,
                          completed: todo.completed,
                          createdOn: todo.createdOn,
                          tag: tag,
                        }
                      )
                      .then((res) => {
                        setTodosFromResponse(res.data);
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
                          tag: todo.tag,
                        }
                      )
                      .then((res) => {
                        setTodosFromResponse(res.data);
                      });
                  }}
                  deleteTodo={async () => {
                    await axios
                      .delete(
                        `http://localhost:3001/users/${userid}/todos/delete/${todo.id}`
                      )
                      .then((res) => {
                        setTodosFromResponse(res.data);
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
              <select
                className="border-black border-2 w-[20%] px-2 mr-3 focus: outline-none"
                onChange={(e) => setTodoTag(e.target.value)}
              >
                <option value="">Select...</option>
                {todoTagOptions.map((tag, index) => {
                  return <option key={index}>{tag}</option>;
                })}
              </select>
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
