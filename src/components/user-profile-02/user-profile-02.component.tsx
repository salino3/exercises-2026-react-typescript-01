import React, { useState, useEffect } from "react";
import { fetchUserProfile } from "../../api";

export interface UserData {
  name: string;
  email: string;
  isAdmin: boolean;
}

export const UserProfile02: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile()
      .then((data: UserData) => setUser(data))
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (errorMessage) return <div>Error, try to refresh the page</div>;
  if (!user) return <div>User not found</div>;
  return (
    <div className="profile-card">
      <h2 data-testid="user-name">{user.name}</h2>
      <p data-testid="user-email">{user.email}</p>

      {!user.isAdmin ? (
        <button
          data-testid="btn-event"
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
