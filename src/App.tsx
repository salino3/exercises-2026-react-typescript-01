import { CharacterVault, PostManager, TaskTracker } from "./components";
import { Greeting } from "./components/greeting/greeting.component";
import { Counter } from "./components/counter/counter.component";
import { UserProfile } from "./components/user-profile/user-profile.component";
import { ListProducts } from "./components/list-products/list-products.component";
import { TaskManager } from "./components/tasks/tasks.component";
import { SimpleCounter } from "./components/counter-exercise/counter-exercise.component";
import { UserProfile02 } from "./components/user-profile-02/user-profile-02.component";
import { LoginForm } from "./components/login-form/login-form.component";
import "./App.scss";

function App() {
  function onLogin(username: string, role: string) {
    console.log("onLogin: ", username, role);
  }
  return (
    <div className="main">
      <Greeting name="" />
      {/* <Counter />
      <UserProfile userId="9" /> */}
      {/* <ListProducts /> */}
      {/* <TaskManager /> */}
      {/* <SimpleCounter /> */}
      {/* <UserProfile02 /> */}
      <LoginForm onLogin={onLogin} />
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
