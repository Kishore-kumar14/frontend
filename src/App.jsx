import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("https://backend-x1jq.onrender.com/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post("https://backend-x1jq.onrender.com/todos", { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://backend-x1jq.onrender.com/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>TODO List</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}{" "}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;