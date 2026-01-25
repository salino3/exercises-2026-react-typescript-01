import React, { useState } from "react";

type Category = "Electrónica" | "Ropa" | "Hogar";

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  inventory: number;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const availableProducts: Product[] = [
    {
      id: 1,
      name: "Laptop Pro",
      price: 1200,
      category: "Electrónica",
      inventory: 5,
    },
    {
      id: 2,
      name: "Camiseta Algodón",
      price: 25,
      category: "Ropa",
      inventory: 10,
      discount: 5,
    },
    { id: 3, name: "Cafetera", price: 80, category: "Hogar", inventory: 3 },
  ];

  const addToCart = (product: Product) => {
    const lengthAvailableProducts =
      (availableProducts &&
        availableProducts.length > 0 &&
        availableProducts.find((item: Product) => item.name === product.name)
          ?.inventory) ||
      0;
    const lengthCart =
      cart.find((item) => item.name === product.name)?.quantity || 0;
    if (lengthCart >= lengthAvailableProducts) {
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const calculateTotal = (): number => {
    return cart.reduce((acc, item) => {
      const priceWithDiscount = item.price - (item.discount || 0);
      return acc + priceWithDiscount * item.quantity;
    }, 0);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Tienda TypeScript</h2>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div>
          <h3>Productos Disponibles</h3>
          {availableProducts.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "5px",
              }}
            >
              <strong>{p.name}</strong> - ${p.price}
              <button
                onClick={() => addToCart(p)}
                style={{ marginLeft: "10px" }}
              >
                Agregar
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: "#f9f9f9", color: "black", padding: "15px" }}>
          <h3>Tu Carrito</h3>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name} x {item.quantity} - $
              {(item.price - (item.discount || 0)) * item.quantity}
            </div>
          ))}
          <hr />
          <h4>Total a pagar: ${calculateTotal()}</h4>
        </div>
      </div>
    </div>
  );
};
