import "./App.css";
import { Board } from "./components/Board";
import { TaskProvider } from "./context/TasksContext";
import { Button, FlexContainer, Title } from "./styles/StyledComponents";

function App() {
  return (
    <>
      <FlexContainer style={{ padding: "1rem" }}>
        <Title>Task Tracker</Title>
        <Button onClick={() => console.log("Add Task")}>Add Task</Button>
      </FlexContainer>
      <TaskProvider>
        <Board />
      </TaskProvider>
    </>
  );
}

export default App;
