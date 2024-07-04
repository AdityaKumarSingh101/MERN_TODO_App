const TodoTableHeader = () => {
  return (
    <div className="min-w-[65vw] min-h-8 border-black border-2 flex flex-row justify-start flex-grow gap-0">
      <div className="min-w-[31vw] my-auto px-3 font-mono ">
        <b>Task</b>
      </div>
      <div className="flex justify-end my-auto font-mono min-w-[18vw] pr-5">
        <b>Created On</b>
      </div>
      <div className="min-w-[15vw] flex justify-center">
        <b>Tag</b>
      </div>
      <div className="flex flex-row flex-grow justify-center min-w-[18vw]">
        <b>Actions</b>
      </div>
    </div>
  );
};

export default TodoTableHeader;
