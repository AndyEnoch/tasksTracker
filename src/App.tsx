import "./App.css";
import { TaskList } from "./components/TaskList";
import { TaskProvider } from "./context/TasksContext";

function App() {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}

export default App;
