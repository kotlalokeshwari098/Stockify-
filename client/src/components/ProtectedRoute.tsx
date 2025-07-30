// components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string;
}

 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to={`/${allowedRole.toLowerCase()}signin`} replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

