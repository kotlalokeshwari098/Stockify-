import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api/axiosConfig";
import toast from 'react-hot-toast';

type Product = {
  id: number;
  product_name: string;
  category: string;
  selling_price: number;
  product_image: string;
};

const categories = [
  "Vegetables",
  "Fruits",
  "Dairy Products",
  "Snacks",
  "Household Supplies",
  "Audio", // Example mapped to existing route
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();

  // Fetch all products initially
  const fetchAllProducts = async () => {
    try {
      const res = await axiosInstance.get("/user/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch all products", err);
    }
  };

  // Fetch by category using POST
  const fetchCategoryProducts = async (category: string) => {
    try {
      const res = await axiosInstance.get(`/user/products/category/${category}`, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setProducts(res.data);
      setSelectedCategory(category);
    } catch (err) {
      console.error("Failed to fetch category products", err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      product_name: product.product_name,
      selling_price: product.selling_price,
      product_image: product.product_image,
      quantity: quantity
    });
    toast.success(`Added ${product.product_name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#dff3f3] p-6 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-800 text-white p-4 rounded-xl mr-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => fetchCategoryProducts(cat)}
              className={`cursor-pointer hover:underline ${selectedCategory === cat ? "font-bold underline" : ""
                }`}
            >
              {cat}
            </li>
          ))}
          <li
            onClick={() => {
              fetchAllProducts();
              setSelectedCategory(null);
            }}
            className="cursor-pointer hover:underline mt-4 text-teal-300"
          >
            🔄 Show All
          </li>
        </ul>
      </aside>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all w-full max-w-xs"
          >
            <img
              src={product.product_image}
              alt={product.product_name}
              className="rounded-lg h-40 w-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{product.product_name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Category:</strong> {product.category}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <label htmlFor={`qty-${product.id}`}>Quantity:</label>
              <input
                id={`qty-${product.id}`}
                type="number"
                value={quantities[product.id] || 1}
                min={1}
                className="border border-teal-400 px-2 py-1 w-16 rounded-md"
                onChange={(e) =>
                  setQuantities((prev) => ({
                    ...prev,
                    [product.id]: parseInt(e.target.value),
                  }))
                }
              />
            </div>
            <p className="mt-2">
              <strong>Price:</strong> ${product.selling_price}
            </p>
            <button 
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-teal-600 text-white w-full py-2 rounded-lg hover:bg-teal-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
