import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { TaskItem } from "./TaskItem";
import { useTaskContext } from "../context/TasksContext";
import { Container } from "../styles/StyledComponents";

export const TaskList: React.FC = () => {
  const { tasks, filterPriority, searchQuery, reorderTasks } = useTaskContext();

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  console.log(filteredTasks);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Container>
              {filteredTasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </Container>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
