import React, { createContext, useContext, useState, useEffect } from "react";
import { Task, Priority, Column } from "../types";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  filterPriority: Priority | "All";
  setFilterPriority: (priority: Priority | "All") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  moveTask: (taskId: string, destinationColumn: Column) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  //   const initialTasks = [
  //     {
  //       id: "1",
  //       title: "Task 1",
  //       description: "Description for Task 1",
  //       priority: "Low",
  //       column: "Todo",
  //     },
  //     {
  //       id: "2",
  //       title: "Task 2",
  //       description: "Description for Task 2",
  //       priority: "Medium",
  //       column: "In Progress",
  //     },
  //     {
  //       id: "3",
  //       title: "Task 3",
  //       description: "Description for Task 3",
  //       priority: "High",
  //       column: "Done",
  //     },
  //     {
  //       id: "4",
  //       title: "Task 4",
  //       description: "Description for Task 4",
  //       priority: "Low",
  //       column: "Todo",
  //     },
  //     {
  //       id: "5",
  //       title: "Task 5",
  //       description: "Description for Task 5",
  //       priority: "Medium",
  //       column: "In Progress",
  //     },
  //     {
  //       id: "6",
  //       title: "Task 6",
  //       description: "Description for Task 6",
  //       priority: "High",
  //       column: "Done",
  //     },
  //   ];
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
  };

  const editTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, removed);
    setTasks(newTasks);
  };

  const moveTask = (taskId: string, destinationColumn: Column) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, column: destinationColumn } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        filterPriority,
        setFilterPriority,
        searchQuery,
        setSearchQuery,
        reorderTasks,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
