import { useEffect, useState } from 'react';
import API from './api';

function Cart() {
    const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get('/cart')
      .then(res => setCart(res.data.orders));
  }, []);

  const proceedToCheckout = () => {
    alert('Proceeding to checkout!');
  };
    return (
        <div>
             <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> :
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.item} - Qty: {item.quantity}</li>
            ))}
          </ul>
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </>
      }
        </div>
    );
}

export default Cart;