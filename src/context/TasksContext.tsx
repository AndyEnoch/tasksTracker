import React, { createContext, useContext, useState, useEffect } from "react";
import { Task, Priority } from "../types";

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
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialTasks = [
    {
      id: "1",
      title: "Task 1",
      description: "Description for Task 1",
      priority: "Low",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description for Task 2",
      priority: "Medium",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description for Task 3",
      priority: "High",
    },
  ];
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    console.log(savedTasks);
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
