import React, { useState, useEffect } from "react";

interface ResponseEndPoint {
  info: Info;
  result: Result[];
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: number | null;
}

type StatusFilter = "All" | "Alive" | "Dead" | "unknown";

interface Result {
  id: number;
  name: string;
  status: StatusFilter;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const CharacterVault: React.FC = () => {
  const [characters, setCharacters] = useState<Result[]>([]);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filtered = characters.filter((char) =>
    filter === "All" ? true : char.status === filter
  );

  // Find the character to show in details
  const selectedCharacter = characters.find((c) => c.id === selectedId);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      {/* 1. Sidebar List */}
      <div style={{ width: "300px" }}>
        <label htmlFor="status-filter">Filter by Status: </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Characters</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {filtered.map((char) => (
            <li
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                color:
                  selectedId === char.id
                    ? "#242424 "
                    : "rgba(255, 255, 255, 0.87)",
                backgroundColor:
                  selectedId === char.id
                    ? "#f0f0f0"
                    : char?.status === "Alive"
                    ? "green"
                    : char?.status === "Dead"
                    ? "red"
                    : "transparent",
              }}
            >
              {char.name}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Detail View */}
      <div style={{ flex: 1, padding: "1rem", border: "1px solid #333" }}>
        {selectedCharacter ? (
          <section>
            <h2>{selectedCharacter.name}</h2>
            <img
              src={selectedCharacter.image}
              alt=""
              style={{ width: "200px" }}
            />
            <p>Status: {selectedCharacter.status}</p>
            <p>Species: {selectedCharacter.species}</p>
          </section>
        ) : (
          <p>Please select a character from the list.</p>
        )}
      </div>
    </div>
  );
};
