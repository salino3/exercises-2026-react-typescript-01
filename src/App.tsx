import { CharacterVault, PostManager, TaskTracker } from "./components";
import { Greeting } from "./components/greeting/greeting.component";
import "./App.scss";

function App() {
  return (
    <div className="main">
      <Greeting name="" />
      {/* <details open>
        <summary>Exercise 01 TS</summary>
        <PostManager />
      </details>
      <br />
      <details>
        <summary>Exercise 02 TS</summary>
        <TaskTracker />
      </details>
      <br />
      <details>
        <summary>Exercise 03 TS</summary>
        <CharacterVault />
      </details> */}
    </div>
  );
}

export default App;
