// src/screens/AddCarScreen.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../actions/carActions";
import styled from "styled-components";
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
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
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
  margin-bottom:20px;
  margin-left:5.5rem;

`;

const AddCarScreen = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCar({ make, model, year, vin, shippingStatus }));
    navigate("/home");
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (

    <PageContainer>
       
    <Container>
    <BackButton onClick={handleGoBack}>Back to List of Cars</BackButton>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Make</Label>
          <Input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div>
          <Label>Model</Label>
          <Input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div>
          <Label>Year</Label>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <Label>VIN</Label>
          <Input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
        </div>
        <div>
          <Label>Shipping Status</Label>
          <Input
            type="text"
            value={shippingStatus}
            onChange={(e) => setShippingStatus(e.target.value)}
          />
        </div>
        <Button type="submit">Add Car</Button>
        
      </Form>
      
    </Container>
    
    </PageContainer>
  );
};

export default AddCarScreen;
