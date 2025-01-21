import React from "react";
import {
  Input,
  Select,
  Button,
  FlexContainer,
  Row,
} from "../styles/StyledComponents";
import { Column, Priority, Task } from "../types";

interface TaskEditFormProps {
  editData: Task;
  setEditData: React.Dispatch<React.SetStateAction<Task>>;
  handleSave: () => void;
  handleCancel: () => void;
  showColumnSelector?: boolean;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
  editData,
  setEditData,
  handleSave,
  handleCancel,
  showColumnSelector = false,
}) => {
  return (
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
        {showColumnSelector && (
          <Select
            value={editData.column}
            onChange={(e) =>
              setEditData((prev) => ({
                ...prev,
                column: e.target.value as Column,
              }))
            }
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Select>
        )}
        <Row style={{ gap: "0.50rem" }}>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Row>
      </FlexContainer>
    </div>
  );
};

export default TaskEditForm;
