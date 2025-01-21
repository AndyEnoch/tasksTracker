import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Priority, Task } from "../types";
import {
  TaskCard,
  Input,
  Select,
  Button,
  FlexContainer,
  IconButton,
  Row,
  PriorityBadge,
  TaskDescription,
} from "../styles/StyledComponents";
import { PencilLine, Trash2 } from "lucide-react";
import { useTaskContext } from "../context/TasksContext";

interface TaskItemProps {
  task: Task;
  index: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
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
              <div style={{ padding: "0.5rem" }}>
                <Input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <Input
                  as="textarea"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <FlexContainer>
                <Select
                  value={editData.priority}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      priority: e.target.value as Priority,
                    }))
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
                <Row style={{ gap: "0.50rem" }}>
                  <Button variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Row>
              </FlexContainer>
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
