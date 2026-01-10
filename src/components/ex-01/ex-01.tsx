import { useState, useEffect } from "react";
import "./exercise01.styles.scss";

interface PropsPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function PostManager() {
  const [posts, setPosts] = useState<PropsPost[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data: PropsPost[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filtered = posts.filter((p: PropsPost) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
      />

      <div>
        {filtered.map((post: PropsPost) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
