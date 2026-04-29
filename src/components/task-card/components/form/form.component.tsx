import { useEffect, useState } from "react";
import { BoxBaseInput } from "../box-input/box-input.component";
import type { Role, User } from "../../../../App";
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
  role: Role;
}

const intialFormData: UserForm = {
  id: null,
  name: "",
  username: "",
  email: "",
  role: "user",
};

export const FormTasks: React.FC<Props> = ({ usersData, setUsersData }) => {
  const [formData, setFormData] = useState<UserForm>(intialFormData);

  const hanldeFormData =
    (key: keyof UserForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      if (key === "role") {
        setFormData((prev) => ({
          ...prev,
          [key]: checked ? "subscriber" : "user",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    };

  //
  function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setUsersData((prev) => [...prev, { ...formData, id: Date.now() }]);

    setFormData(intialFormData);
  }

  return (
    <div className={styles.rootFormTasks}>
      <form onSubmit={hanldeSubmit} id="formTasks">
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
        <BoxBaseInput
          lbl="Username"
          name="username"
          type="text"
          change={hanldeFormData("username")}
          value={formData.username}
          customStyles={styles.inputUsername}
        />
        <BoxBaseInput
          lbl="Suscriber ?"
          name="role"
          type="checkbox"
          change={hanldeFormData("role")}
          checked={formData.role === "subscriber"}
          customStyles={styles.inputRole}
        />
        <button type="submit">Submit Data</button>
      </form>
      <p>Current count: {usersData.length}</p>
    </div>
  );
};
