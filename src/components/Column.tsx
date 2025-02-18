import { Droppable } from "react-beautiful-dnd";
import { Column as ColumnType, Task } from "../types";
import TaskItem from "./TaskItem";
import {
  ColumnContainer,
  ColumnTitle,
  ColumnContent,
} from "../styles/StyledComponents";

interface ColumnProps {
  title: ColumnType;
  tasks: Task[];
}

const Column = ({ title, tasks }: ColumnProps) => {
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

export default Column;
