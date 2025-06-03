import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <form onSubmit={addTodo} className="flex w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Add new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow p-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

      <div className="flex space-x-4 mb-4">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="w-full max-w-md bg-white rounded shadow p-4 space-y-2 max-h-96 overflow-auto">
        {filteredTodos.length === 0 && (
          <li className="text-center text-gray-400">No tasks found.</li>
        )}

        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between"
          >
            <label className="flex items-center space-x-3 cursor-pointer flex-grow">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.text}
              </span>
            </label>

            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700 ml-2"
              aria-label="Remove task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

