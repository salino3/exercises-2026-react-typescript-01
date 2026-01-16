import React, { useEffect, useState } from "react";
import "./list-products.styles.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  category: "Electronics" | "Clothing" | "Home";
  inStock: boolean;
}

const API_DATA: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: 999,
    category: "Electronics",
    inStock: true,
  },
  { id: 2, name: "Hoodie", price: 50, category: "Clothing", inStock: false },
  { id: 3, name: "Coffee Maker", price: 120, category: "Home", inStock: true },
  {
    id: 4,
    name: "Smart Watch",
    price: 199,
    category: "Electronics",
    inStock: true,
  },
  { id: 5, name: "Yoga Pants", price: 40, category: "Clothing", inStock: true },
];

export const ListProducts: React.FC = () => {
  const [listValue, setListvalue] = useState<Product[]>([]);
  const [textValue, setTextvalue] = useState<string>("");
  const [errorSearch, setErrorSearch] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);

  //
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          API_DATA.filter((item: Product) =>
            item.name.toLowerCase().includes(textValue.toLowerCase())
          )
        );
      }, 500);
    });

    promise.then((data: Promise<unknown | Product[]>) => setListvalue(data));
  }, [flag]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorSearch(textValue);
    setFlag((prev: boolean) => !prev);
  };

  return (
    <div className="rootListData">
      <form onSubmit={handleSubmit} id="formListData">
        <label htmlFor="name">Name Product</label>
        <input
          type="text"
          id="name"
          name="name"
          value={textValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTextvalue(e.target.value)
          }
          placeholder="Text name product"
        />
        <button type="submit">Search</button>
        <button
          type="reset"
          onClick={() => {
            setTextvalue("");
            setFlag((prev: boolean) => !prev);
          }}
        >
          Reset
        </button>
      </form>
      <div className="containerListData">
        {listValue && listValue.length > 0
          ? listValue.map((item: Product) => (
              <span
                style={{
                  color: item.inStock ? "" : "red",
                }}
              >
                {item.name} {!item.inStock && "(Sold Out)"}
              </span>
            ))
          : errorSearch && listValue.length === 0
          ? `No products found for "${errorSearch}"`
          : null}
      </div>
    </div>
  );
};
