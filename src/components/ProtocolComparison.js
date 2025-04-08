import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Radar, Bar, Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Container,
  Title,
  Section,
  SectionTitle,
  Text,
  ChartContainer,
  Controls,
  ControlButton,
  TwoColumnLayout,
  Card,
  CardTitle,
  CardContent,
  Table,
  Th,
  Td
} from '../styles/SharedComponents';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

const ProtocolSelector = styled(Controls)`
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const ProtocolCard = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(51, 51, 51, 0.8);
  transition: all 0.3s ease;
  margin-bottom: 16px;
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.4);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const ProtocolName = styled.h3`
  color: #00ff00;
  margin-bottom: 12px;
  font-size: 1.2rem;
`;

const FeaturesList = styled.ul`
  margin: 12px 0;
  padding-left: 20px;
  
  li {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
    line-height: 1.4;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const MetricCard = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(51, 51, 51, 0.8);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff00;
  margin: 12px 0;
`;

const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const getChartOptions = (titleText) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: titleText,
      color: '#00ff00',
      font: {
        size: 16,
        weight: 'normal',
      },
      padding: {
        bottom: 20,
      },
    },
    legend: {
      position: 'top',
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#00ff00',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#00ff00',
      borderWidth: 1,
    },
  },
  scales: {
    r: {
      angleLines: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      pointLabels: {
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 12,
        },
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
        backdropColor: 'transparent',
        stepSize: 20,
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
  animation: {
    duration: 2000,
  },
});

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Network Size (nodes)',
        color: 'rgba(255, 255, 255, 0.7)',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Packet Delivery Ratio (%)',
        color: 'rgba(255, 255, 255, 0.7)',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Protocol Scalability Comparison',
      color: '#00ff00',
      font: {
        size: 16,
      },
      padding: {
        bottom: 20,
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#00ff00',
      bodyColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: '#00ff00',
      borderWidth: 1,
    },
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        boxWidth: 15,
        usePointStyle: true,
        pointStyle: 'circle',
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
  animation: {
    duration: 2000,
  },
};

function ProtocolComparison() {
  const [selectedProtocols, setSelectedProtocols] = useState(['VBF', 'DBR', 'OLSR']);

  const protocols = {
    'VBF': {
      name: 'Vector-Based Forwarding',
      description: 'A location-based routing protocol that uses a virtual "routing pipe" to guide packet forwarding.',
      features: [
        'Uses geographical information for routing decisions',
        'Employs a virtual "routing pipe" between source and sink',
        'Reduces the number of forwarding nodes',
        'Adjustable routing pipe radius parameter'
      ],
      metrics: {
        energyEfficiency: 75,
        deliveryRatio: 93.2,
        delay: 156,
        scalability: 72,
        controlOverhead: 84,
        networkLifetime: 80
      }
    },
    'DBR': {
      name: 'Depth-Based Routing',
      description: 'A pressure-based routing protocol that forwards packets based on depth information.',
      features: [
        'Requires only depth information rather than full location',
        'Greedy forwarding to nodes at lower depths',
        'Uses a holding time to reduce redundant transmissions',
        'No requirement for complete location information'
      ],
      metrics: {
        energyEfficiency: 70,
        deliveryRatio: 91.7,
        delay: 187,
        scalability: 80,
        controlOverhead: 63,
        networkLifetime: 65
      }
    },
    'EEDBR': {
      name: 'Energy-Efficient DBR',
      description: 'An enhanced version of DBR that considers residual energy in routing decisions.',
      features: [
        'Considers both depth and residual energy',
        'Balances energy consumption across the network',
        'Extends network lifetime compared to DBR',
        'Adaptive holding time calculation'
      ],
      metrics: {
        energyEfficiency: 83,
        deliveryRatio: 89.5,
        delay: 201,
        scalability: 75,
        controlOverhead: 58,
        networkLifetime: 75
      }
    },
    'OLSR': {
      name: 'Optimized Link State Routing',
      description: 'A proactive link-state routing protocol optimized for mobile ad-hoc networks.',
      features: [
        'Maintains routing tables for all destinations',
        'Uses Multipoint Relays (MPRs) to reduce flooding',
        'Periodic exchange of topology information',
        'Fast route computation with minimal delay'
      ],
      metrics: {
        energyEfficiency: 60,
        deliveryRatio: 95.8,
        delay: 143,
        scalability: 65,
        controlOverhead: 90,
        networkLifetime: 55
      }
    },
    'HHVBF': {
      name: 'Hop-by-Hop Vector-Based Forwarding',
      description: 'An enhancement of VBF that creates routing vectors on a per-hop basis.',
      features: [
        'Establishes routing vectors at each forwarding hop',
        'More robust to node mobility and water currents',
        'Improved packet delivery in sparse networks',
        'Greater resilience to frequent topology changes'
      ],
      metrics: {
        energyEfficiency: 78,
        deliveryRatio: 91.8,
        delay: 168,
        scalability: 68,
        controlOverhead: 80,
        networkLifetime: 72
      }
    }
  };

  const toggleProtocol = (protocol) => {
    if (selectedProtocols.includes(protocol)) {
      // Remove protocol if already selected
      setSelectedProtocols(selectedProtocols.filter(p => p !== protocol));
    } else {
      // Add protocol if less than 3 are selected
      if (selectedProtocols.length < 3) {
        setSelectedProtocols([...selectedProtocols, protocol]);
      }
    }
  };

  // Radar chart data for protocol comparison
  const radarData = {
    labels: ['Energy Efficiency', 'Delivery Ratio', 'Low Delay', 'Scalability', 'Low Control Overhead', 'Network Lifetime'],
    datasets: selectedProtocols.map((protocol, index) => {
      const colors = [
        { border: 'rgba(0, 255, 0, 0.8)', background: 'rgba(0, 255, 0, 0.2)' },
        { border: 'rgba(136, 255, 136, 0.8)', background: 'rgba(136, 255, 136, 0.2)' },
        { border: 'rgba(0, 170, 0, 0.8)', background: 'rgba(0, 170, 0, 0.2)' }
      ];

      return {
        label: protocol,
        data: [
          protocols[protocol].metrics.energyEfficiency,
          protocols[protocol].metrics.deliveryRatio,
          100 - (protocols[protocol].metrics.delay / 4), // Normalize delay (lower is better)
          protocols[protocol].metrics.scalability,
          protocols[protocol].metrics.controlOverhead,
          protocols[protocol].metrics.networkLifetime
        ],
        backgroundColor: colors[index].background,
        borderColor: colors[index].border,
        pointBackgroundColor: colors[index].border,
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors[index].border,
        borderWidth: 2,
      };
    }),
  };

  // Line chart data for scalability comparison
  const scalabilityData = {
    labels: [20, 40, 60, 80, 100, 120, 140],
    datasets: selectedProtocols.map((protocol, index) => {
      const baseColors = [
        '#00ff00',
        '#88ff88',
        '#00aa00'
      ];

      // Generate data points with a base value plus protocol-specific bias
      const baseDeliveryRatio = protocols[protocol].metrics.deliveryRatio;
      const scalabilityFactor = protocols[protocol].metrics.scalability / 100;

      const generatePoints = () => {
        return [20, 40, 60, 80, 100, 120, 140].map(nodes => {
          // As network size increases, protocols with better scalability maintain delivery ratio better
          const decay = (1 - scalabilityFactor) * Math.log(nodes / 20) * 0.1;
          return Math.max(baseDeliveryRatio * (1 - decay), 50);
        });
      };

      return {
        label: protocol,
        data: generatePoints(),
        borderColor: baseColors[index],
        backgroundColor: `${baseColors[index]}20`,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: baseColors[index],
      };
    }),
  };

  return (
    <Container>
      <Title>Protocol Comparison</Title>

      <Section>
        <SectionTitle>Protocol Performance Comparison</SectionTitle>
        <Text>
          Compare performance characteristics of different routing protocols for underwater wireless sensor networks.
          Select up to three protocols to visualize their relative strengths and weaknesses.
        </Text>

        <ProtocolSelector>
          {Object.keys(protocols).map((protocol) => (
            <ControlButton
              key={protocol}
              active={selectedProtocols.includes(protocol)}
              onClick={() => toggleProtocol(protocol)}
            >
              {protocol}
            </ControlButton>
          ))}
        </ProtocolSelector>

        <ChartContainer>
          <Radar data={radarData} options={getChartOptions('Protocol Performance Metrics')} />
        </ChartContainer>

        <TwoColumnLayout>
          <div>
            <SectionTitle>Protocol Scalability</SectionTitle>
            <Text>
              This chart shows how packet delivery ratio changes as the network size increases.
              Protocols with better scalability maintain higher delivery ratios in larger networks.
            </Text>

            <ChartContainer>
              <Line data={scalabilityData} options={lineChartOptions} />
            </ChartContainer>
          </div>

          <div>
            <SectionTitle>Key Performance Metrics</SectionTitle>
            <Text>
              Detailed comparison of key performance metrics for the selected protocols.
            </Text>

            <Table>
              <thead>
                <tr>
                  <Th>Metric</Th>
                  {selectedProtocols.map(protocol => (
                    <Th key={protocol}>{protocol}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Energy Efficiency</Td>
                  {selectedProtocols.map(protocol => (
                    <Td key={protocol}>{protocols[protocol].metrics.energyEfficiency}/100</Td>
                  ))}
                </tr>
                <tr>
                  <Td>Packet Delivery Ratio</Td>
                  {selectedProtocols.map(protocol => (
                    <Td key={protocol}>{protocols[protocol].metrics.deliveryRatio}%</Td>
                  ))}
                </tr>
                <tr>
                  <Td>End-to-End Delay</Td>
                  {selectedProtocols.map(protocol => (
                    <Td key={protocol}>{protocols[protocol].metrics.delay} ms</Td>
                  ))}
                </tr>
                <tr>
                  <Td>Scalability</Td>
                  {selectedProtocols.map(protocol => (
                    <Td key={protocol}>{protocols[protocol].metrics.scalability}/100</Td>
                  ))}
                </tr>
                <tr>
                  <Td>Control Overhead</Td>
                  {selectedProtocols.map(protocol => (
                    <Td key={protocol}>{protocols[protocol].metrics.controlOverhead}/100</Td>
                  ))}
                </tr>
                <tr>
                  <Td>Network Lifetime</Td>
                  {selectedProtocols.map(protocol => (
                    <Td key={protocol}>{protocols[protocol].metrics.networkLifetime}/100</Td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </TwoColumnLayout>
      </Section>

      <Section>
        <SectionTitle>Protocol Details</SectionTitle>
        <Text>
          Detailed description of the selected protocols, their features, and operational characteristics.
        </Text>

        {selectedProtocols.map(protocol => (
          <ProtocolCard key={protocol}>
            <ProtocolName>{protocols[protocol].name} ({protocol})</ProtocolName>
            <Text>{protocols[protocol].description}</Text>
            <SectionTitle style={{ fontSize: '1rem' }}>Key Features</SectionTitle>
            <FeaturesList>
              {protocols[protocol].features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </FeaturesList>
          </ProtocolCard>
        ))}
      </Section>
    </Container>
  );
}

export default ProtocolComparison; 