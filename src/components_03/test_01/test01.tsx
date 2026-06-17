import React, { useState, useEffect } from "react";

// 1. TODO: Definisci l'interfaccia User qui sotto
interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 3. TODO: Usa useEffect per scaricare i dati da "https://jsonplaceholder.typicode.com/users"
  // e salvarli nello stato al montaggio del componente.

  async function fetchData() {
    const result = fetch("https://jsonplaceholder.typicode.com/users");
    const data = (await result).json();
    return data;
  }

  useEffect(() => {
    fetchData().then((res) => setUsersData(res));
  }, []);

  console.log("clog1", usersData);
  // 4. TODO: Tipizza correttamente l'evento del cambio input (e)
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { value } = e?.target;

    setSearchTerm(value);
  };

  // 5. TODO: Filtra gli utenti in base al searchTerm
  const filteredUsers: User[] = usersData.filter((data: User) =>
    data.name.toLowerCase().includes(searchTerm),
  );

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
