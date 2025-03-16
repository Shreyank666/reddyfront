import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const HeaderContainer = styled.header`
  background-color: #1a2236;
  color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  
  img {
    height: 28px;
    width: auto;
  }
  
  @media (max-width: 768px) {
    img {
      height: 24px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    background-color: #1a2236;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }
`;

const NavLink = styled(Link)`
  color: #e2e8f0;
  text-decoration: none;
  margin-right: 20px;
  font-weight: 500;
  transition: color 0.2s;
  font-size: 14px;
  
  &:hover {
    color: #3182ce;
  }
  
  &.active {
    color: #3182ce;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    margin: 0 0 12px 0;
    font-size: 14px;
    width: 100%;
    padding: 6px 0;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const LoginButton = styled(Link)`
  background: transparent;
  color: #e2e8f0;
  border: 1px solid #3182ce;
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  font-size: 13px;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    background-color: rgba(49, 130, 206, 0.1);
    color: white;
  }
  
  @media (max-width: 768px) {
    margin: 0 0 8px 0;
    width: 100%;
    justify-content: center;
  }
`;

const SignupButton = styled(Link)`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 13px;
  
  &:hover {
    background-color: #2c5282;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  // In a real app, you would check if the user is logged in
  const isLoggedIn = false;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    navigate('/login');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">
        <img src={logo} alt="RedBook Club" />
      </Logo>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>
      
      <NavLinks $isOpen={isMobileMenuOpen}>
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Sports</NavLink>
        <NavLink to="/casino" onClick={() => setIsMobileMenuOpen(false)}>Casino</NavLink>
        
        <AuthButtons>
          {isLoggedIn ? (
            <LoginButton as="button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </LoginButton>
          ) : (
            <>
              <LoginButton to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <FaUser /> Login
              </LoginButton>
              <SignupButton to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</SignupButton>
            </>
          )}
        </AuthButtons>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
