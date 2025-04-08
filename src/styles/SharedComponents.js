import styled, { keyframes, css } from 'styled-components';

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
`;

// Layout components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  animation: ${fadeIn} 0.5s ease-out;
  font-family: 'Inter', sans-serif;
`;

export const Title = styled.h1`
  color: #00ff00;
  margin-bottom: 24px;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #00ff00, rgba(0, 255, 0, 0.1));
    border-radius: 2px;
  }
`;

export const Section = styled.section`
  background-color: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 50, 50, 0.5);
  margin-bottom: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 0, 0.1);
  }
`;

export const SectionTitle = styled.h2`
  color: #00ff00;
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

export const Text = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
  line-height: 1.6;
`;

export const ChartContainer = styled.div`
  height: 350px;
  background: rgba(20, 20, 20, 0.4);
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  border: 1px solid rgba(51, 51, 51, 0.8);
  
  canvas {
    max-width: 100%;
    max-height: 100%;
  }
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.5);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 0, 0.1);
    transition: all 0.3s ease;
  }
`;

// Control components
export const Controls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const ControlButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? '#00ff00' : 'rgba(51, 51, 51, 0.8)'};
  background-color: ${props => props.active ? 'rgba(0, 255, 0, 0.15)' : 'rgba(25, 25, 25, 0.6)'};
  color: ${props => props.active ? '#00ff00' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(0, 255, 0, 0.2)' : 'rgba(51, 51, 51, 0.3)'};
    border-color: ${props => props.active ? '#00ff00' : 'rgba(0, 255, 0, 0.3)'};
  }
  
  ${props => props.active && css`
    animation: ${pulse} 2s infinite;
  `}
`;

// Table components
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 255, 0, 0.3);
  font-size: 0.9rem;
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid rgba(51, 51, 51, 0.5);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

// Grid layouts
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Card components
export const Card = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(51, 51, 51, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

export const CardTitle = styled.h3`
  color: #00ff00;
  font-size: 1.1rem;
  margin-bottom: 12px;
`;

export const CardContent = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.5;
`;

// Slider components
export const SliderContainer = styled.div`
  margin-bottom: 16px;
`;

export const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  
  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
  
  span:last-child {
    color: #00ff00;
  }
`;

export const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  background: rgba(51, 51, 51, 0.8);
  border-radius: 3px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #00ff00;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #00ff00;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    cursor: pointer;
    border: none;
  }
  
  &:hover {
    &::-webkit-slider-thumb {
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
    }
    
    &::-moz-range-thumb {
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
    }
  }
`; 