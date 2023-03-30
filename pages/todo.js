import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    setTodos([...todos, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoEdit = (id) => {
    setEditTodoId(id);
    const todo = todos.find((todo) => todo.id === id);
    setEditTodoValue(todo.text);
  };

  const handleEditInputChange = (event) => {
    setEditTodoValue(event.target.value);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editTodoId) {
        return { id: todo.id, text: editTodoValue };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoValue("");
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleFormSubmit}>
        <input
          className="inputTodo"
          type="text"
          placeholder="Enter something to do..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <ul className="itemCont">
        {todos.map((todo) => (
          <li className="items" key={todo.id}>
            {editTodoId === todo.id ? (
              <form onSubmit={handleEditFormSubmit}>
                <input
                className="change"
                  type="text"
                  value={editTodoValue}
                  onChange={handleEditInputChange}
                />
                <button className="save" type="submit">Save</button>
              </form>
            ) : (
              <>
                {todo.text}
                <button
                  className="edit"
                  onClick={() => handleTodoEdit(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleTodoDelete(todo.id)}
                >
                  Complete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

