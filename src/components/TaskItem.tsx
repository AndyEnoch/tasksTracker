import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Priority, Task } from "../types";
import { TaskCard, Input, Select, Button } from "../styles/StyledComponents";
import { Edit2, Trash2 } from "lucide-react";
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
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span>{task.priority}</span>
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} />
              </Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>
                <Trash2 size={16} />
              </Button>
            </>
          )}
        </TaskCard>
      )}
    </Draggable>
  );
};
