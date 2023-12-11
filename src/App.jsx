import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // check localstorage for todos
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const displayTodos = todos.map((todo) => (
    <li key={todo.id} className="text-xl">
      {todo.task} {todo.completed ? "Completed" : "Pending"}
    </li>
  ));

  // set todos
  const [todo, setTodo] = useState("");

  const inputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = () => {
    console.log("handleSubmit called!");
    console.log(todo);

    // add todo to todos array
    setTodos((current) => [
      ...current,
      {
        id: todos.length,
        task: todo,
        completed: false,
      },
    ]);

    // reset input field
    setTodo("");
  };

  // useEffect to set to localStorage todos whenever todos is updated
  useEffect(() => {
    console.log(todos);
    const todosString = JSON.stringify(todos);
    localStorage.setItem("todos", todosString);
  }, [todos]);

  return (
    <>
      <div className="w-screen h-screen p-6">
        <div
          id="header"
          className="w-full flex flex-col space-y-4 justify-center items-center bg-slate-600 rounded-md p-4"
        >
          <h1 className="text-3xl font-bold text-slate-100">
            Jose's Todo List
          </h1>
          <div id="main-container" className="w-full flex space-x-4">
            <div className="w-full bg-slate-100 rounded-md p-4">
              <p className="text-xl font-medium text-slate-600">Tasks</p>
              <div className="">
                <ul>{displayTodos}</ul>
              </div>
              {/* map todos here */}
            </div>
            <div className="w-full bg-slate-100 rounded-md p-4">
              <p className="text-xl font-medium text-slate-600 pb-2">
                Add Task
              </p>
              <div className="flex flex-col space-y-4">
                <input
                  className="rounded-md w-full focus:outline-none p-2"
                  type="text"
                  name="todo"
                  value={todo}
                  onChange={inputChange}
                  placeholder="Todo Description Here"
                ></input>
                <button
                  className="p-4 bg-slate-600 rounded-md text-slate-100 text-xl font-medium"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
