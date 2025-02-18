import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import TaskProvider from "./context/TasksContext";
import {
  Button,
  Container,
  FlexContainer,
  Title,
} from "./styles/StyledComponents";
import AddTaskItem from "./components/AddTaskItem";
import FilterDropdown from "./components/FilterDropdown";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const handleToggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <Container>
      <FlexContainer style={{ padding: "1rem" }}>
        <Title>Task tracker</Title>
        <Button onClick={handleToggleAddTask}>Add Task</Button>
      </FlexContainer>
      <TaskProvider>
        <FilterDropdown />
        <Board />
        {showAddTask && (
          <AddTaskItem
            title="Add Task"
            isOpen={showAddTask}
            onClose={handleToggleAddTask}
          />
        )}
      </TaskProvider>
    </Container>
  );
}

export default App;
