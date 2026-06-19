const STATUS = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
} as const satisfies Record<string, string>;

type StatusType = (typeof STATUS)[keyof typeof STATUS];

interface RawTransaction {
  id: string;
  user: string;
  amount: number;
  status: StatusType;
  category: string;
}

const API_DATA: RawTransaction[] = [
  {
    id: "t1",
    user: "Alice",
    amount: 120,
    status: "completed",
    category: "Elettronica",
  },
  { id: "t2", user: "Bob", amount: 45, status: "pending", category: "Spesa" },
  {
    id: "t3",
    user: "Alice",
    amount: 250,
    status: "completed",
    category: "Abbigliamento",
  },
  {
    id: "t4",
    user: "Charlie",
    amount: 89,
    status: "failed",
    category: "Elettronica",
  },
  { id: "t5", user: "Bob", amount: 60, status: "completed", category: "Spesa" },
];

// Questa è l'interfaccia pulita che il nostro componente React vuole ricevere
interface CleanUserReport {
  username: string;
  totalSpent: number;
  categories: string[];
}

/**
 * 🛠️ LA TUA FUNZIONE DA COMPLETARE
 * Deve prendere l'array API_DATA e restituire un report per un SINGOLO utente.
 */
export function generateUserReport(
  transactions: RawTransaction[],
  username: string,
): CleanUserReport {
  // TASK 1: Filtra le transazioni.
  // Vogliamo SOLO quelle dell'utente passato come argomento E che siano state completate ('completed').
  const completedTransactions = transactions.filter(
    (t: RawTransaction) => t.status === "completed" && t.user === username,
  );

  // TASK 2: Calcola il totale speso (totalSpent) dall'utente.
  // Somma gli 'amount' di tutte le transazioni filtrate nella task 1.
  // Suggerimento: il metodo ideale qui è .reduce()
  const totalSpent = completedTransactions.reduce(
    (acc: number, t: RawTransaction) => acc + t.amount,
    0,
  );
  // TASK 3: Estrai una lista di categorie uniche (senza duplicati) visitate dall'utente.
  // Es: Se Alice ha "Elettronica" e "Abbigliamento", l'array deve essere ["Elettronica", "Abbigliamento"].
  // Suggerimento per i duplicati: puoi usare map() e poi l'oggetto nativo new Set(...)
  const categories: string[] = [
    ...new Set(completedTransactions.map((t: RawTransaction) => t.category)),
  ];

  return {
    username,
    totalSpent,
    categories,
  };
}

const aliceReport = generateUserReport(API_DATA, "Alice");
console.log("Report Alice:", aliceReport);

const bobReport = generateUserReport(API_DATA, "Bob");
console.log("Report Bob:", bobReport);
