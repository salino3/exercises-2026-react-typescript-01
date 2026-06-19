interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isAdmin: boolean;
  createdAt: Date;
}

// 1.
interface UpdatePayload extends Partial<
  Omit<UserProfile, "id" | "isAdmin" | "createdAt">
> {}

const updateUser: UpdatePayload = {};

// 2.
