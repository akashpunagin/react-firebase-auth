import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const emailRef = useRef();

  const { resetPassword } = useAuth();

  async function handleFormSubmit(e) {
    console.log("Submit form:login");
    e.preventDefault();

    const email = emailRef.current.value;

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Email has been sent");
    } catch (error) {
      setError(`Failed to reset password, ${error}`);
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-2">Forgot password</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form onSubmit={handleFormSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>

            {loading ? (
              <></>
            ) : (
              <Button type="submit" className="w-100">
                Confirm
              </Button>
            )}
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/login">Back to login</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
