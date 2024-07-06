type Todo = {
  _id: string;
  task: string;
  tag: string;
  createdOn: string;
  completed: boolean;
};

export default function filterTodos(
  todo: Todo,
  searchBy: string,
  searchText: string
) {
  console.log(searchText);
  // Filter function for searching todos by search type
  if (searchBy === "task") {
    return searchText
      ? todo.task.toLowerCase().includes(searchText.toLowerCase())
      : true;
  } else if (searchBy === "tag") {
    return searchText
      ? todo.tag.toLowerCase().includes(searchText.toLowerCase())
      : true;
  } else if (searchBy === "completed") {
    return todo.completed === true;
  } else if (searchBy === "notCompleted") {
    return todo.completed === false;
  }
  // Search all todos if no selection is provided
  else if (searchBy === "") {
    return searchText
      ? todo.task.toLowerCase().includes(searchText.toLowerCase()) ||
          todo.tag.toLowerCase().includes(searchText.toLowerCase())
      : true;
  }
  // Return all todos if no search text is provided
  else {
    return true;
  }
}
