type AddTodoFormProps = {
  TodoTagOptions: string[];
  AddTodo: () => void;
  Todo: any;
  SetTodo: (todo: any) => void;
  CancelAddTodo: () => void;
};

export default function AddTodoForm({
  TodoTagOptions,
  AddTodo,
  CancelAddTodo,
  Todo,
  SetTodo,
}: AddTodoFormProps) {
  return (
    <>
      <div className="flex flex-row gap-2 w-[100%]">
        {/*Task and Tag*/}
        <div className="flex flex-grow">
          {/*Task*/}
          <span className="bg-gray-500 font-mono text-black h-[100%] w-[30px] pr-10 pl-1 py-1 border-2 border-r-0 border-black align-middle">
            <b>Task</b>
          </span>
          <input
            type="text"
            className="bg-gray-300 border-black border-2 w-[80%] px-2 focus:outline-none focus:bg-white"
            value={Todo.task}
            onChange={(e) => SetTodo({ ...Todo, task: e.target.value })}
          />
          {/*Tag*/}
          <span className="bg-gray-500 text-black font-mono h-[100%] w-[30px] ml-3 pr-10 pl-2 py-1 border-2 border-r-0 border-black align-middle">
            <b>Tag</b>
          </span>
          <select
            className="bg-gray-300 border-black border-2 w-[20%] px-2 mr-3 focus:outline-none focus:bg-white"
            onChange={(e) => SetTodo({ ...Todo, tag: e.target.value })}
          >
            <option value="">Select...</option>
            {TodoTagOptions.map((tag, index) => {
              return <option key={index}>{tag}</option>;
            })}
          </select>
        </div>
        {/*Add Todo Button*/}
        <button
          type="button"
          className="border-black border-2 bg-black text-white px-3 font-mono font-bold hover:bg-white hover:text-black hover:cursor-pointer"
          onClick={AddTodo}
        >
          Add
        </button>
        {/*Cancel Button*/}
        <button
          className="border-black border-2 bg-black text-white px-3 font-mono font-bold hover:bg-white hover:text-black hover:cursor-pointer"
          onClick={CancelAddTodo}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
