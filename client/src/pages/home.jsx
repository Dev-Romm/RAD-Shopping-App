import { useEffect, useState } from "react";
import API from "./api";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Dummy product API
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setItems(res.data));

    // Fetch current cart
    API.get("/cart")
      .then((res) => setCartItems(res.data.orders))
      .catch(() => setCartItems([]));
  }, []);

  const addToCart = async (itemName) => {
    await API.post("/cart/add", { item: itemName, quantity: 1 });
    setCartItems([...cartItems, { item: itemName, quantity: 1 }]);
  };

  const isInCart = (itemName) => cartItems.some((i) => i.item === itemName);

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              width: "200px",
            }}
          >
            <h4>{product.title}</h4>
            <p>${product.price}</p>
            <button
              disabled={isInCart(product.title)}
              onClick={() => addToCart(product.title)}
            >
              {isInCart(product.title) ? "Already in Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
