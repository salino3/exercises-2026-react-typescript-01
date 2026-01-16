import { CharacterVault, PostManager, TaskTracker } from "./components";
import { Greeting } from "./components/greeting/greeting.component";
import { Counter } from "./components/counter/counter.component";
import { UserProfile } from "./components/user-profile/user-profile.component";
import "./App.scss";

function App() {
  return (
    <div className="main">
      <Greeting name="" />
      <Counter />
      <UserProfile userId="1" />
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
