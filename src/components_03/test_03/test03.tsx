import React, { useState } from "react";

const ROLES = {
  Admin: "ADMIN",
  Developer: "DEVELOPER",
  Designer: "DESIGNER",
} as const;

type RoleType = (typeof ROLES)[keyof typeof ROLES];

interface User {
  id: number;
  name: string;
  role: RoleType;
}

const MOCK_USERS: User[] = [
  { id: 1, name: "Alice", role: "ADMIN" },
  { id: 2, name: "Bob", role: "DEVELOPER" },
  { id: 3, name: "Charlie", role: "DESIGNER" },
];

interface UserRowProps {
  user: User;
}

const UserRow = ({ user }: UserRowProps) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>
        <span className={`badge-${user.role.toLowerCase()}`}>{user.role}</span>
      </td>
    </tr>
  );
};

type FilterProps = RoleType | "ALL";

export const UserTable = () => {
  const [filter, setFilter] = useState<FilterProps>("ALL");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterProps);
  };

  const filteredUsers = MOCK_USERS.filter((user: User) =>
    filter === "ALL" ? true : user.role === filter,
  );

  return (
    <div>
      <h3>Filter by Role:</h3>
      <select value={filter} onChange={handleFilterChange}>
        <option value="ALL">Tutti</option>
        <option value={ROLES.Admin}>Admin</option>
        <option value={ROLES.Developer}>Developer</option>
        <option value={ROLES.Designer}>Designer</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: User) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
