import React from 'react'

export const ToDoItem = ({task, onDelete}) => {
  return (
    <li>
        {task}
        <button onClick={onDelete}>Delete</button>
    </li>
  );
}
