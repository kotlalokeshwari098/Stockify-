import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#dff3f3] p-6 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center shadow-md">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-green-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/user")}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
        