import type React from "react";
import { useEffect, useState } from "react";

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

export const Tasks: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then((data: Task[]) => setTaskList(data));
  }, []);
  console.log("Array", taskList);
  return <div>Tasks</div>;
};
