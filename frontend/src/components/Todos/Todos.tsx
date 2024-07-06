import { useState, useEffect } from "react";
import axios from "axios";
import { TodoContainer } from "./TodoContainer";
import TodoTableHeader from "./TodoTableHeader";
import AddTodoForm from "./AddTodoForm";
import { DashboardButton } from "../atoms/Buttons";
import Loading from "../atoms/Loading";

type Todo = {
  _id: string;
  task: string;
  tag: string;
  createdOn: string;
  completed: boolean;
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [todosPerPage, setTodosPerPage] = useState<number>(5);
  const todosPerPageOptions = [];

  // Set the values for todosPerPageOptions
  const maxTodosPerPage = 20;
  const todosPerPageIncrement = 5;
  for (let i = 0; i <= maxTodosPerPage; i += todosPerPageIncrement) {
    if (i % todosPerPageIncrement === 0 && i !== 0) {
      todosPerPageOptions.push(i);
    }
  }

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
    setIsLoading(true);

    await axios
      .get(fetchTodoDataURL)
      .then((res) => {
        setTodosFromResponse(res.data);
        setIsLoading(false);
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

  // Logic for pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* Disables all elements of the TODO UI until data loads */}
      {!isLoading ? (
        <div>
          {/* Todo List, Search, and Todos Per Page Select Option Container */}
          <div className="mx-auto">
            {/* Todos Per Page Select Option Container */}
            <div className="mb-2">
              <span>
                <select
                  className="w-[5%] p-[6.5px] pt-[9.5px] font-bold text-center font-mono border-black border-2 border-r-0 bg-gray-400 hover:cursor-pointer hover:bg-white focus:outline-none focus:bg-white appearance-none "
                  onChange={(e) => {
                    let number = Number(e.target.value);
                    setTodosPerPage(number);
                  }}
                >
                  {todosPerPageOptions.map((numberOfTodos) => {
                    return (
                      <option
                        className="bg-gray-500 text-white"
                        key={numberOfTodos}
                        value={numberOfTodos}
                      >
                        {numberOfTodos}
                      </option>
                    );
                  })}
                </select>
              </span>
              {/* Search selection filter */}
              <select
                className="w-[15%] p-[6.5px] pt-[9.5px] font-bold text-center font-mono border-black border-2 border-r-0 bg-gray-400 hover:cursor-pointer hover:bg-white focus:outline-none focus:bg-white appearance-none "
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option
                  selected
                  disabled
                  hidden
                  className="bg-gray-500 text-white"
                  value=""
                >
                  Search By:
                </option>
                <option className="bg-gray-500 text-white " value="">
                  No Filter
                </option>
                <option className="bg-gray-500 text-white" value="task">
                  Task
                </option>
                <option className="bg-gray-500 text-white" value="tag">
                  Tag
                </option>
                <option className="bg-gray-500 text-white" value="completed">
                  Completed
                </option>
                <option className="bg-gray-500 text-white" value="notCompleted">
                  Not Completed
                </option>
              </select>
              {/* Search Text Input */}
              <input
                type="text"
                className="w-[80%] p-2 border-black border-2 bg-gray-400 text-black focus:outline-none focus:bg-white"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <TodoTableHeader />
            {/* Todo List */}
            {todos ? (
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
                  // Search all todos if no selection is provided
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
                .slice(indexOfFirstTodo, indexOfLastTodo)
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
            )}
            <div className="flex flex-row justify-center mt-5">
              <span>
                <button
                  className="w-10 h-10 border-black border-2 border-r-0 bg-white text-black font-mono font-bold hover:bg-black hover:text-white"
                  onClick={() => {
                    currentPage > 1
                      ? setCurrentPage(currentPage - 1)
                      : setCurrentPage(1);
                  }}
                >
                  L
                </button>
              </span>
              <>
                {pageNumbers.map((number) => {
                  return (
                    <span key={number}>
                      <button
                        onClick={() => setCurrentPage(number)}
                        className={
                          currentPage === number
                            ? "border-2 border-black border-r-0 w-10 h-10 bg-black text-white font-mono"
                            : "border-2 border-black border-r-0 w-10 h-10 bg-white text-black font-mono hover:bg-black hover:text-white"
                        }
                      >
                        {number}
                      </button>
                    </span>
                  );
                })}
              </>
              <span>
                <button
                  className="w-10 h-10 border-black border-2 bg-white text-black font-mono font-bold hover:bg-black hover:text-white"
                  onClick={() => {
                    currentPage < pageNumbers.length
                      ? setCurrentPage(currentPage + 1)
                      : setCurrentPage(pageNumbers.length);
                  }}
                >
                  R
                </button>
              </span>
            </div>
          </div>
          {/*Add TODO Container 
          - Shows the form when the add button is clicked and 
            hides it when add or cancel button is clicked*/}
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
      ) : (
        <span>
          <Loading text={"Loading Todos... Please Wait"} />
        </span>
      )}
    </>
  );
}
