const TodoTableHeader = () => {
  return (
    <div className="grid grid-flow-row grid-cols-6 gap-5 border-black border-2 items-center ">
      <div className="col-span-3 pl-5">
        <b>Task</b>
      </div>
      <div className="col-span-1">
        <b>Created On</b>
      </div>
      <div className="col-span-1 text-center">
        <b>Tag</b>
      </div>
      <div className="col-span-1 text-center pr-5">
        <b>Actions</b>
      </div>
    </div>
  );
};

export default TodoTableHeader;
