import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const fetchTodos = () => {
    fetch('/todos')
    .then(res => res.json())
    .then(resJson => setTodos(resJson))
  }

  const addTodo = (id) => {
    const bodyObject = {
      id: id,
      desc: input
    }

    fetch('/addTodo', {
      method: 'POST',
      body: JSON.stringify(bodyObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(resJson => console.log(resJson))
  }

  useEffect(fetchTodos, [])

  return (
    <div className="App">
      {todos.map((todo, index) => <h2 key={index}>id:{todo.id}<br />{todo.desc}</h2>)}

      <input type="text" value={input} placeholder="enter description" onChange={event => setInput(event.target.value)}/>
      <button onClick={() => addTodo(todos[todos.length - 1].id + 1)}>add todo</button>
    </div>
  );
}

export default App;
