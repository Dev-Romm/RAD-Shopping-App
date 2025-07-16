import { useEffect, useState } from "react";
import API from "../components/api";
import "../styles/cart.css";
import Header from "../components/header";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get("/api/cart")
      .then((res) =>
        setCart(Array.isArray(res.data.orders) ? res.data.orders : [])
      )
      .catch(() => setCart([]));
  }, []);

  const proceedToCheckout = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <div>
      <Header />
    <div className="cart-container">
     
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.item} - Qty: {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
    </div>
  );
}

export default Cart;
