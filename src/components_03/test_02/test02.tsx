import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostBoard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedPostDetails, setSelectedPostDetails] = useState<Post | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
        );
        const data: Post[] = await result.json();
        setPosts(data);
      } catch (error: unknown) {
        console.log("Error:", error instanceof Error);
      }
    }

    fetchData();
  }, []);

  // 4. TODO: Secondo useEffect - Scatta SOLO quando cambia 'selectedId'
  // Endpoint per il singolo post: `https://jsonplaceholder.typicode.com/posts/${selectedId}`
  useEffect(() => {
    // Se selectedId è null, non fare nulla (return)
    // Altrimenti fai la fetch del singolo post e salvalo in selectedPostDetails
  }, [selectedId]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        display: "flex",
        gap: "40px",
      }}
    >
      {/* SEZIONE LISTA POST */}
      <div style={{ flex: 1 }}>
        <h2>I tuoi Post</h2>

        {/* 5. TODO: Gestisci visivamente il loading ed eventuali errori qui */}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              // 6. TODO: Gestisci il click per impostare il selectedId
              onClick={() => {}}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                cursor: "pointer",
                backgroundColor: selectedId === post.id ? "#e0f7fa" : "#fff",
              }}
            >
              <strong>{post.title}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* SEZIONE DETTAGLIO */}
      <div
        style={{ flex: 1, borderLeft: "1px solid #eee", paddingLeft: "20px" }}
      >
        <h2>Dettaglio Post</h2>

        {selectedPostDetails ? (
          <div
            style={{
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
            }}
          >
            <h3>{selectedPostDetails.title}</h3>
            <p>{selectedPostDetails.body}</p>
            <p>
              <small>ID Post: {selectedPostDetails.id}</small>
            </p>
          </div>
        ) : (
          <p>Seleziona un post dalla lista per vedere i dettagli.</p>
        )}
      </div>
    </div>
  );
}
