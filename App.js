import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (title) => {
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ title })
    });
    const newTodo = await res.json();
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = async (id, updates) => {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(updates)
    });
    const updated = await res.json();
    setTodos(prev => prev.map(t => t._id === updated._id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> :
        <TodoList todos={todos} onToggle={updateTodo} onDelete={deleteTodo} onEdit={updateTodo} />
      }
    </div>
  );
}

export default App;
