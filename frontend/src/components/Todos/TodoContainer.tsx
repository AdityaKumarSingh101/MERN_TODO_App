import {
  BsPencilSquare,
  BsFillTrashFill,
  BsCheckSquareFill,
  BsFillXSquareFill,
  BsClipboard2CheckFill,
} from "react-icons/bs";
import { useState } from "react";

type TodoContainerProps = {
  task: string;
  completed: boolean;
  createdOn: string;
  tag: string;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: () => void;
};

type Todo = {
  task: string;
  tag: string;
  completed: boolean;
};

export const TodoContainer = ({
  task,
  completed,
  createdOn,
  tag,
  updateTodo,
  deleteTodo,
}: TodoContainerProps) => {
  let [toggleEdit, setToggleEdit] = useState<boolean>(false);

  // Used to store the state of the todo being updated,
  const [updatedTodo, setUpdatedTodo] = useState<Todo>({
    task: task,
    tag: tag,
    completed: completed,
  });

  // Tag Options List
  const todoTagOptions = ["Important", "Work", "Personal"];

  return (
    <>
      {!toggleEdit ? (
        // Todo Box
        <div className="grid grid-flow-row grid-cols-6 gap-5 border-black border-2 border-t-0 bg-gray-300 items-center">
          {/*Task Container*/}
          <span className="col-span-3 pl-5 ">
            {completed ? (
              <span>
                <del>
                  <b>{task}</b>
                </del>
              </span>
            ) : (
              <span>
                <b>{task}</b>
              </span>
            )}
          </span>
          {/*Creation Date Container*/}
          <span className="col-span-1">
            {completed ? (
              <span>
                <del>{createdOn}</del>
              </span>
            ) : (
              <span>{createdOn}</span>
            )}
          </span>
          {/*Tags Container*/}
          <span className="col-span-1 p-1 text-xs min-h-5 text-white flex">
            {completed ? (
              <span
                className={
                  !tag
                    ? ""
                    : "bg-black rounded-sm text-white p-1 my-auto mx-auto"
                }
              >
                <del>{tag}</del>
              </span>
            ) : (
              <span
                className={
                  !tag ? "" : "bg-black rounded-sm text-white p-1 m-auto"
                }
              >
                {tag}
              </span>
            )}
          </span>
          {/*Edit | Delete | Completed Checkbox Container*/}
          <span className="col-span-1 flex flex-row flex-grow gap-5 justify-start items-center min-w-[5vw] pr-5">
            {/*Edit Todo Button*/}
            <span
              className="hover:cursor-pointer hover:bg-black rounded-md p-1"
              onClick={() => setToggleEdit(true)}
            >
              <BsPencilSquare className="hover:text-white" />
            </span>
            {/*Delete Todo Button*/}
            <span
              className="hover:cursor-pointer hover:bg-black rounded-md p-1"
              onClick={deleteTodo}
            >
              <BsFillTrashFill className="hover:text-white" />
            </span>
            {/*Completed Check Mark*/}
            <span
              className="hover:cursor-pointer hover:bg-black rounded-md p-1"
              onClick={() => {
                setUpdatedTodo({ ...updatedTodo, completed: !completed });
                updateTodo(updatedTodo);
              }}
            >
              <BsClipboard2CheckFill className="hover:text-white" />
            </span>
          </span>
        </div>
      ) : (
        // Update Todo Container
        <div className="grid grid-cols-6 bg-gray-300 border-black border-2 border-t-0 py-2">
          {/*Update Task and Tag*/}
          <span className="col-span-5 flex flex-row">
            <input
              type="text"
              className="w-[100%] ml-5 bg-gray-300 focus:outline-none"
              value={updatedTodo.task}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, task: e.target.value })
              }
            />
            {/*Update Tag*/}
            <select
              className="bg-transparent border-none appearance-auto hover:cursor-pointer focus:outline-none px-2"
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, tag: e.target.value })
              }
            >
              <option className="" selected disabled hidden>
                Select a tag...
              </option>
              {todoTagOptions.map((tag, index) => {
                return (
                  <option className="bg-gray-500 text-white" key={index}>
                    {tag}
                  </option>
                );
              })}
            </select>
          </span>
          {/*Buttons Container*/}
          <span className="col-span-1 flex flex-row gap-5 justify-center">
            {/*Submit Updated Todo Button*/}
            <span
              className="hover:cursor-pointer hover:bg-black rounded-md p-1"
              onClick={async () => {
                updateTodo(updatedTodo);
                setToggleEdit(false);
              }}
            >
              <BsCheckSquareFill size={25} className="hover:text-white" />
            </span>
            {/*Cancel Edit Button*/}
            <span className="hover:cursor-pointer hover:bg-black rounded-md p-1">
              <BsFillXSquareFill
                size={25}
                className="hover:text-white "
                onClick={() => setToggleEdit(false)}
              />
            </span>
          </span>
        </div>
      )}
    </>
  );
};
