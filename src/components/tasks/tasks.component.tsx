import type React from "react";
import { useEffect, useState } from "react";
import "./task.styles.scss";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Aprender Vitest",
          completed: false,
          priority: "high",
        },
        {
          id: "2",
          title: "Configurar MSW",
          completed: true,
          priority: "medium",
        },
        {
          id: "3",
          title: "Refactorizar Componentes",
          completed: false,
          priority: "low",
        },
      ]);
    }, 500);
  });
};

export const TaskManager: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then((data: Task[]) => setTaskList(data));
  }, []);
  console.log("Array", taskList);
  return (
    <div className="containerTasksManager">
      <table className="table bg-dark text-white">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {taskList &&
            taskList?.length > 0 &&
            taskList.map((task: Task) => (
              <tr key={task?.id} className="thBodyTaskList">
                <th scope="row">{task.id}</th>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td className="tdCompletedTM">
                  <span>{task.completed ? "✅ " : "⬜"}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
