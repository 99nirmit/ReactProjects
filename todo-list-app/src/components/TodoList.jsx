import React, { useState } from 'react'
import { ToDoItem } from './ToDoItem';

export const TodoList = () => {
    
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if(input.trim()){
            setTodos([...todos, input]);
            setInput('');
        }
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i != index));
    };

  return (
    <div>
        <input value={input} onChange={(e) => setInput(e.target.value)}/>
        <button onClick={addTodo}>Add</button>
        <ul>
            {todos.map((task, index) => (
                <ToDoItem
                key={index}
                task={task}
                onDelete={() => deleteTodo(index)}
                />
            ))}
        </ul>
    </div>
  );
}
