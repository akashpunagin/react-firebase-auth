import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    console.log("Submit form: signup");
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError("Password and Confirm password do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (error) {
      setError(`Failed to register, ${error}`);
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleFormSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={confirmPasswordRef}
              ></Form.Control>
            </Form.Group>

            {loading ? (
              <></>
            ) : (
              <Button type="submit" className="w-100">
                Sign Up
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
}
