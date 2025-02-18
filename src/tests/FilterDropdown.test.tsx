import { fireEvent, render, screen } from "@testing-library/react";
import { useTaskContext } from "../context/TasksContext";
import { describe, beforeEach, test, expect, vi } from "vitest";
import FilterDropdown from "../components/FilterDropdown";

vi.mock("../context/TasksContext");

describe("FilterDropdown", () => {
  const mockSetFilterPriority = vi.fn();
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    (useTaskContext as jest.Mock).mockReturnValue({
      filterPriority: "All",
      setFilterPriority: mockSetFilterPriority,
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders FilterDropdown component", () => {
    render(<FilterDropdown />);
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Search Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear Filters/i)).toBeInTheDocument();
  });

  test("changes priority filter", () => {
    render(<FilterDropdown />);
    const select = screen.getByLabelText(/Priority/i);
    fireEvent.change(select, { target: { value: "High" } });
    expect(mockSetFilterPriority).toHaveBeenCalledWith("High");
  });

  test("changes search query", () => {
    render(<FilterDropdown />);
    const input = screen.getByLabelText(/Search Tasks/i);
    fireEvent.change(input, { target: { value: "test query" } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith("test query");
  });

  test("clears filters", () => {
    render(<FilterDropdown />);
    const button = screen.getByText(/Clear Filters/i);
    fireEvent.click(button);
    expect(mockSetFilterPriority).toHaveBeenCalledWith("All");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });
});
