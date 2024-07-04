import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "./TodoContainer";
import TodoTableHeader from "./TodoTableHeader";
import AddTodoForm from "./AddTodoForm";
import { DashboardButton } from "../atoms/Buttons";

type Todo = {
  _id: string;
  task: string;
  completed: boolean;
  createdOn: string;
  tag: string;
};

type UpdatedTodo = {
  task: string;
  tag: string;
  completed: boolean;
};

export default function Todos({ userid }: { userid: string }) {
  // API Endpoints
  const fetchTodoDataURL: string = `http://localhost:3001/users/${userid}/todos`;
  const addTodoURL: string = `http://localhost:3001/users/${userid}/todos/create`;
  const updateTodoURL: string = `http://localhost:3001/users/${userid}/todos/update/`;
  const deleteTodoURL: string = `http://localhost:3001/users/${userid}/todos/delete/`;

  const [todo, setTodo] = useState<Todo>({
    _id: "",
    task: "",
    createdOn: "",
    completed: false,
    tag: "",
  });
  const [todos, setTodos] = useState<Todo[]>([todo]);

  const todoTagOptions: string[] = ["Important", "Work", "Personal"];

  // Toggle showing the add todo form
  let [toggleAdd, setToggleAdd] = useState<boolean>(false);

  // Resposnse returns an array of todos, and this function maps the response to each todo object, then updates the state
  const setTodosFromResponse = (todoResponse: Todo[]) => {
    const newTodos = todoResponse.map((todo: Todo) => ({
      _id: todo._id,
      task: todo.task,
      completed: todo.completed,
      createdOn: todo.createdOn,
      tag: todo.tag,
    }));
    setTodos(newTodos);
  };

  const CancelButtonClicked = () => {
    ResetTodoInputFields();
    setToggleAdd(false);
  };
  const ResetTodoInputFields = () => {
    setTodo({
      _id: "",
      task: "",
      createdOn: "",
      completed: false,
      tag: "",
    });
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
      })
      .catch((err) => console.log(err));
    setToggleAdd(false);
    ResetTodoInputFields();
  };

  return (
    <>
      <div>
        <div className="mx-auto">
          <TodoTableHeader />
          {todos ? (
            todos.map((todo) => {
              return (
                <div key={todo._id}>
                  <TodoContainer
                    task={todo.task}
                    createdOn={todo.createdOn}
                    completed={todo.completed}
                    tag={todo.tag}
                    updateTodo={async function UpdateTodo(
                      updatedTodo: UpdatedTodo
                    ) {
                      await axios
                        .put(`${updateTodoURL}${todo._id}`, {
                          ...todo,
                          task: updatedTodo.task,
                          tag: updatedTodo.tag,
                          completed: updatedTodo.completed ? "Yes" : "No",
                        })
                        .then((res) => {
                          setTodosFromResponse(res.data);
                        })
                        .catch((err) => console.log(err));
                    }}
                    deleteTodo={async function DeleteTodo() {
                      await axios
                        .delete(`${deleteTodoURL}${todo._id}`)
                        .then((res) => {
                          setTodosFromResponse(res.data);
                        })
                        .catch((err) => console.log(err));
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div>No Todos Found! Click the ADD TODO button to get started!</div>
          )}
        </div>
        {/*Add TODO Container*/}
        <div className="my-2 w-[100%] py-1">
          {toggleAdd ? (
            // ADD TODO Form
            <AddTodoForm
              TodoTagOptions={todoTagOptions}
              Todo={todo}
              SetTodo={setTodo}
              AddTodo={AddTodo}
              CancelAddTodo={CancelButtonClicked}
            />
          ) : (
            // ADD TODO Toggle Button
            <div>
              <DashboardButton
                type="AddTodoToggle"
                onClick={() => setToggleAdd(true)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
