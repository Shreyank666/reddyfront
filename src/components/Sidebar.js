import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaFootballBall, FaBasketballBall, FaBaseballBall, FaHockeyPuck, FaGolfBall, FaTableTennis, FaChevronDown, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';
import { GiCricketBat, GiTennisRacket } from 'react-icons/gi';
import logo from '../assets/logo.png';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #1a2236;
  color: #e2e8f0;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: ${props => props.$isOpen ? '0' : '-250px'};
  top: 0;
  z-index: 1000;
  transition: left 0.3s ease;
  
  @media (min-width: 768px) {
    position: relative;
    left: 0;
  }
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 3px;
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 1001;
  background-color: #1a2236;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.div`
  padding: 12px 15px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2d3748;
  }
  
  span {
    font-size: 16px;
  }
`;

const SectionContent = styled.div`
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const SportItem = styled.div`
  padding: 10px 15px 10px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  
  &:hover {
    background-color: #2d3748;
  }
  
  &.active {
    background-color: #3c4d6d;
    color: white;
    font-weight: 500;
  }
`;

const SportIcon = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const Logo = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  img {
    height: 35px;
    width: auto;
  }
`;

const getSportIcon = (sportName) => {
  const name = sportName.toLowerCase();
  
  if (name.includes('cricket')) {
    return <GiCricketBat />;
  } else if (name.includes('football') || name.includes('soccer')) {
    return <FaFootballBall />;
  } else if (name.includes('tennis')) {
    return <GiTennisRacket />;
  } else if (name.includes('basketball')) {
    return <FaBasketballBall />;
  } else if (name.includes('baseball')) {
    return <FaBaseballBall />;
  } else if (name.includes('hockey')) {
    return <FaHockeyPuck />;
  } else if (name.includes('golf')) {
    return <FaGolfBall />;
  } else if (name.includes('table tennis')) {
    return <FaTableTennis />;
  } else {
    return <FaFootballBall />;
  }
};

const Sidebar = ({ activeSport, onSportSelect }) => {
  const [openSections, setOpenSections] = useState({
    sports: true,
    casino: false,
    settings: false
  });
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [activeSport]);
  
  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };
  
  const handleSportClick = (sportId, sportName) => {
    if (onSportSelect) {
      // Ensure sportId is always passed as a string
      onSportSelect(String(sportId), sportName);
    }
    navigate(`/sport/${sportId}`);
  };
  
  // Define sports with their IDs as strings for consistency
  const sports = [
    { id: '4', name: 'Cricket' },
    { id: '1', name: 'Football' },
    { id: '2', name: 'Tennis' },
    { id: '7522', name: 'Basketball' },
    { id: '7511', name: 'Baseball' },
    { id: '27454574', name: 'Table Tennis' }
  ];
  
  return (
    <>
      <MobileToggle onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
        {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>
      
      <Overlay $isOpen={isMobileSidebarOpen} onClick={() => setIsMobileSidebarOpen(false)} />
      
      <SidebarContainer $isOpen={isMobileSidebarOpen}>
        <Logo>
          <img src={logo} alt="RedBook Club" />
        </Logo>
        
        <SidebarSection>
          <SectionTitle onClick={() => toggleSection('sports')}>
            Sports
            <span>{openSections.sports ? <FaChevronUp /> : <FaChevronDown />}</span>
          </SectionTitle>
          
          <SectionContent $isOpen={openSections.sports}>
            {sports.map(sport => (
              <SportItem 
                key={sport.id}
                className={activeSport === sport.id ? 'active' : ''}
                onClick={() => handleSportClick(sport.id, sport.name)}
              >
                <SportIcon>
                  {getSportIcon(sport.name)}
                </SportIcon>
                {sport.name}
              </SportItem>
            ))}
          </SectionContent>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle onClick={() => toggleSection('casino')}>
            Casino
            <span>{openSections.casino ? <FaChevronUp /> : <FaChevronDown />}</span>
          </SectionTitle>
          
          <SectionContent $isOpen={openSections.casino}>
            <SportItem onClick={() => navigate('/casino/slots')}>Slots</SportItem>
            <SportItem onClick={() => navigate('/casino/live-casino')}>Live Casino</SportItem>
            <SportItem onClick={() => navigate('/casino/table-games')}>Table Games</SportItem>
            <SportItem onClick={() => navigate('/casino/jackpots')}>Jackpots</SportItem>
          </SectionContent>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle onClick={() => toggleSection('settings')}>
            My Account
            <span>{openSections.settings ? <FaChevronUp /> : <FaChevronDown />}</span>
          </SectionTitle>
          
          <SectionContent $isOpen={openSections.settings}>
            <SportItem onClick={() => navigate('/account/profile')}>Profile</SportItem>
            <SportItem onClick={() => navigate('/account/bets')}>My Bets</SportItem>
            <SportItem onClick={() => navigate('/account/transactions')}>Transactions</SportItem>
            <SportItem onClick={() => navigate('/account/settings')}>Settings</SportItem>
          </SectionContent>
        </SidebarSection>
      </SidebarContainer>
    </>
  );
};

export default Sidebar; 