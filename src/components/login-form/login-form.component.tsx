import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, role: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) {
      setError("Username too short");
      return;
    }
    setError("");
    onLogin(username, role);
    setUsername("");
    setRole("user");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="login-form">
      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div>
        <label htmlFor="username">Username:</label>{" "}
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="role">Role:</label>{" "}
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <br />
      <button data-testid="btnSubmit" type="submit">
        Sign In
      </button>
    </form>
  );
};
