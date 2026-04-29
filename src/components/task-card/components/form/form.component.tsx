import { useEffect } from "react";
import type { User } from "../../../../App";
import styles from "./form.module.scss";

interface Props {
  usersData: User[];
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}

export const FormTasks: React.FC<Props> = ({ usersData, setUsersData }) => {
  console.log("users", usersData);

  // Create a handler function
  const addUser = () => {
    const newUser: User = {
      id: Date.now(), // Generate a unique ID
      name: "New User",
      username: "user_name",
      email: "new@example.com",
      isAdmin: false,
    };

    // Update the Father's state
    setUsersData((prev) => [...prev, newUser]);
  };
  return (
    <div className={styles.rootFormTasks}>
      <button onClick={addUser} className={styles.addButton}>
        Add Random User
      </button>
      <p>Current count: {usersData.length}</p>{" "}
    </div>
  );
};
