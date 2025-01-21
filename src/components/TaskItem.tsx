import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../types";

import {
  TaskCard,
  FlexContainer,
  IconButton,
  Row,
  PriorityBadge,
  TaskDescription,
} from "../styles/StyledComponents";
import { PencilLine, Trash2 } from "lucide-react";
import { useTaskContext } from "../context/TasksContext";
import TaskEditForm from "./TaskEditForm";

interface TaskItemProps {
  task: Task;
  index: number;
}

export const TaskItem = ({ task, index }: TaskItemProps) => {
  const { editTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const handleSave = () => {
    editTask(editData);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <TaskCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <>
              <TaskEditForm
                editData={editData}
                setEditData={setEditData}
                handleSave={handleSave}
                handleCancel={() => setIsEditing(false)}
              />
            </>
          ) : (
            <>
              <FlexContainer>
                <span>{task.title}</span>
                <Row>
                  <IconButton onClick={() => setIsEditing(true)}>
                    <PencilLine size={20} />
                  </IconButton>
                  <IconButton onClick={() => deleteTask(task.id)}>
                    <Trash2 size={20} color="#E94A74" />
                  </IconButton>
                </Row>
              </FlexContainer>

              <TaskDescription>{task.description}</TaskDescription>
              <PriorityBadge priority={task.priority}>
                {task.priority}
              </PriorityBadge>
            </>
          )}
        </TaskCard>
      )}
    </Draggable>
  );
};
