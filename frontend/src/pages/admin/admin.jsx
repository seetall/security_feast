import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  removeProduct,
  updateProduct,
} from "../../services/productServices";
import "./admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageFile: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock);
    formData.append("imageFile", newProduct.imageFile);

    try {
      await addProduct(formData);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageFile: null,
      });
    } catch (error) {
      setError("Error adding product");
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await removeProduct(productId);
      fetchProducts();
    } catch (error) {
      setError("Error removing product");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("description", editingProduct.description);
    formData.append("price", editingProduct.price);
    formData.append("category", editingProduct.category);
    formData.append("stock", editingProduct.stock);
    if (editingProduct.imageFile) {
      formData.append("imageFile", editingProduct.imageFile);
    }

    try {
      await updateProduct(editingProduct._id, formData);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      setError("Error updating product");
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleAddProduct} className="add-product-form">
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageFile: e.target.files[0] })
          }
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {editingProduct && (
        <form onSubmit={handleUpdateProduct} className="edit-product-form">
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={editingProduct.category}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, category: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={editingProduct.stock}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, stock: e.target.value })
            }
            required
          />
          <input
            type="file"
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                imageFile: e.target.files[0],
              })
            }
          />
          <button type="submit">Update Product</button>
          <button type="button" onClick={() => setEditingProduct(null)}>
            Cancel
          </button>
        </form>
      )}

      <h2>All Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  Remove
                </button>
                <br />
                <button
                  className="edit-button"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

