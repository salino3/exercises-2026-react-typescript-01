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
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
        );
        const data: Post[] = await result.json();

        setPosts(data);
      } catch (error: unknown) {
        console.log("Error:", error instanceof Error);
        setIsError("Error. Try refreshing the web page");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  //
  const fetchPostById = async (selectedId: number) => {
    try {
      setIsLoadingDetails(true);
      const result = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${selectedId}`,
      );
      const data: Post = await result.json();
      setSelectedPostDetails(data);
    } catch (error: unknown) {
      console.log("Error:", error instanceof Error);
      setIsError("Error. Try refreshing the web page");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (selectedId !== null) {
      fetchPostById(selectedId);
    }
  }, [selectedId]);

  if (isError) {
    return (
      <div className="errorContainer">
        <strong>{isError}</strong>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        display: "flex",
        gap: "40px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h2>Your Posts</h2>

        {isLoading ? (
          "Loading data..."
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map((post: Post) => (
              <li
                key={post.id}
                onClick={() => setSelectedId(post.id)}
                style={{
                  padding: "10px",
                  border: "1px solid #cccccc",
                  marginBottom: "10px",
                  cursor: "pointer",
                  color: "blue",
                  backgroundColor:
                    selectedId === post.id ? "#16abbe" : "#ffffff",
                }}
              >
                <strong>{post.title}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        style={{ flex: 1, borderLeft: "1px solid #eee", paddingLeft: "20px" }}
      >
        <h2>Post Detail</h2>
        {isLoadingDetails ? (
          "Loading details data..."
        ) : selectedPostDetails ? (
          <div
            style={{
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              color: "blue",
            }}
          >
            <h3>{selectedPostDetails.title}</h3>
            <p>{selectedPostDetails.body}</p>
            <p>
              <small>ID Post: {selectedPostDetails.id}</small>
            </p>
          </div>
        ) : (
          <p>Select a post from the list to see details..</p>
        )}
      </div>
    </div>
  );
}
