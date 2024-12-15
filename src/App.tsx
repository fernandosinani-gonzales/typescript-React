import { useEffect, useState } from 'react'

import './App.css'

interface AttTodo {
  id: string;
  text: string;
  gjorda: boolean;
}

function loadTask(): AttTodo[] {
  const storedTasks = localStorage.getItem('todos');
  return storedTasks ? JSON.parse(storedTasks) : []
}
function updaStorage(todos: AttTodo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos))
}


function App() {

  const [todos, setTodos] = useState<AttTodo[]>(() => loadTask());
  const [newTodo, setNewTodo] = useState('');

  const tilläggaTodo = () => {
    if (newTodo !== '') {
      const nyId = crypto.randomUUID();
      const nyTodoItem: AttTodo = {
        id: nyId,
        text: newTodo,
        gjorda: false,
      };
      setTodos([...todos, nyTodoItem]);
      setNewTodo('');
    }
  }
  const tabortTodo = (id: string) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updateTodos)


  }
  const toggleGjort = (id: string) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, gjorda: !todo.gjorda };
      }
      return todo;
    })
    setTodos(updateTodos)
  }
  useEffect(() => {
    updaStorage(todos)
  }, [todos])


  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to My React App Todo</h1>
        Jag har repeterat typescript och kom fram på att jag kunde lika gärna använda type eller interface.
        och efter return har jag bara tänkt på javascript och likaså på localstorage
        <div className="input-group">
          <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={tilläggaTodo}>Lägg till</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className='todo-item'>
              <input type='checkbox' checked={todo.gjorda} onChange={() => toggleGjort(todo.id)} />
              {/* <span className='todo-text' style={{ textDecoration: todo.gjorda ? 'line-through' : 'none' }}>
                {todo.text}

              </span> */}

              <span className={`todo-text ${todo.gjorda ? 'completed' : ''}`}>
                {todo.text}
              </span>
              <button onClick={() => tabortTodo(todo.id)}>Ta bort</button>

            </li>

          ))}

        </ul>
      </div>
    </>
  )
}

export default App
