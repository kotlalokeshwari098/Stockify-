import React, { useState, useRef } from 'react';
import { FaSearch, FaTimes, FaPrint, FaPlus } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface BillItem extends Product {
  quantity: number;
  total: number;
}

// Mock products for grocery store
const mockProducts: Product[] = [
  { id: 1, name: 'Carrot - Organic', price: 40 },
  { id: 2, name: 'Fresh Spinach Bunch', price: 25 },
  { id: 3, name: 'Broccoli', price: 60 },
  { id: 4, name: 'Potato', price: 30 },
  { id: 5, name: 'Apple Indian - Farm Fresh', price: 180 },
  { id: 6, name: 'Orange - Nagpur', price: 90 }
];

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search term
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const addToBill = () => {
    if (selectedProduct && quantity > 0) {
      const existingItem = billItems.find(item => item.id === selectedProduct.id);
      
      if (existingItem) {
        setBillItems(billItems.map(item =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
            : item
        ));
      } else {
        setBillItems([...billItems, {
          ...selectedProduct,
          quantity,
          total: selectedProduct.price * quantity
        }]);
      }
      
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

  const removeItem = (id: number) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return billItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search Section - Hide in print */}
      <div className="print:hidden mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Billing</h1>
        
        <div className="relative" ref={searchRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            className="w-full p-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          
          {/* Product Suggestions Dropdown */}
          {showSuggestions && searchTerm && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="w-full p-3 text-left hover:bg-gray-50 flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <span className="text-gray-600">${product.price}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-gray-500">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* Quantity Input Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">{selectedProduct.name}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addToBill}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Bill
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bill Preview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Qty</th>
              <th className="text-right py-2">Total</th>
              <th className="w-10 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="py-3">{item.name}</td>
                <td className="text-right">${item.price}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">${item.total.toFixed(2)}</td>
                <td className="print:hidden">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bill Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Print Button - Hide in print */}
        <div className="mt-6 print:hidden">
          <button
            onClick={handlePrint}
            disabled={billItems.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaPrint /> Print Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;