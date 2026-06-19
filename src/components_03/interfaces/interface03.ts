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
interface UserPreview extends Pick<UserProfile, "username" | "avatarUrl"> {}

// 3.
interface RegistrationPayload extends Omit<UserProfile, "id" | "createdAt"> {}

// 4.
interface SecureUser extends Readonly<UserProfile> {}
