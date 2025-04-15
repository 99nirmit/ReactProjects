import React, { useState } from "react";
import "./ToDoApp.css";

let nextId = 1;

const ToDoApp = () => {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTask = () => {
    if (inputText.trim() === "") return;

    const newTask = {
      id: nextId++,
      text: inputText,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setInputText("");
  };

  const handleToggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) => 
        task.id === id ? {...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  const handleDeleteTask = (id) => {
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditValue(currentText);
  };

  const handleSave = (id) => {
    setTasks(
        tasks.map((task) => 
        task.id === id ? { ...task, text: editValue } : task
        )
    );
    setEditId(null);
    setEditValue("");
  }

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Add new task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => 
         <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
             type="checkbox" 
             checked={task.completed}
             onChange={() => handleToggleCompleted(task.id)}
             />

             {editId === task.id ? (
                <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleSave(task.id)}>💾</button>
                  </>
             ) : (
                <>
                <span>{task.text}</span>
                <div>
                    <button onClick={() => handleEdit(task.id, task.text)}>✏️</button>
                </div>
                </>
             )
            }
             <button onClick={() => handleDeleteTask(task.id)}>❌</button>
         </li> )}
      </ul>
    </div>
  );
};

export default ToDoApp;
