import { useEffect, useState } from "react";
import type { User } from "../../../../App";
import styles from "./form.module.scss";

interface Props {
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}

interface UserForm {
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

  // Create a handler function
  const addUser = () => {
    const newUser: User = {
      id: Date.now(), // Generate a unique ID
      name: "New User",
      username: "user_name",
      email: "new@example.com",
      isAdmin: false,
    };

    setUsersData((prev) => [...prev, newUser]);
  };
  return (
    <div className={styles.rootFormTasks}>
      <form id="formTasks">
        <div className={`${styles.boxInput} ${styles.inputName}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={hanldeFormData("name")}
            value={formData.name}
          />
        </div>
      </form>
      <button onClick={addUser} className={styles.addButton}>
        Add Random User
      </button>
      <p>Current count: {usersData.length}</p>{" "}
    </div>
  );
};
