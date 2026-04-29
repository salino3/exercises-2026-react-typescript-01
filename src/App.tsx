import { CharacterVault, PostManager, TaskTracker } from "./components";
import { Greeting } from "./components/greeting/greeting.component";
import { Counter } from "./components/counter/counter.component";
import { UserProfile } from "./components/user-profile/user-profile.component";
import { ListProducts } from "./components/list-products/list-products.component";
import { TaskManager } from "./components/tasks/tasks.component";
import { SimpleCounter } from "./components/counter-exercise/counter-exercise.component";
import { UserProfile02 } from "./components/user-profile-02/user-profile-02.component";
import { LoginForm } from "./components/login-form/login-form.component";
import { CharacterGallery } from "./components/character-gallery/character-gallery.component";
import { TaskManager02 } from "./components/task-02/task-02.component";
import { MonitorDeCarga } from "./components/all-settled/all-settled.component";
import { BindComponent } from "./components/bind/bind.component";
import { ShoppingCart } from "./components/shopping-card/shopping-card.component";
import { EmployeeList } from "./components/employee-list/employee-list.component";
import "./App.scss";
import { ChatWindow } from "./components/chat-window/chat-window.component";
import { AppProvider } from "./context/provider";
import { Timer } from "./components/timer/timer.component";
import { TaskDashboard } from "./components/task-03/task-03.component";
import { UserCard } from "./components/task-card/task-card.component";
import { FormTasks } from "./components/task-card/components";
import { useState } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

function App() {
  const users = [
    {
      id: 1,
      name: "Alice Freeman",
      username: "alice_dev",
      email: "alice@example.com",
      isAdmin: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "bob_codes",
      email: "bob@example.com",
      isAdmin: false,
    },
  ];

  const [usersData, setUsersData] = useState<User[]>(users);

  // 2. Logic: The Father defines what happens during an event
  const handleSendMessage = (name: string) => {
    alert(`Message sent to ${name}!`);
  };

  // function onLogin(username: string, role: string) {
  //   console.log("onLogin: ", username, role);
  // }
  return (
    <div className="main">
      {/* <Greeting name="" /> */}

      <FormTasks usersData={usersData} setUsersData={setUsersData} />
      <div
        style={{
          padding: "0.5rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        {usersData.map((u: User) => (
          <UserCard
            key={u.id}
            user={u}
            onSendMessage={() => handleSendMessage(u.name)}
          />
        ))}
      </div>
      {/* <TaskDashboard /> */}
      {/* <Counter />
      <UserProfile userId="9" /> */}
      {/* <ListProducts /> */}
      {/* <TaskManager /> */}
      {/* <SimpleCounter /> */}
      {/* <UserProfile02 /> */}
      {/* <LoginForm onLogin={onLogin} /> */}
      {/* <CharacterGallery /> */}
      {/* <TaskManager02 /> */}
      {/* <MonitorDeCarga /> */}
      {/* <BindComponent /> */}
      {/* <ShoppingCart /> */}
      {/* <EmployeeList /> */}
      {/* <Timer /> */}
      {/* <AppProvider>
        <ChatWindow />
      </AppProvider> */}
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
