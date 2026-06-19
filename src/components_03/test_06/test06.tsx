import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: "Elettronica" | "Abbigliamento" | "Casa";
  isAvailable: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Smartphone",
    price: 699,
    category: "Elettronica",
    isAvailable: true,
  },
  {
    id: "2",
    name: "T-shirt",
    price: 25,
    category: "Abbigliamento",
    isAvailable: true,
  },
  { id: "3", name: "Lampada", price: 45, category: "Casa", isAvailable: false },
];

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [newName, setNewName] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number | null>(null);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewName(e.target.value);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewPrice(Number(e.target.value));
  };

  const toggleAvailability = (
    id: string,
    updatedFields: Pick<Product, "isAvailable">,
  ) => {
    setProducts((prev: Product[]) =>
      prev.map((p: Product) => (p.id === id ? { ...p, ...updatedFields } : p)),
    );
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clog1", newName, newPrice);
    if (newName && newPrice) {
      const newProduct: Product = {
        id: products[products.length - 1].id + 1,
        isAvailable: true,
        name: newName,
        price: newPrice,
        category: "Elettronica",
      };

      setProducts((prev: Product[]) => [newProduct, ...prev]);
      setNewName("");
      setNewPrice(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Gestione Inventario Prodotti</h2>

      {/* Lista dei prodotti */}
      <ul>
        {products &&
          products.length > 0 &&
          products.map((product: Product) => (
            <li key={product.id} style={{ marginBottom: "10px" }}>
              <strong>{product.name}</strong> - {product.price}€
              <button
                style={{ marginLeft: "10px" }}
                // Quando clicco, voglio invertire il valore di isAvailable
                onClick={() =>
                  toggleAvailability(product.id, {
                    isAvailable: !product.isAvailable,
                  })
                }
              >
                {product.isAvailable ? "✅ Disponibile" : "❌ Non Disponibile"}
              </button>
            </li>
          ))}
      </ul>

      <hr />

      {/* Form di aggiunta */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Aggiungi Prodotto (Semplificato)</h3>
          <input
            type="text"
            placeholder="Nome prodotto"
            name="name"
            value={newName}
            onChange={handleNameChange}
          />
          <input
            type="number"
            placeholder="Prezzo prodotto"
            value={newPrice ?? ""}
            name="price"
            onChange={handlePriceChange}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
