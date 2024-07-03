import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "./TodoContainer";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdOn: string;
  tag: string;
};

export default function Todos({ userid }: { userid: string }) {
  // API Endpoints
  const fetchTodoDataURL = `http://localhost:3001/users/${userid}/todos`;
  const addTodoURL = `http://localhost:3001/users/${userid}/todos/create`;
  const updateTodoURL = `http://localhost:3001/users/${userid}/todos/update/`;
  const deleteTodoURL = `http://localhost:3001/users/${userid}/todos/delete/`;

  const [todo, setTodo] = useState<Todo>({
    id: "",
    task: "",
    createdOn: "",
    completed: false,
    tag: "",
  });
  const [todos, setTodos] = useState<Todo[]>([todo]);

  const todoTagOptions = ["Important", "Work", "Personal"];

  let [toggleAdd, setToggleAdd] = useState<boolean>(false);

  // Resposnse returns an array of todos, and this function maps the response to each todo object, then updates the state
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
      setTodosFromResponse(res.data);
    });
  }

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const AddTodo = async () => {
    await axios
      .post(addTodoURL, {
        task: todo.task,
        tag: todo.tag,
      })
      .then((res) => {
        setTodosFromResponse(res.data);
      });
    setToggleAdd(false);
  };

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
                  updateTodo={async function UpdateTodo(
                    task: string,
                    tag: string,
                    completed: boolean
                  ) {
                    await axios
                      .put(`${updateTodoURL}${todo.id}`, {
                        ...todo,
                        task: task,
                        tag: tag,
                        completed: completed ? "Yes" : "No",
                      })
                      .then((res) => {
                        setTodosFromResponse(res.data);
                      });
                  }}
                  deleteTodo={async function DeleteTodo() {
                    await axios
                      .delete(`${deleteTodoURL}${todo.id}`)
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
              {/*Task*/}
              <span className="bg-gray-500 text-black h-[100%] w-[30px] pr-10 pl-1 py-1 border-2 border-r-0 border-black align-middle">
                <b>Task</b>
              </span>
              <input
                type="text"
                className="border-black border-2 w-[80%] px-2 focus:outline-none"
                value={todo.task}
                onChange={(e) => setTodo({ ...todo, task: e.target.value })}
              />
              {/*Tag*/}
              <span className="bg-gray-500 text-black h-[100%] w-[30px] ml-3 pr-10 pl-2 py-1 border-2 border-r-0 border-black align-middle">
                <b>Tag</b>
              </span>
              <select
                className="border-black border-2 w-[20%] px-2 mr-3 focus: outline-none"
                onChange={(e) => setTodo({ ...todo, tag: e.target.value })}
              >
                <option value="">Select...</option>
                {todoTagOptions.map((tag, index) => {
                  return <option key={index}>{tag}</option>;
                })}
              </select>
            </div>
            {/*Add Todo Button*/}
            <button
              type="button"
              className="border-black border-2 bg-black text-white px-3"
              onClick={AddTodo}
            >
              Add
            </button>
            {/*Cancel Button*/}
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
