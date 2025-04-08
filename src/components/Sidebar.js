import React from 'react';
import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 240px;
  background-color: rgba(15, 15, 15, 0.9);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  padding: 30px 0;
  border-right: 1px solid rgba(51, 51, 51, 0.5);
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
`;

const NavLink = styled(RouterNavLink)`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: rgba(204, 204, 204, 0.8);
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  font-weight: 500;
  margin: 4px 0;
  
  &:hover {
    background-color: rgba(34, 34, 34, 0.6);
    color: #00ff00;
    border-left-color: rgba(0, 170, 0, 0.5);
    transform: translateX(3px);
  }
  
  &.active {
    font-weight: 600;
    background-color: rgba(34, 34, 34, 0.8);
    color: #00ff00;
    border-left-color: #00ff00;
    box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.1);
  }
  
  &:before {
    content: '';
    width: 6px;
    height: 6px;
    background-color: currentColor;
    border-radius: 50%;
    margin-right: 12px;
    transition: all 0.2s ease;
    opacity: 0.7;
  }
  
  &:hover:before,
  &.active:before {
    background-color: #00ff00;
    opacity: 1;
    box-shadow: 0 0 8px #00ff00;
  }
`;

const NavSection = styled.div`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  padding: 8px 24px 12px;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(0, 255, 0, 0.7);
  font-weight: 600;
  letter-spacing: 1.5px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 24px;
    width: 30px;
    height: 2px;
    background-color: rgba(0, 255, 0, 0.3);
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <NavSection>
        <SectionTitle>MAIN</SectionTitle>
        <NavLink to="/" end>Dashboard</NavLink>
      </NavSection>

      <NavSection>
        <SectionTitle>SIMULATION</SectionTitle>
        <NavLink to="/simulation">Run Simulation</NavLink>
        <NavLink to="/energy-consumption">Energy Consumption</NavLink>
        <NavLink to="/performance-metrics">Performance Metrics</NavLink>
      </NavSection>

      <NavSection>
        <SectionTitle>ANALYSIS</SectionTitle>
        <NavLink to="/protocol-comparison">Protocol Comparison</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </NavSection>

      <NavSection>
        <SectionTitle>SYSTEM</SectionTitle>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/help">Help & About</NavLink>
      </NavSection>
    </SidebarContainer>
  );
}

export default Sidebar; 