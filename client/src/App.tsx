import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AppUserLayout from "./layouts/AppUserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Landing/Auth Pages
import MainPage from "./Pages/MainPage";
import UserSignIn from "./Pages/user/UserSignIn";
import UserSignup from "./Pages/user/UserSignup";
import AdminSignIn from "./Pages/admin/AdminSignIn";
import AdminSignup from "./Pages/admin/AdminSignup";

// Admin Pages
import Dashboard from "./Pages/admin/Dashboard";
import Billing from "./Pages/admin/Billing";
import Products from "./Pages/admin/Products";
import SalesHistory from "./Pages/admin/SalesHistory";

// User Pages
import Home from "./Pages/user/Home";
import Cart from "./Pages/user/Cart";
import WishList from "./Pages/user/WishList";
import OrderSuccess from "./Pages/user/OrderSuccess";
import Logout from "./Pages/user/Logout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<MainPage />} />
      <Route path="/usersignup" element={<UserSignup />} />
      <Route path="/usersignin" element={<UserSignIn />} />
      <Route path="/adminsignin" element={<AdminSignIn />} />
      <Route path="/adminsignup" element={<AdminSignup />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="billing" element={<Billing />} />
        <Route path="products" element={<Products />} />
        <Route path="saleshistory" element={<SalesHistory />} />
      </Route>

      {/* User Protected Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRole="user">
            <AppUserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="ordersuccess" element={<OrderSuccess />} />
        <Route path="wishlist" element={<WishList />} />

      </Route>

      {/* Logout Route */}
      <Route path="/logout" element={<Logout />} />
    </Route>
  )
);

const App = () => {
  return (
    <CartProvider>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <RouterProvider router={routes} />
    </CartProvider>
  );
};

export default App;
