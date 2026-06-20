interface ClickEvent {
  type: "click";
  elementId: string;
  coordinates: { x: number; y: number };
}

interface HoverEvent {
  type: "hover";
  elementId: string;
  duration: number;
}

interface SubmitEvent {
  type: "submit";
  formId: string; 
  payload: Record<string, any>;
}

// L'unione di tutti i possibili eventi della piattaforma
type AppEvent = ClickEvent | HoverEvent | SubmitEvent;

type MouseEvents = Extract<AppEvent, { type: "click" | "hover"  }>;

function handleMouseMovement(event: MouseEvents) {
  console.log("Elemento toccato:", event.); // Sicurissimo! Sia Click che Hover hanno elementId
  
  if (event.type === "submit") {
    // ❌ ERRORE DI COMPILAZIONE! TypeScript sa che "submit" è stato rimosso dall'unione!
  }
}

//----------
type DatiDalServer = string | number | null | undefined;

// 🪄 Rimuove il pericolo di crash a runtime!
type DatiSicuri = NonNullable<DatiDalServer>; 
// Il tipo diventa esattamente: string | number

const mioDato: DatiSicuri = null; // Type 'null' is not assignable to type 'DatiSicuri'.


interface User {
    name:string;
    tel?: string;
    email: string
}

 
const user: Required<User> = {
    email:"e",
    name: "Joe", 
    tel: "080875"
}