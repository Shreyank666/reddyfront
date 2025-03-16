import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';

const LoginPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2236 0%, #2d3748 100%);
  padding: 20px;
`;

const LoginFormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  img {
    height: 60px;
    width: auto;
  }
  
  @media (max-width: 576px) {
    img {
      height: 50px;
    }
  }
`;

const FormTitle = styled.h2`
  color: #2d3748;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
  
  @media (max-width: 576px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0 15px;
  background-color: #f8f9fa;
  transition: all 0.3s;
  
  &:focus-within {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    background-color: white;
  }
  
  svg {
    color: #718096;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 0;
  border: none;
  background: transparent;
  color: #2d3748;
  font-size: 16px;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
  
  @media (max-width: 576px) {
    padding: 12px 0;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  
  &:hover {
    background-color: #2c5282;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 576px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
  button {
    background: none;
    border: none;
    color: #3182ce;
    font-weight: 500;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    // For this dummy implementation, just redirect to home
    navigate('/');
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <Logo>
          <img src={logo} alt="RedBook Club" />
        </Logo>
        
        <FormTitle>{isLogin ? 'Login to Your Account' : 'Create an Account'}</FormTitle>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <FormGroup>
              <InputGroup>
                <FaUser />
                <Input type="text" placeholder="Username" required />
              </InputGroup>
            </FormGroup>
          )}
          
          <FormGroup>
            <InputGroup>
              <FaEnvelope />
              <Input type="email" placeholder="Email Address" required />
            </InputGroup>
          </FormGroup>
          
          <FormGroup>
            <InputGroup>
              <FaLock />
              <Input type="password" placeholder="Password" required />
            </InputGroup>
          </FormGroup>
          
          <Button type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        
        <ToggleContainer>
          <button type="button" onClick={toggleForm}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </ToggleContainer>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

export default LoginPage; 