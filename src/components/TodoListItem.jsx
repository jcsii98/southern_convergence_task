import { useState } from "react";

// react icons
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { PiTrashLight } from "react-icons/pi";

export default function TodoListItem(props) {
  const { todo, todos, setTodos } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.task);

  const handleTaskClicked = () => {
    setIsEditing(true);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit Called!");
    // check if input is ''
    if (editValue === "") {
      console.log("Invalid edit value");
    } else {
      const newArr = [...todos];
      newArr.forEach((task) => {
        if (task.id === todo.id) {
          console.log(task);
          console.log(editValue);
          task.task = editValue;
        }
      });
      setTodos(newArr);
    }
    setIsEditing(false);
  };

  const handleCheckboxClicked = () => {
    console.log(todo);

    const newArr = [...todos];
    newArr.forEach((task) => {
      if (task.id === todo.id) {
        console.log(task.id);
        if (task.completed) {
          task.completed = false;
        } else {
          task.completed = true;
        }
      }
    });

    setTodos(newArr);
  };

  const handleDeleteClicked = () => {
    console.log(todo);

    const newArr = todos.filter((x) => {
      return x.id !== todo.id;
    });

    console.log(newArr);
    setTodos(newArr);
  };

  return (
    <>
      <li
        key={todo.id}
        className="text-xl flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center py-2">
          <div className="">
            {/* checkbox */}
            {todo.completed ? (
              <RiCheckboxBlankCircleFill onClick={handleCheckboxClicked} />
            ) : (
              <RiCheckboxBlankCircleLine onClick={handleCheckboxClicked} />
            )}
          </div>

          <div
            onClick={handleTaskClicked}
            className={`${todo.completed && "line-through"} pl-4 py-2`}
          >
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="bg-[#00000000] w-full focus:outline-none"
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                ></input>
              </form>
            ) : (
              <>{todo.task}</>
            )}
          </div>
        </div>

        {/* delete button */}
        <PiTrashLight onClick={handleDeleteClicked} />
      </li>
    </>
  );
}
