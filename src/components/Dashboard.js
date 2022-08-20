import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError(`Failed to logout: ${error}`);
    }
  }

  return (
    <>
      <Card>
        <h2 className="text-center mb-4">Profile</h2>
        <p>Email: {currentUser.email}</p>
        {error && <Alert variant="danger">{error}</Alert>}
      </Card>
      <div className="w-100 text-center mt-4">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}
