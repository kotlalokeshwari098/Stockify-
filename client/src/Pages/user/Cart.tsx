import  { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleRemoveFromCart = (id: number, name: string) => {
    removeFromCart(id);
    toast.success(`Removed ${name} from cart!`);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.selling_price * item.quantity, 
    0
  );

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Place order for each cart item
      await Promise.all(
        cartItems.map(item => 
          axiosInstance.post('/user/orders', {
            product_id: item.id,
            quantity: item.quantity,
            total_price: item.selling_price * item.quantity
          })
        )
      );

      toast.success('Order placed successfully!');
      clearCart(); // Clear the cart after successful order
      navigate('/user/ordersuccess'); // Redirect to order tracking page
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Order placement error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#dff3f3] p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Start shopping to add items to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dff3f3] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-24 h-24 object-cover rounded-md"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.product_name}</h3>
                <p className="text-teal-600">${item.selling_price}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 text-gray-500 hover:text-teal-600"
                >
                  <FaMinus />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-500 hover:text-teal-600"
                >
                  <FaPlus />
                </button>
              </div>
              
              <p className="w-24 text-right font-semibold">
                ${(item.selling_price * item.quantity).toFixed(2)}
              </p>
              
              <button
                onClick={() => handleRemoveFromCart(item.id, item.product_name)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing || cartItems.length === 0}
            className={`mt-4 w-full py-3 rounded-lg transition-colors ${
              isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {isProcessing ? 'Processing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;