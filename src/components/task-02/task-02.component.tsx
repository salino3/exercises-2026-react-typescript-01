import React, { useState } from "react";

// Define the shape of a single Task
interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

export const TaskManager02: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks") || "")
      : [],
  );
  const [inputValue, setInputValue] = useState<string>("");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    setInputValue("");
  };

  // Toggle completion status
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>My Tasks</h2>

      <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          style={{ padding: "8px", width: "70%" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 12px", marginLeft: "5px" }}
        >
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            <span
              onClick={() => toggleTask(task.id)}
              style={{ cursor: "pointer" }}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
