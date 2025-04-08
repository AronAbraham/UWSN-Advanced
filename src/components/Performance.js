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
  Filler,
  RadialLinearScale,
  ArcElement
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';
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
  Card
} from '../styles/SharedComponents';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ArcElement
);

const TabGroup = styled(Controls)`
  margin-bottom: 24px;
`;

const ChartSection = styled.div`
  margin-bottom: 32px;
`;

// Common chart options
const getCommonChartOptions = (title) => ({
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
      display: title ? true : false,
      text: title,
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
      }
    }
  }
});

// Performance data for different charts
const performanceData = {
  labels: ['VBF', 'DBR', 'EEDBR', 'OLSR', 'HHVBF'],
  datasets: [
    {
      label: 'Energy Efficiency',
      data: [75, 70, 83, 60, 78],
      backgroundColor: 'rgba(0, 255, 0, 0.7)',
      borderColor: 'rgba(0, 255, 0, 1)',
      borderWidth: 1
    },
    {
      label: 'Delivery Ratio',
      data: [93.2, 91.7, 89.5, 95.8, 91.8],
      backgroundColor: 'rgba(100, 255, 100, 0.7)',
      borderColor: 'rgba(100, 255, 100, 1)',
      borderWidth: 1
    },
    {
      label: 'Network Lifetime',
      data: [80, 65, 75, 55, 72],
      backgroundColor: 'rgba(0, 200, 0, 0.7)',
      borderColor: 'rgba(0, 200, 0, 1)',
      borderWidth: 1
    }
  ]
};

// Latency data for line charts
const latencyData = {
  labels: ['20', '40', '60', '80', '100', '120', '140'],
  datasets: [
    {
      label: 'VBF',
      data: [110, 125, 140, 156, 172, 185, 197],
      borderColor: 'rgba(0, 255, 0, 1)',
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'DBR',
      data: [130, 152, 170, 187, 205, 218, 230],
      borderColor: 'rgba(0, 170, 0, 1)',
      backgroundColor: 'rgba(0, 170, 0, 0.2)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'OLSR',
      data: [100, 116, 130, 143, 158, 170, 185],
      borderColor: 'rgba(120, 255, 120, 1)',
      backgroundColor: 'rgba(120, 255, 120, 0.2)',
      tension: 0.4,
      fill: true
    }
  ]
};

// Throughput data
const throughputData = {
  labels: ['VBF', 'DBR', 'EEDBR', 'OLSR', 'HHVBF'],
  datasets: [
    {
      label: 'Low Density (50 nodes)',
      data: [580, 520, 540, 620, 560],
      backgroundColor: 'rgba(0, 255, 0, 0.7)',
    },
    {
      label: 'Medium Density (100 nodes)',
      data: [520, 470, 490, 580, 510],
      backgroundColor: 'rgba(0, 200, 0, 0.7)',
    },
    {
      label: 'High Density (150 nodes)',
      data: [450, 410, 430, 520, 440],
      backgroundColor: 'rgba(0, 150, 0, 0.7)',
    }
  ]
};

// Reliability data
const reliabilityData = {
  labels: ['Packet Delivery', 'Error Resilience', 'Connectivity', 'Stability', 'Recovery Speed', 'Fault Tolerance'],
  datasets: [
    {
      label: 'VBF',
      data: [93, 75, 82, 78, 70, 76],
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderColor: 'rgba(0, 255, 0, 0.8)',
      pointBackgroundColor: 'rgba(0, 255, 0, 1)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 255, 0, 1)',
      borderWidth: 2,
    },
    {
      label: 'OLSR',
      data: [95, 87, 76, 82, 84, 79],
      backgroundColor: 'rgba(100, 255, 100, 0.2)',
      borderColor: 'rgba(100, 255, 100, 0.8)',
      pointBackgroundColor: 'rgba(100, 255, 100, 1)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(100, 255, 100, 1)',
      borderWidth: 2,
    },
  ]
};

function Performance() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderCharts = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <ChartSection>
              <SectionTitle>Performance Overview</SectionTitle>
              <Text>
                Comparative analysis of key performance metrics across different routing protocols
                for underwater wireless sensor networks.
              </Text>
              <ChartContainer>
                <Bar
                  data={performanceData}
                  options={getCommonChartOptions('Key Performance Metrics Comparison')}
                />
              </ChartContainer>
            </ChartSection>

            <ChartSection>
              <SectionTitle>Network Performance Trends</SectionTitle>
              <Text>
                Time-based analysis of network performance metrics showing trends across multiple simulations.
              </Text>
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
                    ...getCommonChartOptions('Network Performance Trends Chart'),
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
            </ChartSection>

            <TwoColumnLayout>
              <Card>
                <SectionTitle>Key Findings</SectionTitle>
                <Text>
                  • OLSR demonstrates the highest packet delivery ratio but suffers from poor energy efficiency.<br />
                  • EEDBR shows the best energy efficiency, making it ideal for long-term deployments.<br />
                  • VBF offers a good balance between delivery ratio and energy consumption.<br />
                  • Protocol performance varies significantly based on network density and water conditions.
                </Text>
              </Card>

              <Card>
                <SectionTitle>Recommendations</SectionTitle>
                <Text>
                  • For dense networks with stable conditions, OLSR provides optimal delivery performance.<br />
                  • For energy-constrained deployments, EEDBR is the recommended choice.<br />
                  • For dynamic environments with water currents, HHVBF offers better stability.<br />
                  • VBF is recommended for general-purpose deployments with balanced requirements.
                </Text>
              </Card>
            </TwoColumnLayout>
          </>
        );

      case 'latency':
        return (
          <>
            <ChartSection>
              <SectionTitle>Latency Analysis</SectionTitle>
              <Text>
                End-to-end packet delivery latency as a function of network size for different routing protocols.
                Lower values indicate better performance.
              </Text>
              <ChartContainer>
                <Line
                  data={latencyData}
                  options={{
                    ...getCommonChartOptions('End-to-End Latency vs Network Size'),
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Network Size (nodes)',
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
                          text: 'Latency (ms)',
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
                  }}
                />
              </ChartContainer>
            </ChartSection>

            <ChartSection>
              <SectionTitle>Latency Factors</SectionTitle>
              <Text>
                Analysis of the contributing factors to end-to-end latency in underwater wireless sensor networks.
              </Text>
              <TwoColumnLayout>
                <Card>
                  <h3 style={{ color: '#00ff00', marginBottom: '12px' }}>Protocol Impact</h3>
                  <Text>
                    • OLSR shows the lowest latency due to proactive route maintenance.<br />
                    • DBR suffers from holding time delays at each hop.<br />
                    • All protocols show increased latency as network size grows.<br />
                    • Proactive protocols generally outperform reactive ones in terms of latency.
                  </Text>
                </Card>

                <Card>
                  <h3 style={{ color: '#00ff00', marginBottom: '12px' }}>Environmental Factors</h3>
                  <Text>
                    • Acoustic channel properties significantly impact propagation delay.<br />
                    • Water currents affect link stability and increase retransmissions.<br />
                    • Node mobility introduces route changes and discovery overhead.<br />
                    • Deep water deployment increases transmission distances and delays.
                  </Text>
                </Card>
              </TwoColumnLayout>
            </ChartSection>
          </>
        );

      case 'throughput':
        return (
          <>
            <ChartSection>
              <SectionTitle>Throughput Analysis</SectionTitle>
              <Text>
                Network throughput performance (bytes/second) across different protocols and node densities.
                Higher values indicate better performance.
              </Text>
              <ChartContainer>
                <Bar
                  data={throughputData}
                  options={{
                    ...getCommonChartOptions('Network Throughput by Protocol and Density'),
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Routing Protocol',
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
                          text: 'Throughput (bytes/sec)',
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
                  }}
                />
              </ChartContainer>
            </ChartSection>

            <ChartSection>
              <SectionTitle>Throughput Optimization</SectionTitle>
              <Text>
                Strategies for maximizing network throughput in underwater wireless sensor networks.
              </Text>
              <TwoColumnLayout>
                <Card>
                  <h3 style={{ color: '#00ff00', marginBottom: '12px' }}>Protocol Selection</h3>
                  <Text>
                    • OLSR provides the highest throughput across different network densities.<br />
                    • All protocols show decreased throughput as network density increases.<br />
                    • VBF offers consistent performance across varying densities.<br />
                    • Hybrid protocols can adapt to changing network conditions.
                  </Text>
                </Card>

                <Card>
                  <h3 style={{ color: '#00ff00', marginBottom: '12px' }}>Network Optimization</h3>
                  <Text>
                    • Strategic sink placement can significantly improve throughput.<br />
                    • Optimal packet size selection balances throughput and reliability.<br />
                    • Controlling node density prevents excessive collisions.<br />
                    • Prioritizing critical data paths enhances effective throughput.
                  </Text>
                </Card>
              </TwoColumnLayout>
            </ChartSection>
          </>
        );

      case 'reliability':
        return (
          <>
            <ChartSection>
              <SectionTitle>Reliability Analysis</SectionTitle>
              <Text>
                Multi-dimensional analysis of network reliability aspects across different protocols.
                Higher values indicate better performance.
              </Text>
              <ChartContainer>
                <Radar
                  data={reliabilityData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Protocol Reliability Metrics',
                        color: '#00ff00',
                        font: {
                          size: 16
                        },
                        padding: {
                          bottom: 20
                        }
                      },
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
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#00ff00',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: '#00ff00',
                        borderWidth: 1
                      }
                    },
                    scales: {
                      r: {
                        angleLines: {
                          color: 'rgba(255, 255, 255, 0.2)'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.2)'
                        },
                        pointLabels: {
                          color: 'rgba(255, 255, 255, 0.7)',
                          font: {
                            size: 12
                          }
                        },
                        ticks: {
                          backdropColor: 'transparent',
                          color: 'rgba(255, 255, 255, 0.7)'
                        },
                        suggestedMin: 50,
                        suggestedMax: 100
                      }
                    }
                  }}
                />
              </ChartContainer>
            </ChartSection>

            <ChartSection>
              <SectionTitle>Reliability Factors</SectionTitle>
              <Text>
                Analysis of key factors affecting reliability in underwater sensor networks.
              </Text>
              <TwoColumnLayout>
                <Card>
                  <h3 style={{ color: '#00ff00', marginBottom: '12px' }}>VBF Characteristics</h3>
                  <Text>
                    • Excellent packet delivery in structured deployments.<br />
                    • Moderate error resilience due to path redundancy.<br />
                    • Good connectivity in dense deployment areas.<br />
                    • Limited fault tolerance in sparse networks or with node failures.
                  </Text>
                </Card>

                <Card>
                  <h3 style={{ color: '#00ff00', marginBottom: '12px' }}>OLSR Characteristics</h3>
                  <Text>
                    • Superior packet delivery in most scenarios.<br />
                    • Excellent error resilience through multiple path options.<br />
                    • Rapid recovery from topology changes.<br />
                    • High control overhead but robust fault tolerance.
                  </Text>
                </Card>
              </TwoColumnLayout>
            </ChartSection>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Title>Performance Analysis</Title>

      <Section>
        <TabGroup>
          <ControlButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </ControlButton>
          <ControlButton
            active={activeTab === 'latency'}
            onClick={() => setActiveTab('latency')}
          >
            Latency Analysis
          </ControlButton>
          <ControlButton
            active={activeTab === 'throughput'}
            onClick={() => setActiveTab('throughput')}
          >
            Throughput Analysis
          </ControlButton>
          <ControlButton
            active={activeTab === 'reliability'}
            onClick={() => setActiveTab('reliability')}
          >
            Reliability Analysis
          </ControlButton>
        </TabGroup>

        {renderCharts()}
      </Section>
    </Container>
  );
}

export default Performance; 