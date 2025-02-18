import { Priority } from "../types";
import { useTaskContext } from "../context/TasksContext";
import {
  ClearButton,
  FilterContainer,
  FilterGroup,
  Label,
  SearchInput,
  Select,
} from "../styles/StyledComponents";

const FilterDropdown = () => {
  const { filterPriority, setFilterPriority, searchQuery, setSearchQuery } =
    useTaskContext();

  const clearFilters = () => {
    setFilterPriority("All");
    setSearchQuery("");
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <Label htmlFor="priority-filter">Priority</Label>
        <Select
          id="priority-filter"
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(e.target.value as Priority | "All")
          }
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label htmlFor="search">Search Tasks</Label>
        <SearchInput
          id="search"
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FilterGroup>

      <ClearButton onClick={clearFilters}>Clear Filters</ClearButton>
    </FilterContainer>
  );
};

export default FilterDropdown;
