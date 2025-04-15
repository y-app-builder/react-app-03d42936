import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo"
          style={{
            flex: 1,
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px 0 0 4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                border: '1px solid #eee',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : '#000',
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      
      {todos.length > 0 && (
        <div style={{ marginTop: '20px', textAlign: 'right', color: '#666' }}>
          <p>{todos.filter(todo => todo.completed).length} completed / {todos.length} total</p>
        </div>
      )}
    </div>
  );
};

export default App;