import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Simulation from './components/Simulation';
import SideMenu from './components/SideMenu';
import EnergyConsumption from './components/EnergyConsumption';
import Performance from './components/Performance';
import ProtocolComparison from './components/ProtocolComparison';
import Analytics from './components/Analytics';
import NetworkPerformanceTrends from './components/NetworkPerformanceTrends';
import Help from './components/Help';
import LandingAnimation from './components/LandingAnimation';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #111111;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  max-height: 100vh;
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  const handleLandingComplete = () => {
    setShowLanding(false);
  };

  return (
    <Router>
      <AppContainer>
        {showLanding && <LandingAnimation onComplete={handleLandingComplete} />}
        <SideMenu isOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
        <ContentArea>
          <Routes>
            <Route path="/" element={<Simulation />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/energy" element={<EnergyConsumption />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/performance-trends" element={<NetworkPerformanceTrends />} />
            <Route path="/protocols" element={<ProtocolComparison />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </ContentArea>
      </AppContainer>
    </Router>
  );
}

export default App; 