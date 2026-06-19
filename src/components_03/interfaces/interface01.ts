// Partial<T>: Makes all properties of an interface optional (e.g., useful for
// Update/Patch functions).

// Pick<T, K>: Creates a new type by taking only specific properties from another type.

// Omit<T, K>: Unlike Pick, creates a type by excluding some properties.

// Readonly<T>: Makes all properties immutable.

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

getFirstElement([2, "a", "b", 3]);

// Omit
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

// Pick
interface UserDetailedProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string;
  phoneNumber: string;
  address: string;
  fiscalCode: string;
  creditCardToken: string;
  createdAt: Date;
}

interface UserCardFields {
  name: any;
  email: any;
  avatarUrl: any;
}

interface UserCardPreview extends Pick<
  UserDetailedProfile,
  keyof UserCardFields
> {
  // Add property isOnline
  isOnline: boolean;
}

//-------------------
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  sku: string;
  createdAt: Date;
}

interface ProductFieldsToUse {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// interface ProductFieldsToUse extends Partial<Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'>> {}

interface CartItem extends Pick<Product, keyof ProductFieldsToUse> {
  quantity: number;
}

//
interface ProductToRemove {
  id: string;
  slug: string;
  createdAt: Date;
}

interface ProductForm extends Omit<Product, keyof ProductToRemove> {}

const itemInCart: CartItem = {
  id: "prod-100",
  name: "T-Shirt Standard",
  price: 19.99,
  imageUrl: "https://images.com/tshirt.png",
  quantity: 2, // Aggiunta correttamente
};

const newProductForm: ProductForm = {
  name: "Scarpe da corsa",
  description: "Scarpe comodissime per maratone",
  price: 89.99,
  stock: 50,
  imageUrl: "https://images.com/shoes.png",
  sku: "SHOES-RUN-01",
};

const myProduct: Partial<Product> = {
  id: "a3Dr",
  name: "test-name",
  price: 50,
};

const myReadonlyProduct: Readonly<Partial<Product>> = {
  id: "a3Dr",
  name: "test-name",
  price: 50,
};

myProduct.price = 10;
console.log(myProduct.price);

// It gives error but the value is modifyied
myReadonlyProduct.price = 10;
console.log(myReadonlyProduct.price);

interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = { name: "Aldo", age: 30 };

//
interface CustomRequest<T> {
  payload: T;
  timestamp: number;
}

interface PayloadProp {name:string; email: string}

const request:CustomRequest<PayloadProp> = {
 timestamp:3232,
 payload:  {email:"gigi@gmail.com", name:"Gigi"}
}

type IsString<T> = T extends string ? true : 9 ;

type ResultA = IsString<BigInt | boolean>;

const result: ResultA =   9

// enum creates a lot of code in runtime
export const STATUS   = {
  Pending: 'PENDING',
  Success: 'SUCCESS',
  Error: 'ERROR'
} as const satisfies Record<string, string>;

 export type StatusType = typeof STATUS[keyof typeof STATUS]; 
 

return  (
    <p>Stato attuale: {STATUS.Success}</p>
 )