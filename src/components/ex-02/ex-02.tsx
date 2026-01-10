import React, { useState } from "react";

interface PropsTask {
  id: number;
  text: string;
  completed: boolean;
}

export const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<PropsTask[]>([
    { id: 1, text: "Learn TypeScript", completed: false },
    { id: 2, text: "Practice React Hooks", completed: false },
    { id: 3, text: "Win the interview", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t: PropsTask) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t: PropsTask) => t.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Tracker</h2>
      {/* TODO: Add Progress Message here */}

      <div style={{ marginTop: "20px" }}>
        {tasks.map((task: PropsTask) => (
          <div key={task.id} style={CSS(task.completed)}>
            <span>{task.text}</span>
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CSS = (completed: boolean) => {
  return {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    textDecoration: completed ? "line-through" : "none",
  };
};
