import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';
import CasinoPage from './pages/CasinoPage';
import LoginPage from './pages/LoginPage';
import { BettingProvider } from './context/BettingContext';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

// Layout component to wrap routes that need the standard layout
const MainLayout = ({ children }) => (
  <AppContainer>
    <Header />
    <MainContent>{children}</MainContent>
  </AppContainer>
);

function App() {
  return (
    <BettingProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Routes with the main layout */}
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/sport/:sportId" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/match/:matchId" element={
          <MainLayout>
            <MatchPage />
          </MainLayout>
        } />
        <Route path="/casino/*" element={
          <MainLayout>
            <CasinoPage />
          </MainLayout>
        } />
        
        {/* Remove the inplay route since we're removing that feature */}
        <Route path="/inplay" element={<Navigate to="/" replace />} />
      </Routes>
    </BettingProvider>
  );
}

export default App; 