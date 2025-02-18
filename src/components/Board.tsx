import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Column as ColumnType } from "../types";
import { BoardContainer } from "../styles/StyledComponents";
import { useTaskContext } from "../context/TasksContext";

const COLUMNS: ColumnType[] = ["Todo", "In Progress", "Done"];

const Board = () => {
  const { tasks, moveTask, filterPriority, searchQuery } = useTaskContext();

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumn = result.source.droppableId as ColumnType;
    const destinationColumn = result.destination.droppableId as ColumnType;
    const taskId = result.draggableId;

    if (
      sourceColumn &&
      destinationColumn &&
      sourceColumn !== destinationColumn
    ) {
      moveTask(taskId, destinationColumn);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardContainer>
        {COLUMNS.map((column) => (
          <Column
            key={column}
            title={column}
            tasks={filteredTasks.filter((task) => task.column === column)}
          />
        ))}
      </BoardContainer>
    </DragDropContext>
  );
};

export default Board;
