interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  timestamp: number;
}

function formatResponse<User>(response: ApiResponse<User>): User {
  if (response.status === "success") {
    return response.data;
  }
  throw new Error("Errore nel recupero dati");
}

interface User {
  id: number;
  name: string;
}

const rawData: ApiResponse<User> = {
  status: "success",
  data: { id: 1, name: "Alice" },
  timestamp: 12345,
};

const user: User = formatResponse(rawData);
