import React, { useState } from 'react';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
// ...import other components

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => setCart([...cart, book]);

  return (
    <div>
      <h1 style={{ fontFamily: 'Inter, sans-serif', padding: 20 }}>Bookstore</h1>
      <Catalog addToCart={addToCart} />
      <Cart cart={cart} />
      {/* Add navigation/buttons for Orders and AdminInventory */}
    </div>
  );
}
export default App;
