import { render, screen, fireEvent } from "@testing-library/react";
import { TaskForm } from "../components/TaskAddForm";
import { TaskProvider } from "../context/TasksContext";
import "@testing-library/jest-dom";

const mockAddTask = jest.fn();
const mockOnClose = jest.fn();

const renderComponent = () => {
  render(
    <TaskProvider>
      <TaskForm onClose={mockOnClose} />
    </TaskProvider>
  );
};

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/column/i)).toBeInTheDocument();
  });

  test("submits the form with correct data", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: "High" },
    });
    fireEvent.change(screen.getByLabelText(/column/i), {
      target: { value: "In Progress" },
    });

    fireEvent.click(screen.getByText(/create task/i));

    expect(mockAddTask).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
      priority: "High",
      column: "In Progress",
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("resets the form and calls onClose on cancel", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText(/cancel/i));

    expect(screen.getByLabelText(/task title/i)).toHaveValue("");
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
    expect(screen.getByLabelText(/priority/i)).toHaveValue("Medium");
    expect(screen.getByLabelText(/column/i)).toHaveValue("Todo");
    expect(mockOnClose).toHaveBeenCalled();
  });
});
