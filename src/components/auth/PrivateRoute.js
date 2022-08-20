import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  let isAuthenticated = false;

  if (currentUser) {
    isAuthenticated = true;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
