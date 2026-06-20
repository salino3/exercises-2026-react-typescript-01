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
// ==========================================
// 1. CONFIGURATION SETUP  
// ==========================================

interface UserPreferences {
  theme?: "dark" | "light";
  language?: string;
  // I canali di notifica possono essere non configurati (undefined) o disattivati (null)
  channels?: {
    email?: boolean | null;
    sms?: boolean | null;
    push?: boolean | null;
  };
}

// Unione discriminata di tutti i possibili messaggi di sistema
interface EmailNotification {
  type: "EMAIL";
  recipient: string;
  subject: string;
  body: string;
}

interface SMSNotification {
  type: "SMS";
  phoneNumber: string;
  text: string;
}

interface PushNotification {
  type: "PUSH";
  deviceToken: string;
  title: string;
  message: string;
}

type AppNotification = EmailNotification | SMSNotification | PushNotification;


// ==========================================
// 2. LA TUA MISSIONE: COMPLETA I TIPI MANCANTI 🛠️
// ==========================================

/**
 * TASK 1: Crea un tipo chiamato 'StrictPreferences' partendo da 'UserPreferences'.
 * Deve costringere lo sviluppatore a definire OBBLIGATORIAMENTE tutte le proprietà 
 * di primo livello ('theme', 'language', 'channels').
 */
type StrictPreferences = Required<UserPreferences>; // 👈 Sostituisci 'any' usando l'Utility Type corretto

const userPreferencies: StrictPreferences = {
    language: "en",
    theme: "dark",
    channels:{}
}

/**
 * TASK 2: Il database a volte restituisce il 'language' come null o undefined.
 * Crea un tipo 'SafeLanguage' partendo dalla proprietà 'language' di 'UserPreferences'
 * assicurandoti che non possa MAI essere null o undefined.
 */
type SafeLanguage = NonNullable<UserPreferences["language"]>;   // 👈 Sostituisci 'any' (Suggerimento: usa l'Accesso Indicizzato UserPreferences["language"])

const userPreferencies02: SafeLanguage =  "it"
 
/**
 * TASK 3: Abbiamo una funzione che deve elaborare ESCLUSIVAMENTE le notifiche testuali
 * per smartphone, ovvero "SMS" e "PUSH", scartando completamente le "EMAIL".
 * Crea un tipo 'MobileNotifications' estraendole dall'unione 'AppNotification'.
 */
type MobileNotifications = Extract<AppNotification, { type: "SMS" | "PUSH" }>; // 👈 Sostituisci 'any' filtrando in base alla proprietà 'type'

 // ==========================================
// 3. TEST DI VERIFICA (Se i tipi sono corretti, TypeScript non deve dare errori)
// ==========================================

// Verifica Task 1: Deve dare errore se manca una proprietà di primo livello
const adminConfig: StrictPreferences = {
  theme: "dark",
  language: "it",
  channels: { email: true } // I campi interni all'oggetto rimangono opzionali (Required è shallow!)
};

// Verifica Task 2: Deve accettare solo stringhe reali
const linguaValida: SafeLanguage = "en";
// @ts-expect-error -> Questo commento dice a TS che la riga sotto DEVE fallire. Se i tuoi tipi sono giusti, non vedrai errori.
const linguaInvalida: SafeLanguage = null; 
 