import React from 'react';

function Cart({ cart, removeFromCart, clearCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: 20, backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.map((item, idx) => (
              <li key={idx} style={{ 
                borderBottom: '1px solid #eee', 
                padding: 10, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
                }}>
                <div>
                  <strong>{item.title}</strong> — {item.author} <br />
                  Qty: {item.quantity} 
                </div>
                <div>
                  ₹{(item.price * item.quantity).toFixed(2)}
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    style={{
                      marginLeft: 10,
                      backgroundColor: '#ff4d4f',
                      border: 'none',
                      color: '#fff',
                      borderRadius: 4,
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: 14
                    }}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 20, fontWeight: 'bold' }}>
            Total: ₹{totalPrice.toFixed(2)}
          </div>
          <button
            onClick={clearCart}
            style={{
              marginTop: 20,
              backgroundColor: '#1890ff',
              border: 'none',
              color: '#fff',
              borderRadius: 4,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: 16
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
