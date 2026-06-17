import React, { useState, useEffect } from "react";

// 1. TODO: Definisci l'interfaccia User qui sotto
interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  // 2. TODO: Definisci gli stati per gli utenti (users) e per la stringa di ricerca (searchTerm)
  // Ricordati di tipizzare lo useState degli utenti!

  // 3. TODO: Usa useEffect per scaricare i dati da "https://jsonplaceholder.typicode.com/users"
  // e salvarli nello stato al montaggio del componente.
  useEffect(() => {
    // Fai la fetch qui
  }, []);

  // 4. TODO: Tipizza correttamente l'evento del cambio input (e)
  const handleSearchChange = (e: any) => {
    // Aggiorna lo stato del searchTerm
  };

  // 5. TODO: Filtra gli utenti in base al searchTerm
  const filteredUsers = []; // Sostituisci questo array vuoto con la logica di filtro

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Lista Utenti</h2>

      {/* Input di ricerca */}
      <input
        type="text"
        placeholder="Cerca utente per nome..."
        onChange={handleSearchChange}
        style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
      />

      {/* Lista renderizzata */}
      <ul>
        {/* 6. TODO: Fai il .map() di filteredUsers per mostrare i nomi degli utenti */}
        {/* Ricordati di inserire la proprietà 'key' nel tag <li> */}
      </ul>
    </div>
  );
}
