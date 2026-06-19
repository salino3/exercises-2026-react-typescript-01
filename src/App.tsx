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
import { TestComponent } from "./components/styles-with-ts/component";
import { ExecuterClasses } from "./components/classes/executer-classes.component";
import { AppTareas } from "./components/use/use-component";
import { FormularioRegistro } from "./components/useActionState/useActionState.component";
import { VistaFormularios } from "./components/use-form-status/use-form-status.component";
import { FinancialChart } from "./components_02/financial/FinancialChart";
import UserList from "./components_03/test_01/test01";
import PostBoard from "./components_03/test_02/test02";
import { UserTable } from "./components_03/test_03/test03";
import { DataAnalyzer } from "./components_03/test_04/test04";
import { UserDashboard } from "./components_03/test-05/test05";
import ProductManager from "./components_03/test_06/test06";
import * as DataFile from "./component_04/test_06/test07";

export type Role = "admin" | "user" | "subscriber";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
}

function App() {
  const users: User[] = [
    {
      id: 1,
      name: "Alice Freeman",
      username: "alice_dev",
      email: "alice@example.com",
      role: "admin",
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "bob_codes",
      email: "bob@example.com",
      role: "user",
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
      {/* TEST Practice */}
      <ProductManager />
      <hr />
      <UserDashboard />
      <DataAnalyzer data={10} />
      <UserTable />
      <PostBoard />
      <UserList />

      {/* Experimental legacy CHART running smoothly in React */}
      <FinancialChart data={usersData} />
      <AppTareas />
      <VistaFormularios />
      <ExecuterClasses />

      <FormularioRegistro />
      <TestComponent />
      {/* <FormTasks usersData={usersData} setUsersData={setUsersData} /> */}
      {/* <div
        style={{
          padding: "0.5rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {usersData.map((u: User) => (
          <UserCard
            key={u.id}
            user={u}
            onSendMessage={() => handleSendMessage(u.name)}
          />
        ))}
      </div> */}
      {/* Old ones */}
      {/* <Greeting name="" /> */}
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
