import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "./TodoContainer";
import TodoTableHeader from "./TodoTableHeader";
import AddTodoForm from "./AddTodoForm";
import { DashboardButton } from "../atoms/Buttons";

import "./loading-spinner.css";

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

  // Todo state variables
  const [todo, setTodo] = useState<Todo>({
    _id: "",
    task: "",
    createdOn: "",
    completed: false,
    tag: "",
  });
  const [todos, setTodos] = useState<Todo[]>([todo]);

  // Tag options for todos
  const todoTagOptions: string[] = ["Important", "Work", "Personal"];

  // Used to display a loading state in the UI when the data is being fetched
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Search state variables
  const [searchText, setSearchText] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("");

  // Toggle showing the add todo form
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);

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

  // Hide the add todo form and reset the add todo inout fields
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

  // Fetch all todos from backend
  async function fetchAllTodos() {
    // Adding artificial delay to test loading state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    await axios
      .get(fetchTodoDataURL)
      .then((res) => {
        setTodosFromResponse(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Display all todos after each render
  useEffect(() => {
    fetchAllTodos();
  }, []);

  // Function to add todos, recieves the add todo state data and sends in to the backend API
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
        {/* Todo List and Search Container */}
        <div className="mx-auto">
          {/* Search Container */}
          {!isLoading ? (
            <div className="mb-2">
              {/* Search selection filter */}
              <select
                className="w-[20%] p-[8.5px] border-black border-2 border-r-0 bg-gray-400 focus:outline-none focus:bg-white select:selected:bg-blue-500"
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="">
                  <b>Select</b>
                </option>
                <option value="task">Task</option>
                <option value="tag">Tag</option>
                <option value="completed">Completed</option>
                <option value="notCompleted">Not Completed</option>
              </select>
              {/* Search Text Input */}
              <input
                type="text"
                className="w-[80%] p-2 border-black border-2 bg-gray-400 text-black focus:outline-none focus:bg-white"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          ) : (
            <span></span>
          )}
          <TodoTableHeader />
          {/* Todo List */}
          {!isLoading ? (
            todos ? (
              todos
                .filter((todo) => {
                  // Filter function for searching todos by search type
                  if (searchBy === "task") {
                    return searchText
                      ? todo.task
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true;
                  } else if (searchBy === "tag") {
                    return searchText
                      ? todo.tag
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true;
                  } else if (searchBy === "completed") {
                    return todo.completed === true;
                  } else if (searchBy === "notCompleted") {
                    return todo.completed === false;
                  }
                  // Seach all todos if no selection is provided
                  else if (searchBy === "") {
                    return searchText
                      ? todo.task
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                          todo.tag
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                      : true;
                  }
                  // Return all todos if no search text is provided
                  else {
                    return true;
                  }
                })
                .map((todo) => {
                  return (
                    <div key={todo._id}>
                      <TodoContainer
                        task={todo.task}
                        createdOn={todo.createdOn}
                        completed={todo.completed}
                        tag={todo.tag}
                        updateTodo={
                          // Function to update the selected todo
                          async function UpdateTodo(updatedTodo: UpdatedTodo) {
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
                          }
                        }
                        deleteTodo={
                          // Function to delete the selected todo
                          async function DeleteTodo() {
                            await axios
                              .delete(`${deleteTodoURL}${todo._id}`)
                              .then((res) => {
                                setTodosFromResponse(res.data);
                              })
                              .catch((err) => console.log(err));
                          }
                        }
                      />
                    </div>
                  );
                })
            ) : (
              <span>
                No Todos Found. Click the Add todos button to get started!
              </span>
            )
          ) : (
            // Loading State display
            <div className="flex flex-row font-mono font-bold border-black border-2 justify-center items-center">
              {/* Loading spinner container */}
              <span className="pt-2 mr-2">
                <div id="loading-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </span>
              Loading Todos.... Please wait
            </div>
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
          ) : !isLoading ? (
            // ADD TODO Toggle Button
            <div>
              <DashboardButton
                type="AddTodoToggle"
                onClick={() => setToggleAdd(true)}
              />
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
}
