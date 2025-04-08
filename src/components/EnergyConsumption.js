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
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
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
  SliderContainer,
  SliderLabel,
  Slider,
  Grid
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
  Filler
);

const ProtocolSelector = styled(Controls)`
  margin-bottom: 24px;
`;

const MetricCard = styled(Card)`
  text-align: center;
  padding: 20px;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #00ff00;
  margin: 12px 0;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(51, 51, 51, 0.5);
  }
  
  th {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  td {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
  
  tr:hover {
    background-color: rgba(0, 255, 0, 0.05);
  }
`;

function EnergyConsumption() {
  const [selectedProtocol, setSelectedProtocol] = useState('VBF');
  const [nodeCount, setNodeCount] = useState(100);
  const [simulationTime, setSimulationTime] = useState(30);

  // Energy consumption data
  const getEnergyConsumptionData = () => {
    // Base values
    const baseEnergy = {
      'VBF': 0.12,
      'DBR': 0.10,
      'EEDBR': 0.08,
      'OLSR': 0.15,
      'HHVBF': 0.11
    };

    // Calculate energy based on selected protocol, node count and time
    const energyPerMinute = baseEnergy[selectedProtocol] * (nodeCount / 100);

    // Generate time points (in minutes)
    const timePoints = Array.from({ length: simulationTime + 1 }, (_, i) => i);

    // Calculate cumulative energy consumption with some randomness
    const energyData = timePoints.map(time => {
      const baseValue = energyPerMinute * time;
      const randomFactor = 0.95 + Math.random() * 0.1; // Random between 0.95 and 1.05
      return (baseValue * randomFactor).toFixed(2);
    });

    return {
      labels: timePoints,
      datasets: [
        {
          label: 'Energy Consumption (J)',
          data: energyData,
          borderColor: '#00ff00',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  // Energy breakdown data
  const getEnergyBreakdownData = () => {
    // Energy breakdown percentages for different protocols
    const breakdowns = {
      'VBF': {
        'Transmission': 40,
        'Reception': 25,
        'Idle Listening': 20,
        'Processing': 10,
        'Sleep': 5
      },
      'DBR': {
        'Transmission': 38,
        'Reception': 28,
        'Idle Listening': 18,
        'Processing': 12,
        'Sleep': 4
      },
      'EEDBR': {
        'Transmission': 35,
        'Reception': 25,
        'Idle Listening': 15,
        'Processing': 10,
        'Sleep': 15
      },
      'OLSR': {
        'Transmission': 45,
        'Reception': 30,
        'Idle Listening': 15,
        'Processing': 8,
        'Sleep': 2
      },
      'HHVBF': {
        'Transmission': 42,
        'Reception': 26,
        'Idle Listening': 18,
        'Processing': 9,
        'Sleep': 5
      }
    };

    return {
      labels: Object.keys(breakdowns[selectedProtocol]),
      datasets: [
        {
          label: 'Energy Percentage',
          data: Object.values(breakdowns[selectedProtocol]),
          backgroundColor: [
            'rgba(0, 255, 0, 0.8)',
            'rgba(50, 255, 50, 0.7)',
            'rgba(100, 255, 100, 0.6)',
            'rgba(150, 255, 150, 0.5)',
            'rgba(200, 255, 200, 0.4)'
          ],
          borderColor: [
            'rgba(0, 255, 0, 1)',
            'rgba(50, 255, 50, 1)',
            'rgba(100, 255, 100, 1)',
            'rgba(150, 255, 150, 1)',
            'rgba(200, 255, 200, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Cumulative Energy Consumption Over Time',
        color: '#00ff00',
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00ff00',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#00ff00',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (minutes)',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Energy (Joules)',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Energy Consumption Breakdown',
        color: '#00ff00',
        font: {
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00ff00',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#00ff00',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  // Energy statistics
  const getEnergyStats = () => {
    const baseValues = {
      'VBF': { perPacket: 0.0045, perNode: 0.12, lifetime: 280 },
      'DBR': { perPacket: 0.0040, perNode: 0.10, lifetime: 320 },
      'EEDBR': { perPacket: 0.0035, perNode: 0.08, lifetime: 380 },
      'OLSR': { perPacket: 0.0055, perNode: 0.15, lifetime: 240 },
      'HHVBF': { perPacket: 0.0042, perNode: 0.11, lifetime: 300 }
    };

    // Adjust values based on node count
    const nodeFactor = nodeCount / 100;
    const stats = baseValues[selectedProtocol];

    // Calculate total energy for the simulation
    const totalEnergy = stats.perNode * nodeCount * simulationTime / 60;

    return {
      perPacket: stats.perPacket,
      perNode: stats.perNode,
      perHour: stats.perNode * 60,
      networkTotal: totalEnergy.toFixed(2),
      estimatedLifetime: Math.round(stats.lifetime / nodeFactor)
    };
  };

  const stats = getEnergyStats();

  return (
    <Container>
      <Title>Energy Consumption Analysis</Title>

      <Section>
        <SectionTitle>Energy Profile Configuration</SectionTitle>
        <Text>
          Configure the simulation parameters to visualize energy consumption patterns
          for different routing protocols and network configurations.
        </Text>

        <TwoColumnLayout>
          <div>
            <ProtocolSelector>
              {['VBF', 'DBR', 'EEDBR', 'OLSR', 'HHVBF'].map(protocol => (
                <ControlButton
                  key={protocol}
                  active={selectedProtocol === protocol}
                  onClick={() => setSelectedProtocol(protocol)}
                >
                  {protocol}
                </ControlButton>
              ))}
            </ProtocolSelector>

            <SliderContainer>
              <SliderLabel>
                <span>Network Size</span>
                <span>{nodeCount} nodes</span>
              </SliderLabel>
              <Slider
                type="range"
                min="20"
                max="300"
                step="10"
                value={nodeCount}
                onChange={e => setNodeCount(parseInt(e.target.value))}
              />
            </SliderContainer>

            <SliderContainer>
              <SliderLabel>
                <span>Simulation Duration</span>
                <span>{simulationTime} minutes</span>
              </SliderLabel>
              <Slider
                type="range"
                min="5"
                max="60"
                step="5"
                value={simulationTime}
                onChange={e => setSimulationTime(parseInt(e.target.value))}
              />
            </SliderContainer>
          </div>

          <Grid>
            <MetricCard>
              <MetricLabel>Energy Per Node</MetricLabel>
              <MetricValue>{stats.perNode} J/min</MetricValue>
            </MetricCard>

            <MetricCard>
              <MetricLabel>Network Total</MetricLabel>
              <MetricValue>{stats.networkTotal} J</MetricValue>
            </MetricCard>

            <MetricCard>
              <MetricLabel>Energy Per Packet</MetricLabel>
              <MetricValue>{stats.perPacket} J</MetricValue>
            </MetricCard>

            <MetricCard>
              <MetricLabel>Est. Lifetime</MetricLabel>
              <MetricValue>{stats.estimatedLifetime} hrs</MetricValue>
            </MetricCard>
          </Grid>
        </TwoColumnLayout>
      </Section>

      <Section>
        <SectionTitle>Energy Consumption Visualization</SectionTitle>
        <Text>
          Visualize energy consumption patterns over time and the breakdown of energy usage
          across different activities for the selected protocol and configuration.
        </Text>

        <TwoColumnLayout>
          <ChartContainer>
            <Line data={getEnergyConsumptionData()} options={lineChartOptions} />
          </ChartContainer>

          <ChartContainer>
            <Bar data={getEnergyBreakdownData()} options={barChartOptions} />
          </ChartContainer>
        </TwoColumnLayout>

        <SectionTitle style={{ marginTop: '32px' }}>Detailed Energy Analysis</SectionTitle>
        <Text>
          Detailed breakdown of energy consumption for {selectedProtocol} protocol with {nodeCount} nodes.
        </Text>

        <StatsTable>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Energy Share</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Transmission</td>
              <td>{getEnergyBreakdownData().datasets[0].data[0]}%</td>
              <td>Energy consumed during data packet transmission</td>
            </tr>
            <tr>
              <td>Reception</td>
              <td>{getEnergyBreakdownData().datasets[0].data[1]}%</td>
              <td>Energy consumed when receiving data packets</td>
            </tr>
            <tr>
              <td>Idle Listening</td>
              <td>{getEnergyBreakdownData().datasets[0].data[2]}%</td>
              <td>Energy consumed while waiting for packets</td>
            </tr>
            <tr>
              <td>Processing</td>
              <td>{getEnergyBreakdownData().datasets[0].data[3]}%</td>
              <td>Computational energy for routing decisions</td>
            </tr>
            <tr>
              <td>Sleep Mode</td>
              <td>{getEnergyBreakdownData().datasets[0].data[4]}%</td>
              <td>Energy saved during low-power sleep states</td>
            </tr>
          </tbody>
        </StatsTable>
      </Section>

      <Section>
        <SectionTitle>Energy Optimization Recommendations</SectionTitle>
        <Text>
          Based on the energy analysis of {selectedProtocol} protocol with {nodeCount} nodes,
          the following recommendations can help optimize energy efficiency.
        </Text>

        <TwoColumnLayout>
          <Card>
            <SectionTitle style={{ fontSize: '1.2rem' }}>Protocol-specific Optimizations</SectionTitle>
            {selectedProtocol === 'VBF' && (
              <Text>
                • Optimize routing vector radius to reduce forwarding nodes<br />
                • Implement adaptive vector radius based on node density<br />
                • Reduce control packet overhead in stable environments<br />
                • Consider hybrid approaches in high-mobility scenarios
              </Text>
            )}
            {selectedProtocol === 'DBR' && (
              <Text>
                • Tune holding time parameters to minimize redundant transmissions<br />
                • Optimize depth threshold to reduce forwarder count<br />
                • Implement priority-based forwarding for critical data<br />
                • Consider location-based enhancements for improved efficiency
              </Text>
            )}
            {selectedProtocol === 'EEDBR' && (
              <Text>
                • Fine-tune energy and depth weighting in forwarding decisions<br />
                • Optimize residual energy threshold for balanced consumption<br />
                • Implement adaptive sleep scheduling for non-critical nodes<br />
                • Consider cluster-based approaches for larger networks
              </Text>
            )}
            {selectedProtocol === 'OLSR' && (
              <Text>
                • Reduce MPR selection frequency in stable networks<br />
                • Optimize HELLO message intervals based on mobility<br />
                • Implement energy-aware MPR selection<br />
                • Consider topology control to reduce transmission power
              </Text>
            )}
            {selectedProtocol === 'HHVBF' && (
              <Text>
                • Optimize per-hop vector calculations to reduce processing<br />
                • Implement adaptive forwarding based on link quality<br />
                • Consider opportunistic routing enhancements<br />
                • Balance robustness and energy consumption with vector radius
              </Text>
            )}
          </Card>

          <Card>
            <SectionTitle style={{ fontSize: '1.2rem' }}>General Energy-Saving Strategies</SectionTitle>
            <Text>
              • Implement duty cycling to reduce idle listening<br />
              • Optimize transmission power based on distance<br />
              • Use data aggregation to reduce packet count<br />
              • Employ compression techniques for large data sets<br />
              • Implement adaptive sleep scheduling<br />
              • Consider multi-sink architecture for larger networks<br />
              • Use event-driven transmission instead of periodic<br />
              • Integrate energy harvesting where applicable
            </Text>
          </Card>
        </TwoColumnLayout>
      </Section>
    </Container>
  );
}

export default EnergyConsumption; 