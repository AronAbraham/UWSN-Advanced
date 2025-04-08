import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const Container = styled.div`
  padding: 20px;
  background-color: #111111;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const EnergyTitle = styled.h1`
  color: #00ff00;
  font-size: 2rem;
  margin: 0;
`;

const ChartContainer = styled.div`
  background: rgba(25, 25, 25, 0.7);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid rgba(0, 255, 0, 0.1);
  height: 400px;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const SmallChartContainer = styled(ChartContainer)`
  height: 300px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const MetricCard = styled.div`
  background: rgba(25, 25, 25, 0.7);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(0, 255, 0, 0.1);
  
  &:hover {
    border-color: #00ff00;
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
`;

const MetricValue = styled.div`
  color: #00ff00;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ProtocolSelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const ProtocolButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? 'rgba(0, 255, 0, 0.2)' : 'rgba(25, 25, 25, 0.7)'};
  border: 1px solid ${props => props.active ? '#00ff00' : 'rgba(0, 255, 0, 0.1)'};
  border-radius: 4px;
  color: ${props => props.active ? '#00ff00' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ff00;
    color: #00ff00;
  }
`;

function EnergyAnalytics() {
  const [selectedProtocol, setSelectedProtocol] = useState('VBF');
  const protocols = ['VBF', 'DBR', 'EEDBR', 'OLSR', 'HHVBF'];

  // Energy consumption over time data
  const getEnergyTimeData = () => {
    const timeLabels = Array.from({ length: 12 }, (_, i) => `${i * 5}s`);

    const datasets = protocols.map(protocol => ({
      label: protocol,
      data: Array.from({ length: 12 }, () => Math.random() * (protocol === 'EEDBR' ? 80 : 100) + 20),
      borderColor: protocol === selectedProtocol ? '#00ff00' : 'rgba(255, 255, 255, 0.2)',
      backgroundColor: protocol === selectedProtocol ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
      borderWidth: protocol === selectedProtocol ? 2 : 1,
      tension: 0.4,
      fill: protocol === selectedProtocol
    }));

    return {
      labels: timeLabels,
      datasets
    };
  };

  // Energy distribution data
  const getEnergyDistributionData = () => {
    return {
      labels: ['Transmission', 'Reception', 'Processing', 'Idle', 'Sleep'],
      datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(0, 255, 0, 0.8)',
          'rgba(0, 200, 255, 0.8)',
          'rgba(255, 255, 0, 0.8)',
          'rgba(255, 0, 255, 0.8)',
          'rgba(150, 150, 150, 0.8)'
        ],
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1
      }]
    };
  };

  // Chart options
  const timeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          usePointStyle: true
        }
      },
      title: {
        display: true,
        text: 'Energy Consumption Over Time',
        color: '#00ff00',
        font: {
          size: 16
        }
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
          text: 'Energy (J)',
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  const distributionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      title: {
        display: true,
        text: 'Energy Distribution',
        color: '#00ff00',
        font: {
          size: 16
        }
      }
    }
  };

  // Metrics data
  const metrics = [
    { label: 'Average Energy', value: '78.5 J' },
    { label: 'Peak Consumption', value: '142 J' },
    { label: 'Energy Efficiency', value: '85%' },
    { label: 'Network Lifetime', value: '48h' }
  ];

  return (
    <Container>
      <Header>
        <EnergyTitle>Energy Analysis</EnergyTitle>
      </Header>

      <ProtocolSelector>
        {protocols.map(protocol => (
          <ProtocolButton
            key={protocol}
            active={protocol === selectedProtocol}
            onClick={() => setSelectedProtocol(protocol)}
          >
            {protocol}
          </ProtocolButton>
        ))}
      </ProtocolSelector>

      <MetricsGrid>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <MetricValue>{metric.value}</MetricValue>
            <MetricLabel>{metric.label}</MetricLabel>
          </MetricCard>
        ))}
      </MetricsGrid>

      <ChartGrid>
        <ChartContainer>
          <Line data={getEnergyTimeData()} options={timeChartOptions} />
        </ChartContainer>
        <SmallChartContainer>
          <Doughnut data={getEnergyDistributionData()} options={distributionChartOptions} />
        </SmallChartContainer>
      </ChartGrid>
    </Container>
  );
}

export default EnergyAnalytics; 