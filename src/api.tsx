// The Mock API
export interface UserData {
  name: string;
  email: string;
  isAdmin: boolean;
}

export const fetchUserProfile = (): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    // reject(new Error("Error 500: It couldn't connect to the server"));
    setTimeout(() => {
      resolve({
        name: "John Doe",
        email: "john@example.com",
        isAdmin: false,
      });
    }, 500);
  });
};

export function testErrorFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Error 500: It couldn't connect to the server"));
    }, 500);
  });
}
