import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SignupContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SignupButton = styled(Button)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
      <SignupContainer>
        <p>Don't have an account?</p>
        <Link to="/signup">
          <SignupButton>Sign Up</SignupButton>
        </Link>
      </SignupContainer>
    </PageContainer>
  );
};

export default LoginScreen;
