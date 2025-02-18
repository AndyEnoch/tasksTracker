import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskAddForm";
import TaskProvider from "../context/TasksContext";
import { describe, beforeEach, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";

const mockOnClose = vi.fn();

const renderComponent = () => {
  render(
    <TaskProvider>
      <TaskForm onClose={mockOnClose} />
    </TaskProvider>
  );
};

describe("TaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    fireEvent.click(screen.getByText(/Create task/i));
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
