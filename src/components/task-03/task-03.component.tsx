import { useMemo, useState } from "react";
import "./task-03.styles.scss";

type TaskStatus = "todo" | "in-progress" | "completed";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: "high" | "low";
  points: number; // Story points
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Fix login bug",
    status: "completed",
    priority: "high",
    points: 5,
  },
  {
    id: 2,
    title: "Add profile pic",
    status: "todo",
    priority: "low",
    points: 2,
  },
  {
    id: 3,
    title: "Update README",
    status: "completed",
    priority: "low",
    points: 1,
  },
  {
    id: 4,
    title: "Setup CI/CD",
    status: "in-progress",
    priority: "high",
    points: 8,
  },
  {
    id: 5,
    title: "Deploy to Prod",
    status: "completed",
    priority: "high",
    points: 3,
  },
];

export const TaskDashboard = () => {
  const [searchTask, setSearchTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  //
  const stats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        const isComp = task.status === "completed";
        return {
          points: isComp ? acc.points + task.points : acc.points,
          count: isComp ? acc.count + 1 : acc.count,
        };
      },
      { points: 0, count: 0 },
    );
  }, [tasks]);

  //
  const filteredTasks = useMemo(() => {
    const regex = new RegExp(searchTask, "i");
    return tasks.filter((task) => regex.test(task.title));
  }, [searchTask, tasks]);

  //
  function handleCompleteTask(taskId: number) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" as const } : task,
      ),
    );
  }

  return (
    <div className="rootTaskDashboard" style={{ padding: "20px" }}>
      <h1>Project Dashboard</h1>
      <div style={{ marginBottom: "10px" }}>
        <strong>
          Completed: {stats.count} | Points: {stats.points}
        </strong>
      </div>

      <div className="boxInput">
        <input
          type="text"
          placeholder="Filter tasks..."
          onChange={(e) => setSearchTask(e.target.value)}
        />
      </div>

      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{ color: task.priority === "high" ? "red" : "white" }}
            >
              {task.title}
              <button
                onClick={() => handleCompleteTask(task.id)}
                disabled={task.status === "completed"}
              >
                {task.status}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
};
