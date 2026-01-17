import type React from "react";
import { useEffect, useState } from "react";
import "./task.styles.scss";

export type FetchStatus = "none" | "loading" | "error" | "success";

const statusMessages = {
  none: "none",
  loading: "loading",
  error: "error",
  success: "success",
} as const;

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    // reject(new Error("Error 500: No se pudo conectar con el servidor"));
    setTimeout(() => {
      // resolve([]);
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
  const MESSAGES = {
    LOADING: "Loading...",
    ERROR: "Error, try to refresh the page",
    EMPTY: "No elements found",
  };

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    statusMessages.none,
  );

  useEffect(() => {
    setFetchStatus(statusMessages.loading);
    fetchTasks()
      .then((data: Task[]) => {
        setTaskList(data);
        setFetchStatus(statusMessages.success);
      })
      .catch(() => setFetchStatus(statusMessages.error));
  }, []);

  function handleStatus(id: string) {
    const newList = taskList.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTaskList(newList);
  }

  return (
    <div className="containerTasksManager">
      {fetchStatus === statusMessages.loading ? (
        MESSAGES.LOADING
      ) : (
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
            {taskList && taskList?.length > 0 ? (
              taskList.map((task: Task) => (
                <tr key={task?.id} className="thBodyTaskList">
                  <th scope="row">{task.id}</th>
                  <td
                    style={{
                      textDecorationLine: task.completed ? "line-through" : "",
                    }}
                  >
                    {task.title}
                  </td>
                  <td
                    style={{
                      textDecorationLine: task.completed ? "line-through" : "",
                    }}
                  >
                    {task.priority}
                  </td>
                  <td className="tdCompletedTM">
                    <span
                      data-testid="spanHandleStatus"
                      onClick={() => handleStatus(task.id)}
                    >
                      {task.completed ? "✅ " : "⬜"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-white">
                <td colSpan={4}>
                  {fetchStatus === statusMessages.error
                    ? MESSAGES.ERROR
                    : MESSAGES.EMPTY}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
