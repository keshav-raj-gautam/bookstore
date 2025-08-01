import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminInventory() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', price: '', inventory: '' });
  const [editingId, setEditingId] = useState(null);

  const apiBase = 'http://<your-vm-ip>:4000/api/admin/books';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get(apiBase)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ title: '', author: '', price: '', inventory: '' });
    setEditingId(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price || !form.inventory) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      title: form.title,
      author: form.author,
      price: parseFloat(form.price),
      inventory: parseInt(form.inventory, 10),
    };

    if (editingId) {
      // update book
      axios.put(`${apiBase}/${editingId}`, payload)
        .then(() => {
          fetchBooks();
          resetForm();
        })
        .catch(err => console.error(err));
    } else {
      // add new book
      axios.post(apiBase, payload)
        .then(() => {
          fetchBooks();
          resetForm();
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = book => {
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      inventory: book.inventory,
    });
    setEditingId(book.id);
  };

  const handleDelete = id => {
    if (window.confirm('Delete this book?')) {
      axios.delete(`${apiBase}/${id}`)
        .then(() => fetchBooks())
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h2>Admin Inventory</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleInputChange}
            placeholder="Author"
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="Price"
            step="0.01"
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
          <input
            type="number"
            name="inventory"
            value={form.inventory}
            onChange={handleInputChange}
            placeholder="Inventory"
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 16,
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: 4,
            fontSize: 16
          }}
        >
          {editingId ? 'Update Book' : 'Add Book'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            style={{
              marginLeft: 10,
              backgroundColor: '#aaa',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: 4,
              fontSize: 16
            }}
          >Cancel</button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Title</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Author</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Price</th>
            <th style={{ textAlign: 'right', padding: 8 }}>Inventory</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8 }}>{book.title}</td>
              <td style={{ padding: 8 }}>{book.author}</td>
              <td style={{ padding: 8, textAlign: 'right' }}>₹{book.price.toFixed(2)}</td>
              <td style={{ padding: 8, textAlign: 'right' }}>{book.inventory}</td>
              <td style={{ padding: 8, textAlign: 'center' }}>
                <button
                  onClick={() => handleEdit(book)}
                  style={{
                    backgroundColor: '#52c41a',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    marginRight: 8,
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  style={{
                    backgroundColor: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: 20, textAlign: 'center', color: '#888' }}>
                No books available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminInventory;
