import { useEffect, useMemo, useState } from "react";
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
  const [searchTask, setSearchTask] = useState<string>("[]");

  const state: { points: number; count: number } = useMemo(
    () =>
      mockTasks.reduce(
        (acc, task) => {
          return {
            points: acc.points + task.points,
            count: task.status == "completed" ? acc.count + 1 : acc.count,
          };
        },
        { points: 0, count: 0 },
      ),
    [],
  );

  const filteredTasks: Task[] = useMemo(() => {
    return mockTasks.filter((task) => task.title.includes(searchTask));
  }, [searchTask]);

  console.log("clog1", filteredTasks);
  return (
    <div className="rootTaskDashboard" style={{ padding: "20px" }}>
      <h1>Project Dashboard</h1>
      <div className="boxInput boxInputTitle">
        <label htmlFor="title">Title Tasks</label>
        <input
          type="text"
          placeholder="Title tasks.."
          name="title"
          id="title"
          onChange={(event) => setSearchTask(event.target.value)}
        />
      </div>
      {/* Render your summary and list here */}
    </div>
  );
};
