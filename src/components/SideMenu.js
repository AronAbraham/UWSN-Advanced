import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiActivity, FiBatteryCharging, FiBarChart2, FiCpu,
  FiPieChart, FiHelpCircle, FiMenu, FiChevronRight,
  FiChevronDown, FiLayers, FiDatabase
} from 'react-icons/fi';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.3); }
`;

// Main container
const SideMenuContainer = styled.aside`
  position: relative;
  width: ${props => props.isOpen ? '280px' : '64px'};
  height: 100vh;
  background-color: rgba(17, 17, 17, 0.95);
  border-right: 1px solid rgba(0, 255, 0, 0.1);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: ${props => props.isOpen ? 'auto' : 'hidden'};
  z-index: 100;
  backdrop-filter: blur(10px);
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 0, 0.3);
    border-radius: 10px;
  }
`;

// Logo area
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 ${props => props.isOpen ? '24px' : '18px'};
  border-bottom: 1px solid rgba(0, 255, 0, 0.1);
  overflow: hidden;
`;

const Logo = styled.div`
  font-size: ${props => props.isOpen ? '18px' : '24px'};
  font-weight: 800;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
  letter-spacing: 1px;
  flex-shrink: 0;
  animation: ${glowAnimation} 3s infinite ease-in-out;
`;

// Toggle button
const ToggleButton = styled.button`
  position: absolute;
  right: -13px;
  top: 80px;
  width: 26px;
  height: 26px;
  background-color: #222;
  border: 1px solid #00ff00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff00;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
  }
`;

// Menu sections
const MenuSection = styled.div`
  margin: 20px 0;
  ${props => !props.isOpen && css`
    margin: 30px 0;
  `}
`;

const SectionTitle = styled.div`
  padding: 0 24px 8px;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: rgba(0, 255, 0, 0.6);
  overflow: hidden;
  white-space: nowrap;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
  
  &:after {
    content: '';
    display: block;
    margin-top: 5px;
    width: 24px;
    height: 2px;
    background: linear-gradient(90deg, #00ff00, transparent);
  }
`;

// Menu items
const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${props => props.isOpen ? '12px 24px' : '12px 19px'};
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin: 6px 0;
  position: relative;
  border-radius: ${props => props.isOpen ? '0 8px 8px 0' : '8px'};
  margin-left: ${props => props.isOpen ? '0' : '6px'};
  margin-right: ${props => props.isOpen ? '0' : '6px'};
  white-space: nowrap;
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.3s ease;
  
  ${props => props.isOpen && css`
    &:hover {
      background: rgba(0, 255, 0, 0.1);
      color: #00ff00;
      transform: translateX(5px);
    }
  
    &.active {
      background: linear-gradient(90deg, rgba(0, 255, 0, 0.2), transparent);
      color: #00ff00;
      border-left: 3px solid #00ff00;
      padding-left: 21px;
      font-weight: 600;
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: #00ff00;
        box-shadow: 0 0 10px #00ff00;
      }
    }
  `}
  
  ${props => !props.isOpen && css`
    justify-content: center;
    
    &:hover, &.active {
      background: rgba(0, 255, 0, 0.1);
      color: #00ff00;
    }
    
    &.active {
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.3) inset;
    }
  `}
`;

const MenuIcon = styled.div`
  margin-right: ${props => props.isOpen ? '12px' : '0'};
  display: flex;
  align-items: center;
  font-size: 18px;
  transition: all 0.2s ease;
  
  ${props => !props.isOpen && css`
    margin-right: 0;
  `}
`;

const MenuText = styled.span`
  transition: opacity 0.3s ease;
  opacity: ${props => props.isOpen ? 1 : 0};
  font-size: 14px;
`;

// Submenu components
const SubmenuContainer = styled.div`
  margin-left: ${props => props.isOpen ? '12px' : '0'};
  height: ${props => props.isOpen && props.isSubmenuOpen ? 'auto' : '0'};
  overflow: hidden;
  transition: height 0.3s ease;
  opacity: ${props => !props.isOpen ? '0' : '1'};
`;

const SubmenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: ${props => props.isOpen ? '12px 24px' : '12px 18px'};
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  margin: 6px 0;
  border-radius: ${props => props.isOpen ? '0 8px 8px 0' : '8px'};
  margin-left: ${props => props.isOpen ? '0' : '6px'};
  margin-right: ${props => props.isOpen ? '0' : '6px'};
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
    transform: ${props => props.isOpen ? 'translateX(5px)' : 'none'};
  }
  
  ${props => !props.isOpen && css`
    justify-content: center;
  `}
`;

const SubMenuIcon = styled.div`
  margin-right: ${props => props.isOpen ? '12px' : '0'};
  display: flex;
  font-size: 18px;
`;

const ChevronIcon = styled.div`
  transition: transform 0.3s ease;
  transform: rotate(${props => props.isSubmenuOpen ? '90deg' : '0'});
  opacity: ${props => !props.isOpen ? '0' : '1'};
`;

const SubmenuItem = styled(NavLink)`
  display: ${props => props.isOpen && props.isSubmenuOpen ? 'flex' : 'none'};
  align-items: center;
  padding: 10px 24px 10px 48px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  position: relative;
  transition: all 0.2s ease;
  animation: ${fadeIn} 0.5s ease;
  font-size: 13px;
  
  &:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.05);
    padding-left: 52px;
  }
  
  &.active {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
    font-weight: 500;
    
    &:before {
      content: '';
      position: absolute;
      left: 38px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #00ff00;
      box-shadow: 0 0 8px #00ff00;
    }
  }
`;

const SideMenu = ({ isOpen, toggleMenu }) => {
  const [activeSubmenu, setActiveSubmenu] = useState('');

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? '' : menu);
  };

  return (
    <SideMenuContainer isOpen={isOpen}>
      <LogoContainer isOpen={isOpen}>
        <Logo isOpen={isOpen}>
          {isOpen ? 'UWSN SIMULATOR' : 'UWSN'}
        </Logo>
      </LogoContainer>

      <ToggleButton onClick={toggleMenu}>
        {isOpen ? <FiChevronRight size={14} /> : <FiMenu size={14} />}
      </ToggleButton>

      <MenuSection isOpen={isOpen}>
        <SectionTitle isOpen={isOpen}>MAIN</SectionTitle>
        <MenuItem to="/" isOpen={isOpen} end>
          <MenuIcon isOpen={isOpen}><FiHome /></MenuIcon>
          <MenuText isOpen={isOpen}>Dashboard</MenuText>
        </MenuItem>
      </MenuSection>

      <MenuSection isOpen={isOpen}>
        <SectionTitle isOpen={isOpen}>SIMULATION</SectionTitle>
        <MenuItem to="/simulation" isOpen={isOpen}>
          <MenuIcon isOpen={isOpen}><FiActivity /></MenuIcon>
          <MenuText isOpen={isOpen}>Run Simulation</MenuText>
        </MenuItem>
        <MenuItem to="/energy" isOpen={isOpen}>
          <MenuIcon isOpen={isOpen}><FiBatteryCharging /></MenuIcon>
          <MenuText isOpen={isOpen}>Energy Consumption</MenuText>
        </MenuItem>
        <MenuItem to="/performance" isOpen={isOpen}>
          <MenuIcon isOpen={isOpen}><FiBarChart2 /></MenuIcon>
          <MenuText isOpen={isOpen}>Performance Metrics</MenuText>
        </MenuItem>
      </MenuSection>

      <MenuSection isOpen={isOpen}>
        <SectionTitle isOpen={isOpen}>ANALYSIS</SectionTitle>
        <MenuItem to="/protocols" isOpen={isOpen}>
          <MenuIcon isOpen={isOpen}><FiCpu /></MenuIcon>
          <MenuText isOpen={isOpen}>Protocol Comparison</MenuText>
        </MenuItem>

        <SubmenuHeader
          isOpen={isOpen}
          onClick={() => toggleSubmenu('analytics')}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SubMenuIcon isOpen={isOpen}><FiPieChart /></SubMenuIcon>
            <MenuText isOpen={isOpen}>Analytics</MenuText>
          </div>
          <ChevronIcon isOpen={isOpen} isSubmenuOpen={activeSubmenu === 'analytics'}>
            <FiChevronRight size={14} />
          </ChevronIcon>
        </SubmenuHeader>

        <SubmenuContainer isOpen={isOpen} isSubmenuOpen={activeSubmenu === 'analytics'}>
          <SubmenuItem to="/analytics" isOpen={isOpen} isSubmenuOpen={activeSubmenu === 'analytics'}>
            Overview
          </SubmenuItem>
          <SubmenuItem to="/performance-trends" isOpen={isOpen} isSubmenuOpen={activeSubmenu === 'analytics'}>
            Performance Trends
          </SubmenuItem>
        </SubmenuContainer>
      </MenuSection>

      <MenuSection isOpen={isOpen}>
        <SectionTitle isOpen={isOpen}>HELP</SectionTitle>
        <MenuItem to="/help" isOpen={isOpen}>
          <MenuIcon isOpen={isOpen}><FiHelpCircle /></MenuIcon>
          <MenuText isOpen={isOpen}>Help & About</MenuText>
        </MenuItem>
      </MenuSection>
    </SideMenuContainer>
  );
};

export default SideMenu; 