import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MatchList from '../components/MatchList';
import CasinoGames from '../components/CasinoGames';
import { useBetting } from '../context/BettingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Sidebar from '../components/Sidebar';
import { FaFootballBall, FaBasketballBall, FaBaseballBall, FaTableTennis } from 'react-icons/fa';
import { GiCricketBat, GiTennisRacket } from 'react-icons/gi';

const HomePageContainer = styled.div`
  display: flex;
  background-color: #f8f9fa;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarWrapper = styled.div`
  width: 250px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 15px;
    margin-top: 60px;
  }
`;

const TopBar = styled.div`
  display: flex;
  background-color: #1a2236;
  padding: 10px 20px;
  overflow-x: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

const SportTab = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.$active ? '#fff' : '#a0aec0'};
  background-color: ${props => props.$active ? '#3c4d6d' : 'transparent'};
  padding: 10px 18px;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '600' : '500'};
  
  &:hover {
    background-color: ${props => props.$active ? '#3c4d6d' : '#2d3748'};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 8px;
    font-size: 18px;
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
    
    svg {
      font-size: 16px;
      margin-right: 6px;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #fff1f0;
  color: #cf1322;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #cf1322;
`;

const CasinoSection = styled.div`
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const HomePage = () => {
  const { 
    sports: availableSports, 
    matches, 
    loading, 
    loadingMatches, 
    error, 
    matchError, 
    fetchSports, 
    fetchMatches 
  } = useBetting();
  
  const [activeSport, setActiveSport] = useState('4'); // Default to Cricket
  const [activeSportName, setActiveSportName] = useState('Cricket');
  
  useEffect(() => {
    // Fetch sports when component mounts
    fetchSports();
  }, []);
  
  useEffect(() => {
    // Fetch matches when active sport changes
    if (activeSport) {
      fetchMatches(activeSport);
    }
  }, [activeSport]);
  
  // Define sports with their icons
  const sportOptions = [
    { id: '4', name: 'Cricket', icon: <GiCricketBat /> },
    { id: '1', name: 'Football', icon: <FaFootballBall /> },
    { id: '2', name: 'Tennis', icon: <GiTennisRacket /> },
    { id: '7522', name: 'Basketball', icon: <FaBasketballBall /> },
    { id: '7511', name: 'Baseball', icon: <FaBaseballBall /> },
    { id: '27454574', name: 'Table Tennis', icon: <FaTableTennis /> }
  ];
  
  const handleSportSelect = (sportId, sportName) => {
    setActiveSport(sportId);
    setActiveSportName(sportName);
  };
  
  return (
    <HomePageContainer>
      <SidebarWrapper>
        <Sidebar activeSport={activeSport} onSportSelect={handleSportSelect} />
      </SidebarWrapper>
      
      <MainContent>
        <TopBar>
          {sportOptions.map(sport => (
            <SportTab 
              key={sport.id}
              $active={activeSport === sport.id}
              onClick={() => handleSportSelect(sport.id, sport.name)}
            >
              {sport.icon}
              {sport.name}
            </SportTab>
          ))}
        </TopBar>
        
        <CasinoSection>
          <CasinoGames />
        </CasinoSection>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {matchError && <ErrorMessage>{matchError}</ErrorMessage>}
        
        {loading || loadingMatches ? (
          <LoadingSpinner text={`Loading ${activeSportName} matches...`} />
        ) : matches.length > 0 ? (
          <MatchList 
            title={activeSportName.toUpperCase()} 
            matches={matches}
          />
        ) : (
          <ErrorMessage>No {activeSportName} matches available at the moment.</ErrorMessage>
        )}
      </MainContent>
    </HomePageContainer>
  );
};

export default HomePage; 