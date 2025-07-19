import { useEffect, useState } from "react";
import API from "../components/api";
import axios from "axios";
import "../styles/home.css";
import Header from "../components/header";
import toast from "react-hot-toast";

function Home() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Dummy product API
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setItems(res.data));

    // Fetch current cart
    API.get("/api/cart")
      .then((res) => setCartItems(res.data.orders))
      .catch(() => setCartItems([]));
  }, []);

  const addToCart = async (itemName) => {
    await API.post("/api/cart/add", { item: itemName, quantity: 1, price: items.find(item => item.title === itemName)?.price || 0 });
    console.log(`Added ${itemName} to cart, price: ${items.find(item => item.title === itemName)?.price || 0}`);
    setCartItems([...cartItems, { item: itemName, quantity: 1, price: items.find(item => item.title === itemName)?.price || 0 }]);
    toast.success(`${itemName} added to cart!`);
  };

const isInCart = (itemName) => Array.isArray(cartItems) && cartItems.some((i) => i.item === itemName);
  return (
    <div>
      <Header />
      <h2>All Products</h2>
      <div className="home-products">
        {items.map((product) => (
          <div
            key={product.id}
            className="home-product"
          >
            <h4>{product.title}</h4>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px" }}
            />
            <p>${product.price}</p>
            <button
             
              onClick={() => addToCart(product.title)}
            >
              {isInCart(product.title) ? `Increase: ${cartItems.find(item => item.item === product.title)?.quantity || 0}` : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
