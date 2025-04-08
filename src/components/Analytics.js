import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiFilter, FiDownload, FiRefreshCw, FiCalendar, FiClock } from 'react-icons/fi';
import EnergyAnalytics from './EnergyAnalytics';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  animation: ${fadeIn} 0.5s ease-out;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
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

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 50, 50, 0.5);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.primary ? '#00ff00' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${props => props.primary ? '#00ff00' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 6px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? 'rgba(0, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    font-size: 16px;
  }
`;

const TimeRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  
  svg {
    color: #00ff00;
  }
`;

const Section = styled.section`
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

const SectionTitle = styled.h2`
  color: #00ff00;
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const SectionSubTitle = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(51, 51, 51, 0.8);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(40, 40, 40, 0.8);
    transform: translateY(-5px);
    border-color: rgba(0, 255, 0, 0.4);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #00ff00;
  margin: 10px 0;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
`;

const StatChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#00ff00' : '#ff4d4d'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  &::before {
    content: '${props => props.positive ? '▲' : '▼'}';
    font-size: 0.7rem;
  }
`;

const ChartContainer = styled.div`
  margin: 20px 0 0;
  border-radius: 12px;
  overflow: hidden;
  height: 300px;
  background: rgba(20, 20, 20, 0.4);
  border: 1px solid rgba(51, 51, 51, 0.8);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(0, 255, 0, 0) 0%, 
      rgba(0, 255, 0, 0.05) 50%, 
      rgba(0, 255, 0, 0) 100%);
    background-size: 200% 100%;
    animation: ${pulse} 2s infinite linear;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 255, 0, 0.7);
  font-size: 0.9rem;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-top: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: rgba(20, 20, 20, 0.4);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(51, 51, 51, 0.8);
`;

const Th = styled.th`
  text-align: left;
  padding: 14px;
  background-color: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid rgba(0, 255, 0, 0.3);
`;

const Td = styled.td`
  padding: 14px;
  border-bottom: 1px solid rgba(51, 51, 51, 0.5);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const Tr = styled.tr`
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 255, 0, 0.05);
  }
`;

const EventList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventItem = styled.div`
  background-color: rgba(34, 34, 34, 0.6);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(51, 51, 51, 0.6);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(40, 40, 40, 0.8);
    border-color: rgba(0, 255, 0, 0.2);
  }
`;

const EventContent = styled.div``;

const EventTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
`;

const EventDetails = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const EventTime = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 255, 0, 0.7);
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(51, 51, 51, 0.8);
`;

const Tab = styled.button`
  padding: 12px 20px;
  background: ${props => props.active ? 'rgba(0, 255, 0, 0.15)' : 'transparent'};
  color: ${props => props.active ? '#00ff00' : 'rgba(255, 255, 255, 0.6)'};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
  }
  
  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #00ff00;
      box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
    }
  `}
`;

function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('energy-reports')) {
      setActiveTab('energyReports');
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'energyReports') {
      window.history.pushState({}, '', '/analytics/energy-reports');
    } else {
      window.history.pushState({}, '', '/analytics');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'energy':
        return <EnergyAnalytics />;
      case 'energyReports':
        return (
          <Section>
            <SectionTitle>Energy Consumption Reports</SectionTitle>

            <Grid>
              <StatCard>
                <StatLabel>Average Power Consumption</StatLabel>
                <StatValue>2.4W</StatValue>
                <StatChange positive>-0.3W vs. previous</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Energy Efficiency</StatLabel>
                <StatValue>78.3%</StatValue>
                <StatChange positive>+4.1% vs. previous</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Battery Lifetime</StatLabel>
                <StatValue>42hrs</StatValue>
                <StatChange positive>+5hrs vs. previous</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Energy per Packet</StatLabel>
                <StatValue>0.18J</StatValue>
                <StatChange positive>-0.03J vs. previous</StatChange>
              </StatCard>
            </Grid>

            <ChartContainer>
              <Line
                data={{
                  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                  datasets: [
                    {
                      label: 'Transmission Energy (J)',
                      data: [42, 40, 41, 38, 36, 35, 33],
                      borderColor: 'rgba(0, 255, 0, 1)',
                      backgroundColor: 'rgba(0, 255, 0, 0.2)',
                      tension: 0.4,
                      fill: true
                    },
                    {
                      label: 'Reception Energy (J)',
                      data: [25, 24, 23, 22, 21, 20, 19],
                      borderColor: 'rgba(0, 200, 0, 1)',
                      backgroundColor: 'rgba(0, 200, 0, 0.2)',
                      tension: 0.4,
                      fill: true
                    },
                    {
                      label: 'Processing Energy (J)',
                      data: [15, 14, 15, 13, 12, 11, 10],
                      borderColor: 'rgba(100, 255, 100, 1)',
                      backgroundColor: 'rgba(100, 255, 100, 0.2)',
                      tension: 0.4,
                      fill: true
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        usePointStyle: true,
                        boxWidth: 8,
                        font: {
                          size: 12
                        }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Energy Consumption Breakdown Over Time',
                      color: '#00ff00',
                      font: {
                        size: 16,
                        weight: 'normal'
                      },
                      padding: {
                        bottom: 20
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#00ff00',
                      bodyColor: 'rgba(255, 255, 255, 0.8)',
                      borderColor: '#00ff00',
                      borderWidth: 1,
                      padding: 10,
                      displayColors: true,
                      usePointStyle: true,
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
                      },
                      title: {
                        display: true,
                        text: 'Energy (Joules)',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }
                    }
                  }
                }}
              />
            </ChartContainer>

            <TwoColumnGrid>
              <Section>
                <SectionTitle>Protocol Energy Efficiency</SectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Protocol</Th>
                      <Th>Avg. Energy</Th>
                      <Th>Peak Energy</Th>
                      <Th>Efficiency</Th>
                      <Th>Battery Life</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <Tr>
                      <Td>VBF</Td>
                      <Td>2.4W</Td>
                      <Td>3.2W</Td>
                      <Td>75.1%</Td>
                      <Td>38hrs</Td>
                    </Tr>
                    <Tr>
                      <Td>DBR</Td>
                      <Td>2.7W</Td>
                      <Td>3.5W</Td>
                      <Td>72.4%</Td>
                      <Td>36hrs</Td>
                    </Tr>
                    <Tr>
                      <Td>EEDBR</Td>
                      <Td>2.2W</Td>
                      <Td>2.8W</Td>
                      <Td>78.3%</Td>
                      <Td>42hrs</Td>
                    </Tr>
                    <Tr>
                      <Td>OLSR</Td>
                      <Td>3.1W</Td>
                      <Td>4.0W</Td>
                      <Td>68.9%</Td>
                      <Td>32hrs</Td>
                    </Tr>
                    <Tr>
                      <Td>HHVBF</Td>
                      <Td>2.5W</Td>
                      <Td>3.3W</Td>
                      <Td>74.2%</Td>
                      <Td>37hrs</Td>
                    </Tr>
                  </tbody>
                </Table>
              </Section>

              <Section>
                <SectionTitle>Energy Optimization Insights</SectionTitle>
                <EventList>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Sleep Cycle Optimization</EventTitle>
                      <EventDetails>12% energy savings from optimized sleep cycles</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Transmission Power Reduction</EventTitle>
                      <EventDetails>8% reduction in transmission energy</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Processing Efficiency</EventTitle>
                      <EventDetails>15% improvement in processing efficiency</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Battery Improvement</EventTitle>
                      <EventDetails>5hr increase in estimated battery lifetime</EventDetails>
                    </EventContent>
                  </EventItem>
                </EventList>
              </Section>
            </TwoColumnGrid>
          </Section>
        );
      case 'performance':
        return (
          <Section>
            <SectionTitle>Performance Trends Analysis</SectionTitle>
            <Grid>
              <StatCard>
                <StatLabel>Average Response Time</StatLabel>
                <StatValue>156ms</StatValue>
                <StatChange positive>12ms improvement</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Throughput</StatLabel>
                <StatValue>892 kb/s</StatValue>
                <StatChange positive>+45 kb/s</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Packet Loss Rate</StatLabel>
                <StatValue>0.8%</StatValue>
                <StatChange positive>-0.3%</StatChange>
              </StatCard>

              <StatCard>
                <StatLabel>Network Coverage</StatLabel>
                <StatValue>94.5%</StatValue>
                <StatChange positive>+2.1%</StatChange>
              </StatCard>
            </Grid>

            <ChartContainer>
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  datasets: [
                    {
                      label: 'Response Time (ms)',
                      data: [180, 175, 170, 165, 156, 152, 150, 148, 145],
                      borderColor: 'rgba(0, 255, 0, 1)',
                      backgroundColor: 'rgba(0, 255, 0, 0.2)',
                      tension: 0.4,
                      fill: true
                    },
                    {
                      label: 'Throughput (kb/s)',
                      data: [750, 780, 800, 830, 850, 865, 875, 885, 892],
                      borderColor: 'rgba(0, 200, 0, 1)',
                      backgroundColor: 'rgba(0, 200, 0, 0.2)',
                      tension: 0.4,
                      fill: true,
                      yAxisID: 'y1'
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        usePointStyle: true,
                        boxWidth: 8,
                        font: { size: 12 }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Network Performance Metrics Over Time',
                      color: '#00ff00',
                      font: {
                        size: 16,
                        weight: 'normal'
                      },
                      padding: { bottom: 20 }
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
                      },
                      title: {
                        display: true,
                        text: 'Response Time (ms)',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }
                    },
                    y1: {
                      position: 'right',
                      grid: {
                        drawOnChartArea: false
                      },
                      ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                      },
                      title: {
                        display: true,
                        text: 'Throughput (kb/s)',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }
                    }
                  }
                }}
              />
            </ChartContainer>

            <TwoColumnGrid>
              <Section>
                <SectionTitle>Performance Metrics Table</SectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Metric</Th>
                      <Th>Current</Th>
                      <Th>Previous</Th>
                      <Th>Change</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <Tr>
                      <Td>Response Time</Td>
                      <Td>156ms</Td>
                      <Td>168ms</Td>
                      <Td>-12ms</Td>
                      <Td style={{ color: '#00ff00' }}>Improved</Td>
                    </Tr>
                    <Tr>
                      <Td>Throughput</Td>
                      <Td>892 kb/s</Td>
                      <Td>847 kb/s</Td>
                      <Td>+45 kb/s</Td>
                      <Td style={{ color: '#00ff00' }}>Improved</Td>
                    </Tr>
                    <Tr>
                      <Td>Packet Loss</Td>
                      <Td>0.8%</Td>
                      <Td>1.1%</Td>
                      <Td>-0.3%</Td>
                      <Td style={{ color: '#00ff00' }}>Improved</Td>
                    </Tr>
                    <Tr>
                      <Td>Coverage</Td>
                      <Td>94.5%</Td>
                      <Td>92.4%</Td>
                      <Td>+2.1%</Td>
                      <Td style={{ color: '#00ff00' }}>Improved</Td>
                    </Tr>
                  </tbody>
                </Table>
              </Section>

              <Section>
                <SectionTitle>Performance Insights</SectionTitle>
                <EventList>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Response Time Optimization</EventTitle>
                      <EventDetails>12ms improvement in average response time</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Throughput Enhancement</EventTitle>
                      <EventDetails>5.3% increase in network throughput</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Packet Loss Reduction</EventTitle>
                      <EventDetails>27% reduction in packet loss rate</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Coverage Expansion</EventTitle>
                      <EventDetails>Network coverage improved by 2.1%</EventDetails>
                    </EventContent>
                  </EventItem>
                </EventList>
              </Section>
            </TwoColumnGrid>
          </Section>
        );
      case 'protocols':
        return (
          <>
            <Section>
              <SectionTitle>Protocol Performance Comparison</SectionTitle>
              <Grid>
                <StatCard>
                  <StatLabel>Best Delivery Ratio</StatLabel>
                  <StatValue>OLSR</StatValue>
                  <StatChange positive>95.8% success rate</StatChange>
                </StatCard>

                <StatCard>
                  <StatLabel>Most Energy Efficient</StatLabel>
                  <StatValue>EEDBR</StatValue>
                  <StatChange positive>78.3% efficiency</StatChange>
                </StatCard>

                <StatCard>
                  <StatLabel>Lowest Latency</StatLabel>
                  <StatValue>VBF</StatValue>
                  <StatChange positive>156ms avg.</StatChange>
                </StatCard>

                <StatCard>
                  <StatLabel>Best Overall</StatLabel>
                  <StatValue>EEDBR</StatValue>
                  <StatChange positive>89.5% composite</StatChange>
                </StatCard>
              </Grid>

              <ChartContainer>
                <Bar
                  data={{
                    labels: ['VBF', 'DBR', 'EEDBR', 'OLSR', 'HHVBF'],
                    datasets: [
                      {
                        label: 'Delivery Ratio (%)',
                        data: [93.2, 91.7, 89.5, 95.8, 92.1],
                        backgroundColor: 'rgba(0, 255, 0, 0.7)',
                        borderColor: 'rgba(0, 255, 0, 1)',
                        borderWidth: 1
                      },
                      {
                        label: 'Energy Efficiency (%)',
                        data: [75.1, 72.4, 78.3, 68.9, 74.2],
                        backgroundColor: 'rgba(0, 200, 0, 0.7)',
                        borderColor: 'rgba(0, 200, 0, 1)',
                        borderWidth: 1
                      },
                      {
                        label: 'Network Lifetime (hrs)',
                        data: [4.1, 3.9, 4.2, 3.7, 4.0],
                        backgroundColor: 'rgba(100, 255, 100, 0.7)',
                        borderColor: 'rgba(100, 255, 100, 1)',
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          usePointStyle: true,
                          boxWidth: 8,
                          font: { size: 12 }
                        }
                      },
                      title: {
                        display: true,
                        text: 'Protocol Performance Metrics Comparison',
                        color: '#00ff00',
                        font: {
                          size: 16,
                          weight: 'normal'
                        },
                        padding: { bottom: 20 }
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
                  }}
                />
              </ChartContainer>
            </Section>

            <TwoColumnGrid>
              <Section>
                <SectionTitle>Protocol Analysis</SectionTitle>
                <Table>
                  <thead>
                    <tr>
                      <Th>Protocol</Th>
                      <Th>Avg. Delivery Rate</Th>
                      <Th>Energy Usage</Th>
                      <Th>Latency</Th>
                      <Th>Scalability</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <Tr>
                      <Td>VBF</Td>
                      <Td>93.2%</Td>
                      <Td>Medium</Td>
                      <Td>156ms</Td>
                      <Td>High</Td>
                    </Tr>
                    <Tr>
                      <Td>DBR</Td>
                      <Td>91.7%</Td>
                      <Td>Medium-High</Td>
                      <Td>187ms</Td>
                      <Td>Medium</Td>
                    </Tr>
                    <Tr>
                      <Td>EEDBR</Td>
                      <Td>89.5%</Td>
                      <Td>Low</Td>
                      <Td>205ms</Td>
                      <Td>High</Td>
                    </Tr>
                    <Tr>
                      <Td>OLSR</Td>
                      <Td>95.8%</Td>
                      <Td>High</Td>
                      <Td>143ms</Td>
                      <Td>Medium</Td>
                    </Tr>
                    <Tr>
                      <Td>HHVBF</Td>
                      <Td>92.1%</Td>
                      <Td>Medium</Td>
                      <Td>170ms</Td>
                      <Td>High</Td>
                    </Tr>
                  </tbody>
                </Table>
              </Section>

              <Section>
                <SectionTitle>Key Findings</SectionTitle>
                <EventList>
                  <EventItem>
                    <EventContent>
                      <EventTitle>OLSR Performance</EventTitle>
                      <EventDetails>Highest delivery rate but energy intensive</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>EEDBR Efficiency</EventTitle>
                      <EventDetails>Best energy efficiency with good delivery rate</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>VBF Balance</EventTitle>
                      <EventDetails>Good balance of performance metrics</EventDetails>
                    </EventContent>
                  </EventItem>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Protocol Selection</EventTitle>
                      <EventDetails>Choose based on priority: energy vs. speed</EventDetails>
                    </EventContent>
                  </EventItem>
                </EventList>
              </Section>
            </TwoColumnGrid>
          </>
        );
      case 'overview':
      default:
        return (
          <>
            <Section>
              <SectionTitle>Network Performance Summary</SectionTitle>

              <Grid>
                <StatCard>
                  <StatLabel>Average Delivery Ratio</StatLabel>
                  <StatValue>92.6%</StatValue>
                  <StatChange positive>2.3% vs. previous</StatChange>
                </StatCard>

                <StatCard>
                  <StatLabel>Network Lifetime</StatLabel>
                  <StatValue>4.2 hrs</StatValue>
                  <StatChange positive>0.5 hrs vs. previous</StatChange>
                </StatCard>

                <StatCard>
                  <StatLabel>Energy Efficiency</StatLabel>
                  <StatValue>78.3%</StatValue>
                  <StatChange positive>4.1% vs. previous</StatChange>
                </StatCard>

                <StatCard>
                  <StatLabel>Successful Packet Ratio</StatLabel>
                  <StatValue>5692</StatValue>
                  <StatChange positive>321 vs. previous</StatChange>
                </StatCard>
              </Grid>

              <ChartContainer>
                <Line
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    datasets: [
                      {
                        label: 'Delivery Ratio (%)',
                        data: [87, 89, 90, 91, 92.6, 92.8, 93.1, 93.5, 93.7],
                        borderColor: 'rgba(0, 255, 0, 1)',
                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                        tension: 0.4,
                        fill: true
                      },
                      {
                        label: 'Energy Efficiency (%)',
                        data: [72, 73, 74, 76, 78.3, 79.1, 79.8, 80.2, 80.5],
                        borderColor: 'rgba(0, 200, 0, 1)',
                        backgroundColor: 'rgba(0, 200, 0, 0.2)',
                        tension: 0.4,
                        fill: true
                      },
                      {
                        label: 'Network Lifetime (hrs)',
                        data: [3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.3, 4.4, 4.5],
                        borderColor: 'rgba(100, 255, 100, 1)',
                        backgroundColor: 'rgba(100, 255, 100, 0.2)',
                        tension: 0.4,
                        yAxisID: 'y1'
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          usePointStyle: true,
                          boxWidth: 8,
                          font: {
                            size: 12
                          }
                        }
                      },
                      title: {
                        display: true,
                        text: 'Network Performance Trends Chart',
                        color: '#00ff00',
                        font: {
                          size: 16,
                          weight: 'normal'
                        },
                        padding: {
                          bottom: 20
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#00ff00',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: '#00ff00',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true,
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
                        },
                        title: {
                          display: true,
                          text: 'Percentage (%)',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      },
                      y1: {
                        position: 'right',
                        grid: {
                          drawOnChartArea: false,
                        },
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        },
                        title: {
                          display: true,
                          text: 'Hours',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      }
                    }
                  }}
                />
              </ChartContainer>
            </Section>

            <TwoColumnGrid>
              <Section>
                <SectionTitle>Recent Simulation Results</SectionTitle>

                <Table>
                  <thead>
                    <tr>
                      <Th>Simulation ID</Th>
                      <Th>Protocol</Th>
                      <Th>Node Count</Th>
                      <Th>Duration</Th>
                      <Th>Delivery Rate</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <Tr>
                      <Td>SIM-20230712-01</Td>
                      <Td>VBF</Td>
                      <Td>24</Td>
                      <Td>02:45:12</Td>
                      <Td>93.2%</Td>
                    </Tr>
                    <Tr>
                      <Td>SIM-20230711-05</Td>
                      <Td>EEDBR</Td>
                      <Td>36</Td>
                      <Td>04:12:34</Td>
                      <Td>89.5%</Td>
                    </Tr>
                    <Tr>
                      <Td>SIM-20230710-03</Td>
                      <Td>OLSR</Td>
                      <Td>18</Td>
                      <Td>01:56:41</Td>
                      <Td>95.8%</Td>
                    </Tr>
                    <Tr>
                      <Td>SIM-20230710-02</Td>
                      <Td>DBR</Td>
                      <Td>30</Td>
                      <Td>03:22:18</Td>
                      <Td>91.7%</Td>
                    </Tr>
                    <Tr>
                      <Td>SIM-20230709-04</Td>
                      <Td>HHVBF</Td>
                      <Td>24</Td>
                      <Td>02:48:37</Td>
                      <Td>92.1%</Td>
                    </Tr>
                  </tbody>
                </Table>
              </Section>

              <Section>
                <SectionTitle>Latest Events</SectionTitle>

                <EventList>
                  <EventItem>
                    <EventContent>
                      <EventTitle>Network Simulation Completed</EventTitle>
                      <EventDetails>VBF Protocol, 24 nodes</EventDetails>
                    </EventContent>
                    <EventTime>2 hours ago</EventTime>
                  </EventItem>

                  <EventItem>
                    <EventContent>
                      <EventTitle>Energy Threshold Alert</EventTitle>
                      <EventDetails>Multiple nodes below 20% energy</EventDetails>
                    </EventContent>
                    <EventTime>5 hours ago</EventTime>
                  </EventItem>

                  <EventItem>
                    <EventContent>
                      <EventTitle>Report Generated</EventTitle>
                      <EventDetails>Simulation results exported to CSV</EventDetails>
                    </EventContent>
                    <EventTime>1 day ago</EventTime>
                  </EventItem>

                  <EventItem>
                    <EventContent>
                      <EventTitle>New Protocol Added</EventTitle>
                      <EventDetails>EEDBR protocol configured</EventDetails>
                    </EventContent>
                    <EventTime>2 days ago</EventTime>
                  </EventItem>

                  <EventItem>
                    <EventContent>
                      <EventTitle>Network Optimization Completed</EventTitle>
                      <EventDetails>Node placement optimized</EventDetails>
                    </EventContent>
                    <EventTime>3 days ago</EventTime>
                  </EventItem>
                </EventList>
              </Section>
            </TwoColumnGrid>
          </>
        );
    }
  };

  return (
    <Container>
      <Title>Analytics Dashboard</Title>

      <ControlBar>
        <Controls>
          <Button primary>
            <FiFilter />
            Filter Data
          </Button>
          <Button>
            <FiDownload />
            Export Report
          </Button>
          <Button>
            <FiRefreshCw />
            Refresh
          </Button>
        </Controls>

        <TimeRange>
          <FiCalendar /> Last 10 simulations
        </TimeRange>
      </ControlBar>

      <TabContainer>
        <Tab active={activeTab === 'overview'} onClick={() => handleTabChange('overview')}>Overview</Tab>
        <Tab active={activeTab === 'energy'} onClick={() => handleTabChange('energy')}>Energy Analysis</Tab>
        <Tab active={activeTab === 'performance'} onClick={() => handleTabChange('performance')}>Performance Trends</Tab>
        <Tab active={activeTab === 'protocols'} onClick={() => handleTabChange('protocols')}>Protocol Comparison</Tab>
        <Tab active={activeTab === 'energyReports'} onClick={() => handleTabChange('energyReports')}>Energy Reports</Tab>
      </TabContainer>

      {renderContent()}
    </Container>
  );
}

export default Analytics; 