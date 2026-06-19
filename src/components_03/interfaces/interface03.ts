interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isAdmin: boolean;
  createdAt: Date;
}

// 1.
type UpdatePayload = Partial<
  Omit<UserProfile, "id" | "isAdmin" | "createdAt">
> & {
  fofo: string;
};

const updateUser: UpdatePayload = { fofo: "Fofo" };

// 2.
type UserPreview = Pick<UserProfile, "username" | "avatarUrl"> & {
  fofo: string;
};

// 3.
type RegistrationPayload = Omit<UserProfile, "id" | "createdAt">;

// 4.
type SecureUser = Readonly<UserProfile>;
