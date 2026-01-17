import React, { useState, useEffect } from "react";

// The Mock API
export interface UserData {
  name: string;
  email: string;
  isAdmin: boolean;
}

export const fetchUserProfile = (): Promise<UserData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        email: "john@example.com",
        isAdmin: false,
      });
    }, 500);
  });
};

export const UserProfile02: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile()
      .then((data: UserData) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="profile-card">
      <h2 data-testid="user-name">{user.name}</h2>
      <p data-testid="user-email">{user.email}</p>

      {!user.isAdmin ? (
        <button
          onClick={() =>
            setUser((prev: UserData | null) => {
              if (!prev) return null;
              return { ...prev, isAdmin: true };
            })
          }
        >
          Request Admin Access
        </button>
      ) : (
        <span role="status">Administrator Mode Active</span>
      )}
    </div>
  );
};
