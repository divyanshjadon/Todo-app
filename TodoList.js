import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const save = () => {
    if (value.trim()) {
      onEdit(todo._id, { title: value.trim() });
      setEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo._id, { completed: !todo.completed })} />
      {editing ? (
        <>
          <input value={value} onChange={e => setValue(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={() => { setEditing(false); setValue(todo.title); }}>Cancel</button>
        </>
      ) : (
        <>
          <span onDoubleClick={() => setEditing(true)}>{todo.title}</span>
          <div className="actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) return <p>No todos yet. Add one!</p>;
  return (
    <ul className="todo-list">
      {todos.map(t => <TodoItem key={t._id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)}
    </ul>
  );
}
