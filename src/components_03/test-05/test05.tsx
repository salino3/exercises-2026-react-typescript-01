import React, { useState, useEffect, useMemo } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

const mockData: User[] = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "admin" },
];

export function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUsers(mockData);
  }, []);

  useEffect(() => {
    const trackClick = () => console.log("Click tracciato sulla pagina");
    window.addEventListener("click", trackClick);

    return () => {
      window.removeEventListener("click", trackClick);
    };
  }, []);

  const filteredUsers = useMemo(() => {
    console.log("Filtering...");
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, users]);

  const adminCount: number = users.filter(
    (u: User) => u.role === "admin",
  ).length;

  return (
    <div>
      <h3>total Admin: {adminCount}</h3>
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
