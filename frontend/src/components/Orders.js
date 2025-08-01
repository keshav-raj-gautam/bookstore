import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace <your-vm-ip> with your backend VM IP or domain
    axios.get('http://<your-vm-ip>:4000/api/order')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20, backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h2>Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #eee', borderRadius: 6, padding: 16, marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}>
              <strong>Order ID:</strong> {order.id}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Customer:</strong> {order.customer}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Items:</strong> 
              <ul style={{ paddingLeft: 20 }}>
                {JSON.parse(order.items).map((item, idx) => (
                  <li key={idx}>
                    Book ID: {item.bookId}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Total:</strong> ₹{order.total.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>
              Ordered At: {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
