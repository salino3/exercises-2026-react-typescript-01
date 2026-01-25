import React, { useState } from "react";
import "./shopping.cart.styles.scss";

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

export const availableProducts: Product[] = [
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

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const removeToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart
          .map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity <= 0 ? item.quantity : item.quantity - 1,
                }
              : item,
          )
          .filter((cart) => cart?.quantity > 0);
      }
      return prevCart.filter((cart) => cart?.quantity > 0);
    });
  };

  const calculateTotal = (): string => {
    const total: { total: number; totalDiscounted: number } = cart.reduce(
      (acc, item) => {
        const priceWithDiscount = item.price - (item.discount || 0);
        acc = {
          total: (acc.total += item.price * item.quantity),
          totalDiscounted: (acc.totalDiscounted +=
            priceWithDiscount * item.quantity),
        };
        return acc;
      },
      { total: 0, totalDiscounted: 0 },
    );
    return `Total: ${total.total || 0}  - Total for pay: ${total.totalDiscounted || 0}`;
  };
  console.log("clog1", cart);
  return (
    <div
      className="rootStoteTypescript"
      style={{ padding: "20px", fontFamily: "Arial" }}
    >
      <h2>Store TypeScript</h2>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div>
          <h3>Available Products </h3>
          <div data-testid="containerProducts" className="containerProducts">
            {availableProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "5px",
                }}
                className="cardProducts"
              >
                <span>
                  <strong>{p.name}</strong> - ${p.price}
                  {!!p.discount && " - Price reduced!"}
                </span>
                <div className="boxButtons">
                  <button
                    onClick={() => addToCart(p)}
                    style={{ marginLeft: "10px" }}
                    //   container.querySelector('[data-task-id="12345"]');
                    data-btn-id={`btn-${p.name}`}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => removeToCart(p)}
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#f9f9f9", color: "black", padding: "15px" }}>
          <h3>Your Cart</h3>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name} x {item.quantity} - $
              {(item.price - (item.discount || 0)) * item.quantity}
            </div>
          ))}
          <hr />
          <h4> {calculateTotal()}</h4>
        </div>
      </div>
    </div>
  );
};
