import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Column as ColumnType, Task } from "../types";
import { TaskItem } from "./TaskItem";
import {
  ColumnContainer,
  ColumnTitle,
  ColumnContent,
} from "../styles/StyledComponents";

interface ColumnProps {
  title: ColumnType;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <Droppable droppableId={title}>
        {(provided) => (
          <ColumnContent ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ColumnContent>
        )}
      </Droppable>
    </ColumnContainer>
  );
};
