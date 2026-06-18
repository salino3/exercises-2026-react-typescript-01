// tsc <name file>.ts -w
//
// 1. Classe Genitore (Base)
class Persona {
  // In JavaScript, il cancelletto dichiara che la proprietà è PRIVATA
  //   #example_parameter;
  // Proprietà con modificatori di accesso
  public nome: string;
  protected eta: number; // Visibile qui e nelle sottoclassi

  // Il Costruttore: riceve i dati quando fai "new"
  constructor(nome: string, eta: number) {
    this.nome = nome;
    this.eta = eta;
  }

  // Un metodo pubblico (va nel prototipo)
  public descrivi(): string {
    return `${this.nome} ha ${this.eta} anni.`;
  }
}

// 2. Sottoclasse che EREDITA da Persona
class Dipendente extends Persona {
  // Proprietà privata: nessuno fuori da qui può toccare lo stipendio direttamente
  private _stipendio: number;
  public ruolo: string;

  constructor(
    nome: string,
    eta: number,
    ruolo: string,
    stipendioIniziale: number,
  ) {
    // super() chiama il costruttore di Persona per impostare nome ed eta
    super(nome, eta);
    this.ruolo = ruolo;
    this._stipendio = stipendioIniziale;
  }

  // Getter: permette di leggere lo stipendio dall'esterno in modo controllato
  get stipendio(): string {
    return `€${this._stipendio}`;
  }

  // Setter: permette di modificare lo stipendio, ma facendo un controllo di sicurezza!
  set aumentaStipendio(importo: number) {
    if (importo > 0) {
      this._stipendio += importo;
    } else {
      console.log("Errore: L'aumento deve essere positivo!");
    }
  }

  // Polimorfismo: Sovrascriviamo il metodo descrivi() del genitore
  public override descrivi(): string {
    // Usiamo super.descrivi() per prendere il vecchio testo e aggiungerne altro
    return `${super.descrivi()} Lavora come ${this.ruolo}.`;
  }
}

// --- UTILIZZO DEL CODICE ---

// Creiamo un'istanza (un oggetto reale nell'Heap)
const impiegato1 = new Dipendente("Marco", 30, "Developer", 2000);

console.log(impiegato1.descrivi());
// Output: "Marco ha 30 anni. Lavora come Developer."

// Proviamo ad accedere a una proprietà privata
// console.log(impiegato1._stipendio); // ❌ ERRORE DI COMPILAZIONE TS: è privato!

// Usiamo il Getter e il Setter (si usano come proprietà normali, senza parentesi)
console.log(impiegato1.stipendio); // Output: €2000 (Usa il getter)
impiegato1.aumentaStipendio = 500; // Usa il setter per fare il calcolo internamente
console.log(impiegato1.stipendio); // Output: €2500

// --------------------------
class Employee {
  // The actual data slot in the Heap memory
  private _salary: number;

  constructor(initialSalary: number) {
    this._salary = initialSalary;
  }

  // The public "window" to read the data safely
  get salary(): number {
    return this._salary; // No conflict, no infinite loop!
  }
}

const emp = new Employee(2000);
console.log("emp", emp.salary); // Under the hood, this calls the getter, which returns _salary

// ----
class Game {
  // Private backing field
  private _score: number = 10;

  // GETTER: Triggered when we READ the property
  //   ❌ A 'get' accessor cannot have parameters.
  get score(): number {
    console.log("Getter triggered!");
    return this._score;
  }

  // SETTER: Triggered when we ASSIGN something with '='
  // a setter accessor MUST have parameter, and only one, no more. It can be value, object, array
  set score(multiplier: number) {
    console.log("Setter triggered with multiplier:", multiplier);
    this._score = this._score * multiplier;
  }
}

// --- HOW JAVASCRIPT DECIDES ---
const myGame = new Game();

console.log(myGame.score);

myGame.score = 10;

console.log(myGame.score);

// -----
class MathUtils {
  // A static property (a shared constant)
  public static PI: number = 3.14159;

  // A static method: it doesn't need 'this', it just takes inputs and returns output
  public static convertCelsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }
}

// --- HOW TO USE IT ---
// Notice: NO "new MathUtils()" needed! We call it directly on the Class name.
const currentTemp = MathUtils.convertCelsiusToFahrenheit(25);
console.log(currentTemp); // Output: 77
console.log(MathUtils.PI); // Output: 3.14159

// -------
// The abstract class: a blueprint for blueprints
abstract class EnemyShip {
  // Common property for all enemy ships
  constructor(
    public health: number,
    public name: string,
  ) {}

  // A regular method: all enemies share this exact behavior
  public takeDamage(amount: number): void {
    this.health -= amount;
    console.log(
      `${this.name} took ${amount} damage. Health is now ${this.health}`,
    );
  }

  // ABSTRACT METHOD: No body {} here!
  // Every subclass MUST implement their own unique version of this method.
  public abstract attack(): void;
}

// --- SUBCLASSES IMPLEMENTATION ---

class AlienScout extends EnemyShip {
  // We must provide the actual implementation for the abstract attack() method
  public attack(): void {
    console.log(`${this.name} fires a fast green laser pulse!`);
  }
}

class CapitalBoss extends EnemyShip {
  // This subclass implements attack() in its own heavy way
  public attack(): void {
    console.log(`${this.name} charges and fires a giant plasma cannon!`);
  }
}

// --- HOW TO USE IT ---
// const ghost = new EnemyShip(100, "Ghost"); // ❌ ERROR: Cannot create an instance of an abstract class.

const scout = new AlienScout(100, "Zarek");
const boss = new CapitalBoss(1000, "Omega");

scout.takeDamage(20); // Uses the shared method from the abstract parent
scout.attack(); // Output: "Zarek fires a fast green laser pulse!"

boss.attack(); // Output: "Omega charges and fires a giant plasma cannon!"
