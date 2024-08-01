import React, { useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import styled from "styled-components";


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
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

const InfoText = styled.p`
  margin-top: 15px;
`;

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
    try {
      await axios.post("http://localhost:5001/api/auth/register", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message === "Email already exists") {
            alert("Email already exists. Try a different email.");
          } else {
            setError("Email already exists");
          }
    }
  };

  return (

    <PageContainer>
    <FormContainer>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
      <InfoText>
        Already have an account? <Link to="/">Login</Link>
      </InfoText>
    </FormContainer>
    </PageContainer>
  );
};

export default SignUpScreen;
