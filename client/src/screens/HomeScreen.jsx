import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCars, deleteCar, updateCar } from '../actions/carActions';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  height: 100vh;
  width:100%;
  
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 5px;
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

const LogoutButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const CarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CarItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Status = styled.span`
  font-weight: bold;
  padding-top:1rem;
  color: ${(props) => {
    switch (props.status) {
      case 'Shipped':
        return 'green';
      case 'Pending':
        return 'orange';
      default:
        return 'black';
    }
  }};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for pagination and filters
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    shippingStatus: ''
  });


  const carList = useSelector((state) => state.carList || {});
  const { loading, error, cars } = carList;

  useEffect(() => {
    dispatch(listCars({ ...filters, page: currentPage, limit: 4 })); 
  }, [dispatch, currentPage, filters]);

  const handleDelete = (car) => {
    if (window.confirm(`Are you sure you want to delete the car ${car.make} ${car.model} (${car.year})?`)) {
      dispatch(deleteCar(car._id));
      alert(`Deleted Car: ${car.make} ${car.model} (${car.year})`);
      window.location.reload();
    }
    
  };

  const handleUpdate = (car, status) => {
    if (window.confirm(`Are you sure you want to mark the car ${car.make} ${car.model} (${car.year}) as ${status}?`)) {
      dispatch(updateCar(car._id, { shippingStatus: status }));
      alert(`Marked Car as ${status}: ${car.make} ${car.model} (${car.year})`);
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // If `cars` is coming as an object, make sure to extract the array correctly
  const carArray = cars?.cars || [];
  const totalPages = cars?.totalPages || 1;

  return (
    <PageContainer>
    <Container>
      <Title>Cars For Shipping</Title>

      <Button onClick={() => navigate('/add-car')}>Add Car</Button>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

    
      <SearchContainer>
        <Input
          type="text"
          name="make"
          placeholder="Make"
          value={filters.make}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="model"
          placeholder="Model"
          value={filters.model}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="year"
          placeholder="Year"
          value={filters.year}
          onChange={handleFilterChange}
        />
        <Input
          type="text"
          name="shippingStatus"
          placeholder="Shipping Status"
          value={filters.shippingStatus}
          onChange={handleFilterChange}
        />
        <Button onClick={() => setCurrentPage(1)}>Search</Button>
      </SearchContainer>

      {/* Display cars */}
      {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : (
        <CarList>
          {carArray.map((car) => (
            <CarItem key={car._id}>
              {car.make} {car.model} ({car.year}) {car.vin} 
              <ButtonContainer>
              <Status status={car.shippingStatus}>Status - {car.shippingStatus}</Status>
                <Button onClick={() => handleDelete(car)}>Delete</Button>
                <Button onClick={() => handleUpdate(car, 'Shipped')}>Mark as Shipped</Button>
              </ButtonContainer>
            </CarItem>
          ))}
        </CarList>
      )}

      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        <span>Page {currentPage} of {totalPages}</span>
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </Container>
    </PageContainer>
  );
};

export default HomeScreen;
