import { useMemo } from "react";

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
  // 1. Initialize state with mockTasks
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
  // 2. Add a search state (string)

  console.log("clog1", state);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Project Dashboard</h1>
      {/* Render your summary and list here */}
    </div>
  );
};
