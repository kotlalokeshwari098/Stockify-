import  { useState } from 'react';
import { FaCalendar, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

interface SaleProduct {
  name: string;
  quantity: number;
  totalPrice: number;
}

interface SaleItem {
  date: string;
  products: SaleProduct[];
}

const mockSales: SaleItem[] = [
  {
    date: '2025-03-15',
    products: [
      { name: 'Sugar', quantity: 15, totalPrice: 750 },
      { name: 'Wheat Flour', quantity: 10, totalPrice: 450 },
      { name: 'Rice', quantity: 8, totalPrice: 800 },
    ],
  },
  {
    date: '2025-03-14',
    products: [
      { name: 'Carrot - Organic', quantity: 20, totalPrice: 800 },
      { name: 'Fresh Spinach Bunch', quantity: 15, totalPrice: 375 },
      { name: 'Potato', quantity: 25, totalPrice: 750 },
    ],
  },
  {
    date: '2025-03-13',
    products: [
      { name: 'Apple Indian - Farm Fresh', quantity: 10, totalPrice: 1800 },
      { name: 'Orange - Nagpur', quantity: 12, totalPrice: 1080 },
      { name: 'Banana - Yelakki', quantity: 20, totalPrice: 900 },
    ],
  }
];

const SalesHistory = () => {
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set(mockSales.map(sale => sale.date)));
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDate = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateTotalRevenue = () => {
    return mockSales.reduce((total, sale) => {
      return total + sale.products.reduce((dayTotal, product) => dayTotal + product.totalPrice, 0);
    }, 0);
  };

  const calculateTotalProducts = () => {
    return mockSales.reduce((total, sale) => {
      return total + sale.products.reduce((dayTotal, product) => dayTotal + product.quantity, 0);
    }, 0);
  };

  const filteredSales = mockSales
    .map(sale => ({
      ...sale,
      products: sale.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(sale => sale.products.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sales History</h1>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                ${calculateTotalRevenue().toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-500 mb-2">Total Products Sold</p>
              <p className="text-3xl font-bold text-blue-600">
                {calculateTotalProducts().toLocaleString()}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Sales List */}
        <div className="space-y-4">
          {filteredSales.map((sale, index) => (
            <div
              key={sale.date}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 
                ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <button
                onClick={() => toggleDate(sale.date)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-gray-400" />
                  <span className="font-semibold text-gray-700">
                    {formatDate(sale.date)}
                  </span>
                </div>
                {expandedDates.has(sale.date) ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>

              {expandedDates.has(sale.date) && (
                <div className="p-4 border-t border-gray-100">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-600">Product</th>
                        <th className="text-right py-2 text-gray-600">Quantity</th>
                        <th className="text-right py-2 text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sale.products.map((product, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 text-gray-800">{product.name}</td>
                          <td className="text-right text-gray-800">{product.quantity}</td>
                          <td className="text-right text-gray-800">
                            ${product.totalPrice.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;