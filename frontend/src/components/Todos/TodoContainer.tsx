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
  completed: string;
  createdOn: string;
  tag: string;
  updateTodoTask: (updatedTask: string) => void;
  updateTodoCompleted: (updateCompleted: string) => void;
  updateTodoTag: (updateTag: string) => void;
  deleteTodo: () => void;
};

export const TodoContainer: React.FC<TodoContainerProps> = ({
  task,
  completed,
  createdOn,
  tag,
  updateTodoTask,
  updateTodoCompleted,
  updateTodoTag,
  deleteTodo,
}) => {
  let [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [todoCompleted, setTodoCompleted] = useState(
    completed === "Yes" ? true : false
  );
  const [editTask, setEditTask] = useState<string>(task);

  const todoTagOptions = ["Important", "Work", "Personal"];

  return (
    <>
      {!toggleEdit ? (
        // Todo Box
        <div className="flex flex-row bg-gray-400 border-black border-2 border-t-0 justify-start min-w-[65vw] min-h-[5vh] max-h-[10vh]">
          {/*Task Container*/}
          <span className="min-w-[30vw] my-auto px-3 flex-wrap flex-grow flex-shrink">
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
          <span className="flex justify-center min-w-[10vw] my-auto px-5">
            {completed ? (
              <span>
                <del>{createdOn}</del>
              </span>
            ) : (
              <span>{createdOn}</span>
            )}
          </span>
          {/*Tag Container*/}
          <span className="min-w-[10vw] flex flex-row justify-center">
            <span className="p-1 text-xs min-h-5 text-white flex ">
              {completed ? (
                <span
                  className={
                    !tag ? "" : "bg-black rounded-sm text-white p-1 my-auto"
                  }
                >
                  <del>{tag}</del>
                </span>
              ) : (
                <span
                  className={
                    !tag ? "" : "bg-black rounded-sm text-white p-1 my-auto"
                  }
                >
                  {tag}
                </span>
              )}
            </span>
          </span>
          {/*Edit | Delete | Completed Checkbox Container*/}
          <span className="flex flex-row flex-grow gap-5 justify-center items-center min-w-[5vw] px-1">
            {/*Edit Todo Button*/}
            <span
              className="hover: cursor-pointer"
              onClick={() => setToggleEdit(true)}
            >
              <BsPencilSquare />
            </span>
            {/*Delete Todo Button*/}
            <span className="hover: cursor-pointer" onClick={deleteTodo}>
              <BsFillTrashFill />
            </span>
            {/*Completed Check Mark*/}
            <span
              className="hover: cursor-pointer"
              onClick={async () => {
                setTodoCompleted(!todoCompleted);
                updateTodoCompleted(todoCompleted ? "Yes" : "No");
              }}
            >
              <BsClipboard2CheckFill />
            </span>
          </span>
        </div>
      ) : (
        // Update Todo Task and Tag Container
        <div className="flex flex-row bg-gray-400 min-w-[65vw] min-h-[5vh] max-h-[10vh] ">
          {/*Update Task*/}
          <span className="flex min-w-[80%] justify-start items-center ">
            <input
              type="text"
              className="w-[90%] h-[95%] bg-transparent px-2 focus:outline-none"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
            {/*Update Tag*/}
            <select
              onChange={(e) => updateTodoTag(e.target.value)}
              className="w-[30%] h-[95%] bg-white px-2 focus:outline-none "
            >
              <option>Select a tag...</option>
              {todoTagOptions.map((tag, index) => {
                return <option key={index}>{tag}</option>;
              })}
            </select>
          </span>
          {/*Buttons Container*/}
          <span className="flex flex-row gap-3 items-center min-w-[20%] pl-7 ">
            {/*Submit Todo Button*/}
            <span
              className="hover:cursor-pointer"
              onClick={async () => {
                updateTodoTask(editTask);
                setToggleEdit(false);
              }}
            >
              <BsCheckSquareFill size={25} />
            </span>
            {/*Cancel Edit Button*/}
            <span className="">
              <BsFillXSquareFill
                size={25}
                className="hover:cursor-pointer"
                onClick={() => setToggleEdit(false)}
              />
            </span>
          </span>
        </div>
      )}
    </>
  );
};
