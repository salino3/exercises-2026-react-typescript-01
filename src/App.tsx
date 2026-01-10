import { PostManager, TaskTracker } from "./components";
import "./App.scss";

function App() {
  return (
    <div className="main">
      <details open>
        <summary>Exercise 01 TS</summary>
        <PostManager />
      </details>
      <br />
      <details>
        <summary>Exercise 01 TS</summary>
        <TaskTracker />
      </details>
    </div>
  );
}

export default App;
