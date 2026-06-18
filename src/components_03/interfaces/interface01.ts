// Partial<T>: Makes all properties of an interface optional (e.g., useful for
// Update/Patch functions).

// Pick<T, K>: Creates a new type by taking only specific properties from another type.

// Omit<T, K>: Unlike Pick, creates a type by excluding some properties.

// Readonly<T>: Makes all properties immutable.

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

getFirstElement([2, "a", "b", 3]);

//
interface UserDatabase {
  id: string;
  name: string;
  email: string;
  tokenSession: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

interface PropertiesToRemove {
  id: any;
  tokenSession: any;
  createdAt: any;
  //   updatedAt: any;
  isAdmin: any;
}

interface UserRegistration extends Omit<
  UserDatabase,
  keyof PropertiesToRemove | "updatedAt"
> {
  passwordHash: string;
}

//
