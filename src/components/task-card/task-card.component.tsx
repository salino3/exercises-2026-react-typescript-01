import React from "react";
import "./task-card.styles.scss";

type Role = "admin" | "user" | "subscriber";

// Task 1: Define the shape of the 'user' prop
interface UserProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    role?: Role;
  };
  onSendMessage: () => void;
}

export const UserCard: React.FC<UserProps> = ({ user, onSendMessage }) => {
  console.log("XXX", user);
  return (
    <div className={`user-card ${user.role === "admin" ? "admin-border" : ""}`}>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>@{user.username}</p>
        <p className="email">{user.email}</p>
      </div>

      <div className="actions">
        {/* Task 3: Implement the button click logic here */}
        <button onClick={onSendMessage} className="msg-btn">
          Send Message
        </button>
      </div>
    </div>
  );
};
