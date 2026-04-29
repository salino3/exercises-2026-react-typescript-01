import { useEffect, useState } from "react";
import { BoxBaseInput } from "../box-input/box-input.component";
import type { User } from "../../../../App";
import styles from "./form.module.scss";

interface Props {
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface UserForm {
  id: number | null;
  name: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

export const FormTasks: React.FC<Props> = ({ usersData, setUsersData }) => {
  const [formData, setFormData] = useState<UserForm>({
    id: null,
    name: "",
    username: "",
    email: "",
    isAdmin: false,
  });

  const hanldeFormData = (key: keyof UserForm) => (event: any) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //   // Create a handler function
  //   const addUser = () => {
  //     const newUser: User = {
  //       id: Date.now(),
  //       name: "New User",
  //       username: "user_name",
  //       email: "new@example.com",
  //       isAdmin: false,
  //     };

  //     setUsersData((prev) => [...prev, newUser]);
  //   };
  return (
    <div className={styles.rootFormTasks}>
      <form id="formTasks">
        <BoxBaseInput
          lbl="Name"
          name="name"
          type="text"
          change={hanldeFormData("name")}
          value={formData.name}
          customStyles={styles.inputName}
        />
        <BoxBaseInput
          lbl="Email"
          name="email"
          type="email"
          change={hanldeFormData("email")}
          value={formData.email}
          customStyles={styles.inputEmail}
        />

        {/*  */}
        <BoxBaseInput
          lbl="Username"
          name="username"
          type="text"
          change={hanldeFormData("username")}
          value={formData.username}
          customStyles={styles.inputUsername}
        />
        <BoxBaseInput
          lbl="Email"
          name="Admin"
          type="checkbox"
          change={hanldeFormData("email")}
          value={formData.email}
          customStyles={styles.inputEmail}
        />
      </form>
      <p>Current count: {usersData.length}</p>{" "}
    </div>
  );
};
