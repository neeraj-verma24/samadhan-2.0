import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const res = await API.post('/checkout', { items: cart });
    window.location.href = res.data.url;
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item._id}>
          {item.name} - ${item.price} x {item.quantity}
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
}

export default Cart;