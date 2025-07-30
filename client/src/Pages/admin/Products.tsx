import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch, FaPlus, FaTimes } from 'react-icons/fa';

interface Product {
  id: number;
  product_name: string;
  selling_price: number;
  description: string;
  stock_quantity: number;
  product_image: string;
  category: string;
  status: string;
}

const initialFormData = {
  name: '',
  price: 0,
  description: '',
  category: '',
  stockQuantity: 0,
  imageUrl: '',
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products");
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit product:', id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/admin/products", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setIsModalOpen(false);
      setFormData(initialFormData);
      fetchProducts(); // Refresh list
    } catch (err) {
      setError('Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              <FaPlus className="text-sm" /> Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                    ${product.selling_price}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-800">{product.product_name}</h3>
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mt-1">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    required
                    min="0"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isLoading ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;