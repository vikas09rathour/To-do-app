import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

export default function ToDoList() {

  // ✅ Load from localStorage
  let [todos, setTodos] = useState(() => {
    let saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  let [newTodo, setNewTodo] = useState("");
  let [datetime,setdatetime]=useState("");
  let [filter, setFilter] = useState("all");

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Add task
  let addNewTask = () => {
    if (newTodo.trim() === "") return;

    setTodos(prev => [
      ...prev,
      { task: newTodo, id: uuidv4(), isDone: false }
    ]);

    setNewTodo("");
  };

  // ✅ Input change
  let updateTodoValue = (e) => {
    setNewTodo(e.target.value);
  };

  // ✅ Delete task
  let deleteTask = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // ✅ Mark one task
  let markDone = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, isDone: !todo.isDone }
          : todo
      )
    );
  };

  // ✅ Mark all done
  let markAllDone = () => {
    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        isDone: true
      }))
    );
  };

  // ✅ FILTER LOGIC
  let filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isDone;
    if (filter === "pending") return !todo.isDone;
    return true;
  });
  let completedCount = todos.filter(todo => todo.isDone).length;
  let pendingCount = todos.filter(todo => !todo.isDone).length;

 setInterval(() => {
    const now = new Date(); 
  const formatDate = now.toLocaleDateString(); 
  const formatedtime=now.toLocaleTimeString();
  setdatetime(`${formatDate}-${formatedtime}`)
  
 }, 1000);

  return (
    <div className="container">
      <h2 style={{color:"black"}}>{datetime}</h2>

      {/* INPUT */}
      <input
        placeholder="Add a task..."
        value={newTodo}
        onChange={updateTodoValue}
      />
      &nbsp;&nbsp;
      <button onClick={addNewTask}> <i class="fa-solid fa-circle-plus"></i>&nbsp;Add</button>

      <h4>To Do List</h4>

      {/* FILTER BUTTONS */}
      <div>
    
        <button onClick={() => setFilter("all")}>All({todos.length})</button>&nbsp;&nbsp;
        <button onClick={() => setFilter("completed")}>Completed ({completedCount})</button>&nbsp;&nbsp;
        <button onClick={() => setFilter("pending")}>Pending({pendingCount})</button>
      </div>

      {/* TASK LIST */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => markDone(todo.id)}
            >
              {todo.task}
            </span>

            <button onClick={() => deleteTask(todo.id)}>
              <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
            </button>

            <button onClick={() => markDone(todo.id)}>
              <i
                className="fa-solid fa-check"
                style={{ color: todo.isDone ? "green" : "gray" }}
              ></i>
            </button>
          </li>
        ))}
      </ul>

      <button onClick={markAllDone}>Mark All Done</button>

    </div>
  );
}