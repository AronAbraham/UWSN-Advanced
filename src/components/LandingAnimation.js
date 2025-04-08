import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const LandingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeOut} 0.5s ease-out forwards;
  animation-delay: 2s;
`;

const Logo = styled.div`
  font-size: 3em;
  font-weight: 800;
  color: #00ff00;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  margin-bottom: 30px;
  animation: ${float} 3s ease-in-out infinite;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  background-color: #00ff00;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`;

const LoadingText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 20px;
  font-size: 1.2em;
  letter-spacing: 2px;
`;

const LandingAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <LandingContainer>
      <Logo>UWSN SIMULATOR</Logo>
      <LoadingDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </LoadingDots>
      <LoadingText>INITIALIZING</LoadingText>
    </LandingContainer>
  );
};

export default LandingAnimation; 