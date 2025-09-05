import React, { useEffect, useState } from 'react';
import API from '../api';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const exist = cart.find(item => item._id === product._id);
    if (exist) {
      setCart(cart.map(item => item._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={() => navigate('/cart')}>Go to Cart ({cart.length})</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Products;