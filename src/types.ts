export type Priority = "Low" | "Medium" | "High";

export type Column = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  column: Column;
}
