import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsCheckSquareFill,
  BsFillXSquareFill,
} from "react-icons/bs";
import { useState } from "react";

type TodoContainerProps = {
  task: string;
  completed: string;
  createdOn: string;
  tags: [];
  updateTodo: (todo: any) => void;
  deleteTodo: () => void;
};

export const TodoContainer: React.FC<TodoContainerProps> = ({
  task,
  completed,
  createdOn,
  tags,
  updateTodo,
  deleteTodo,
}) => {
  let [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const [editTask, setEditTask] = useState<string>("");

  return (
    <>
      {!toggleEdit ? (
        // Todo Box
        <div className="flex flex-row border-red-600 border-2 justify-start min-w-[60vw] min-h-[7vh]">
          {/*Completed Checkbox Container*/}
          <span className="border-blue-600 border-2 min-w-[5vw] text-center py-1">
            {completed ? "Yes" : "No"}
          </span>
          {/*Task Container*/}
          <span className="border-green-600 border-2 min-w-[30vw] py-1 pl-1">
            {task}
          </span>
          {/*Creation Date Container*/}
          <span className="border-yellow-600 border-2 min-w-[10vw] py-1 pl-1">
            {createdOn}
          </span>
          {/*Tags Container*/}
          <span className="border-black border-2 min-w-[10vw] pl-1 py-1">
            {tags.map((tag) => {
              return (
                <span className=" bg-black rounded-md p-0.5 text-xs h-5 text-white my-auto">
                  {tag}
                </span>
              );
            })}
          </span>
          {/*Edit | Delete Container*/}
          <span className="border-purple-600 border-2 flex flex-row gap-5 justify-center items-center min-w-[5vw]">
            <span
              className="hover: cursor-pointer"
              onClick={() => setToggleEdit(!toggleEdit)}
            >
              <BsFillPencilFill />
            </span>
            <span className="hover: cursor-pointer" onClick={deleteTodo}>
              <BsFillTrashFill />
            </span>
          </span>
        </div>
      ) : (
        <div className="flex flex-row border-red-600 border-2 justify-start min-w-[60vw] min-h-[7vh]">
          <span className="flex min-w-[50vw] justify-center items-center border-green-500 border-2">
            <input
              type="text"
              className="border-black border-2 w-[95%] h-[95%] border-solid rounded-md"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
          </span>
          <span className="border-blue-500 border-2 flex flex-row gap-3 justify-center items-center px-2 min-w-[10vw]">
            <span
              className="hover:cursor-pointer"
              onClick={() => setToggleEdit(false)}
            >
              <BsCheckSquareFill size={25} />
            </span>
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
