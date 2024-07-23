import React, { useState, useEffect } from 'react';
import "../css/CreateProduct.css";
import axios from '../axiosConfig';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products/categories');
        setCategories(response.data.categories);
      } catch(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(`Error getting categories: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          alert('Error getting categories: No response from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
          alert(`Error getting categories: ${error.message}`);
        }
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/products/suppliers');
        setSuppliers(response.data.suppliers);

      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(`Error getting suppliers: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          alert('Error getting suppliers: No response from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
          alert(`Error getting suppliers: ${error.message}`);
        }
      }
    };

    fetchCategories();
   fetchSuppliers();

  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('supplier', supplier);
    formData.append('price', price);
    formData.append('image', image);

    try {
        const response = await axios.post('/api/products/add-product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Product created:', response.data);
        alert(`${response.data.product.name} was added`);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(`Error adding product: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          alert('Error adding product: No response from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
          alert(`Error adding product: ${error.message}`);
        }
      }
  };
  return (
    <div className="product-form-container">
      <h2 className="product-form-title">Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="product-form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="product-form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="product-form-group">
          <label htmlFor="supplier">Supplier</label>
          <select id="supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} required>
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="product-form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="product-form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required />
        </div>

        <button type="submit" className="product-btn">Create Product</button>
      </form>
    </div>

  );
};

export default CreateProduct;
