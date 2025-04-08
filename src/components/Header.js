import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 70px;
  background-color: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(0, 255, 0, 0) 0%, 
      rgba(0, 255, 0, 0.5) 50%,
      rgba(0, 255, 0, 0) 100%);
    z-index: 1;
    animation: gradient-shift 8s linear infinite;
    background-size: 200% 100%;
  }
`;

const Logo = styled(Link)`
  font-size: 22px;
  font-weight: 700;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
  display: flex;
  align-items: center;
  animation: glow 3s ease-in-out infinite;
  position: relative;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #00ff00;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0 0 10px #00ff00;
    animation: pulse 2s infinite;
  }
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 15px;
  position: relative;
  padding: 6px 0;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #00ff00;
    transition: width 0.3s ease, box-shadow 0.3s ease;
  }
  
  &:hover {
    color: #fff;
    transform: translateY(-2px);
    
    &:after {
      width: 100%;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
  }
  
  &.active {
    color: #00ff00;
    
    &:after {
      width: 100%;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
  }
`;

function Header() {
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      link.style.opacity = 0;
      link.style.transform = 'translateY(10px)';

      setTimeout(() => {
        link.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        link.style.opacity = 1;
        link.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
    });
  }, []);

  return (
    <HeaderContainer>
      <Logo to="/">UWSN Simulator</Logo>
      <Nav>
        <NavLink to="/" className={window.location.pathname === "/" ? "active nav-link" : "nav-link"}>Dashboard</NavLink>
        <NavLink to="/simulation" className={window.location.pathname === "/simulation" ? "active nav-link" : "nav-link"}>Simulation</NavLink>
        <NavLink to="/settings" className={window.location.pathname === "/settings" ? "active nav-link" : "nav-link"}>Settings</NavLink>
        <NavLink to="/about" className={window.location.pathname === "/about" ? "active nav-link" : "nav-link"}>About</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 