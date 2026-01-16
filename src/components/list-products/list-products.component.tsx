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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  const filteredProducts = API_DATA.filter((product) =>
    product.name.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchTerm);
  };

  return (
    <div className="rootListData">
      <form id="formListData" onSubmit={handleSubmit}>
        <label htmlFor="nameID">Name Product</label>
        <input
          name="name"
          id="nameID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="containerListData">
        {filteredProducts.length > 0
          ? filteredProducts.map((item) => (
              <span
                key={item.id}
                style={{ color: item.inStock ? "white" : "red" }}
              >
                {item.name} {!item.inStock && "(Sold Out)"}
              </span>
            ))
          : appliedSearch && <p>No products found for "{appliedSearch}"</p>}
      </div>
    </div>
  );
};
