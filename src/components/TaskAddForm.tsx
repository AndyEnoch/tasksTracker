import { useState } from "react";
import { useTaskContext } from "../context/TasksContext";
import { Column, Priority } from "../types";
import {
  Button,
  ButtonGroup,
  Form,
  FormContainer,
  Input,
  InputGroup,
  Label,
  Select,
  TextArea,
} from "../styles/StyledComponents";

const TaskForm = ({ onClose }: { onClose: () => void }) => {
  const { addTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium" as Priority,
    column: "Todo" as Column,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(formData);
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      column: "Todo",
    });
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      column: "Todo",
    });
    onClose();
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            placeholder="Enter task title..."
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            placeholder="Enter task description..."
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priority: e.target.value as Priority,
              }))
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="column">Column</Label>
          <Select
            id="column"
            value={formData.column}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                column: e.target.value as Column,
              }))
            }
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Select>
        </InputGroup>

        <ButtonGroup>
          <Button type="submit" variant="primary">
            Create Task
          </Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default TaskForm;
