import { useState, useEffect } from "react";

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
  const [errorAPIPosts, setErrorAPIPost] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data: PropsPost[]) => {
        setPosts(data);
        if (errorAPIPosts) {
          setErrorAPIPost("");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setErrorAPIPost("Sorry there is an error, try again.");
        setLoading(false);
      });
  }, []);

  const filtered: PropsPost[] = posts.filter((p: PropsPost) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (loading) return <p>Loading...</p>;

  if (errorAPIPosts) return <p>{errorAPIPosts}</p>;

  return (
    <div>
      <input
        value={search}
        onChange={handleChangeSearch}
        placeholder="Search posts..."
      />
      &nbsp;
      <button
        onClick={() => {
          setSearch("");
        }}
      >
        Clear
      </button>
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
