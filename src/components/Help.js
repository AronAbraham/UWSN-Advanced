import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #00ff00;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`;

const Section = styled.div`
  margin-bottom: 40px;
  background: rgba(0, 0, 0, 0.2);
  padding: 25px;
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #00ff00;
  margin-bottom: 15px;
  font-size: 1.5em;
`;

const Text = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  color: rgba(255, 255, 255, 0.8);
  margin-left: 20px;
  line-height: 1.6;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const Help = () => {
  return (
    <Container>
      <Title>Help & About</Title>

      <Section>
        <SectionTitle>About UWSN Simulator</SectionTitle>
        <Text>
          The Underwater Wireless Sensor Network (UWSN) Simulator is a powerful tool designed for researchers
          and engineers to simulate and analyze underwater sensor networks. Our simulator provides accurate
          modeling of underwater communication environments and network protocols.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Key Features</SectionTitle>
        <List>
          <ListItem>Real-time 3D visualization of underwater sensor networks</ListItem>
          <ListItem>Multiple routing protocol support (VBF, DBR, and more)</ListItem>
          <ListItem>Comprehensive energy consumption analysis</ListItem>
          <ListItem>Detailed performance metrics and analytics</ListItem>
          <ListItem>Protocol comparison and optimization tools</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Quick Start</SectionTitle>
        <Text>
          To begin using the simulator:
        </Text>
        <List>
          <ListItem>Navigate to the "Run Simulation" page</ListItem>
          <ListItem>Configure your network parameters</ListItem>
          <ListItem>Select a routing protocol</ListItem>
          <ListItem>Start the simulation and observe the results</ListItem>
          <ListItem>Use the analytics tools to analyze performance</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <Text>
          For additional support or questions, please contact our team at support@uwsn-simulator.com
        </Text>
      </Section>
    </Container>
  );
};

export default Help; 