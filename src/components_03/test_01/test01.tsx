import React, { useState, useEffect, useMemo } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  async function fetchData() {
    const result = fetch("https://jsonplaceholder.typicode.com/users");
    const data = (await result).json();
    return data;
  }

  useEffect(() => {
    fetchData().then((res) => setUsersData(res));
  }, []);

  //
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { value } = e?.target;

    setSearchTerm(value);
  };

  // useMemo for thousands of users
  const filteredUsers: User[] = useMemo(() => {
    return usersData.filter((data: User) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, usersData]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Lista Utenti</h2>

      <input
        type="text"
        placeholder="Cerca utente per nome..."
        onChange={handleSearchChange}
        value={searchTerm}
        name="name"
        style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
      />
      <ul>
        {filteredUsers && filteredUsers.length > 0
          ? filteredUsers.map((user: User) => (
              <li key={user.id}>
                <span style={{ color: "green" }}>Name:</span>{" "}
                <span>{user.name}</span>
              </li>
            ))
          : "No users found"}
      </ul>
    </div>
  );
}
