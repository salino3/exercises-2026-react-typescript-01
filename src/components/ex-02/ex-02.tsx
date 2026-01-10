import React, { useMemo, useState } from "react";

interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
}

export const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: "Learn TypeScript", completed: false },
    { id: 2, text: "Practice React Hooks", completed: false },
    { id: 3, text: "Win the interview", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t: TaskItem) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t: TaskItem) => t.id !== id));
  };

  //
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newTodo.trim()) {
      setTasks((prev: TaskItem[]) => [
        ...prev,
        {
          id:
            (tasks && tasks.length > 0 && tasks[tasks.length - 1].id + 1) || 1,
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  }

  //
  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  const isAllDone = useMemo(
    () => tasks.length > 0 && completedCount === tasks.length,
    [tasks]
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Tracker</h2>
      <form onSubmit={handleSubmit} style={Completed()}>
        <input
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
      <br />
      <div style={Completed()}>
        <span>Completed:</span>
        <span>{isAllDone ? "All tasks done! 🎉" : completedCount}</span>
      </div>

      <div style={{ marginTop: "20px" }}>
        {tasks.map((task: TaskItem) => (
          <div key={task.id} style={CSS(task.completed)}>
            <span>{task.id}</span>
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

const CSS = (completed: boolean): React.CSSProperties => {
  return {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    textDecoration: completed ? "line-through" : "none",
  };
};

const Completed = (): React.CSSProperties => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  };
};
