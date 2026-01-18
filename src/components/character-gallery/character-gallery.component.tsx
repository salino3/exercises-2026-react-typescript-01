import React, { useState, useEffect } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
}

export const CharacterGallery: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character?page=1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setCharacters(
          // Just take 5 for simplicity
          data.results.slice(0, 5).map((user: Partial<Character>) => ({
            id: user.id,
            name: user.name,
            image: user.image,
          })),
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div aria-label="gallery">
      <h1>Rick and Morty Characters</h1>
      <h3>Liked characters: {likedIds.length}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {characters && characters.length > 0 ? (
          characters.map((char) => (
            <div
              key={char.id}
              data-testid="character-card"
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px",
              }}
            >
              <img
                src={char.image}
                alt={char.name}
                style={{ width: "100px" }}
              />
              <h3>{char.name}</h3>
              <button onClick={() => toggleLike(char.id)}>
                {likedIds.includes(char.id) ? "❤️ Liked" : "🤍 Like"}
              </button>
            </div>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>
    </div>
  );
};
