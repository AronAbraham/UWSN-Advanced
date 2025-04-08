import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SimulationModel } from './SimulationModel';

const SimulationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  color: #00ff00;
  margin-bottom: 24px;
  text-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  animation: glow 3s ease-in-out infinite;
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

const Legend = styled.div`
  display: flex;
  gap: 28px;
  margin-bottom: 20px;
  background-color: rgba(25, 25, 25, 0.6);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 50, 50, 0.5);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
`;

const LegendDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${props => props.color};
  box-shadow: 0 0 8px ${props => props.color};
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  background-color: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 50, 50, 0.5);
  animation: slide-in 0.5s ease;
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 0, 0.1);
    transition: all 0.3s ease;
  }
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const ControlGroup = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  
  &:hover ${Label} {
    color: #00ff00;
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
`;

const Input = styled.input`
  width: 70px;
  padding: 8px 12px;
  border: 1px solid rgba(51, 51, 51, 0.8);
  border-radius: 6px;
  background-color: rgba(30, 30, 30, 0.6);
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #00ff00;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 255, 0, 0.15);
    transform: scale(1.05);
  }
  
  &:hover {
    background-color: rgba(40, 40, 40, 0.6);
    border-color: rgba(0, 255, 0, 0.3);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  min-width: 120px;
  border: 1px solid rgba(51, 51, 51, 0.8);
  border-radius: 6px;
  background-color: rgba(30, 30, 30, 0.6);
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ff00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
  
  &:focus {
    border-color: #00ff00;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 255, 0, 0.15);
    transform: scale(1.02);
  }
  
  &:hover {
    background-color: rgba(40, 40, 40, 0.6);
    border-color: rgba(0, 255, 0, 0.3);
  }
  
  option {
    background-color: #1a1a1a;
    padding: 8px;
  }
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: #00ff00;
  border: 1px solid #00ff00;
  border-radius: 6px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(225deg, rgba(0, 255, 0, 0) 0%, rgba(0, 255, 0, 0.1) 50%, rgba(0, 255, 0, 0) 100%);
    z-index: 1;
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    background-color: rgba(0, 255, 0, 0.15);
    color: #00ff00;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
    transform: translateY(-2px);
    
    &::after {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const SimulationView = styled.div`
  height: 400px;
  background-color: #b3daff;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
`;

const ViewControls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  gap: 10px;
`;

const ViewButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: #00ff00;
  border: 1px solid rgba(0, 255, 0, 0.4);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  transform: translateY(0);
  
  &:hover {
    background-color: rgba(0, 255, 0, 0.15);
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    transform: translateY(-2px) scale(1.05);
  }
  
  &.active {
    background-color: rgba(0, 255, 0, 0.2);
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 30%;
      height: 2px;
      background: #00ff00;
      border-radius: 2px;
      animation: pulse 2s infinite;
    }
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
`;

const StatsCard = styled.div`
  background-color: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 50, 50, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(20px);
  animation: statsCardAppear 0.6s forwards;
  animation-delay: var(--delay, 0.1s);
  
  @keyframes statsCardAppear {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(0, 255, 0, 0.3);
  }
  
  &:nth-child(2) {
    --delay: 0.3s;
  }
`;

const StatsTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: #00ff00;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #00ff00;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0 0 8px #00ff00;
    animation: pulse 2s infinite;
  }
`;

const StatItem = styled.div`
  margin-bottom: 12px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0, 255, 0, 0.05);
    padding-left: 8px;
    border-radius: 4px;
  }
  
  span:last-child {
    font-weight: 500;
    color: rgba(0, 255, 0, 0.9);
  }
`;

const SpeedSlider = styled.input`
  width: 130px;
  accent-color: #00ff00;
  height: 6px;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  margin-top: 8px;
  position: relative;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
  
  &::-webkit-slider-thumb {
    background: #00ff00;
    cursor: pointer;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }
  
  &:hover::-webkit-slider-thumb {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
    transform: scale(1.2);
  }
  
  &::-moz-range-thumb {
    background: #00ff00;
    cursor: pointer;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
    transition: all 0.3s ease;
  }
  
  &:hover::-moz-range-thumb {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
    transform: scale(1.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    width: var(--value-percent, 0%);
    background: linear-gradient(to right, #008800, #00ff00);
    border-radius: 2px;
    z-index: 1;
    pointer-events: none;
  }
`;

const ExportButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0.5);
  
  &:disabled {
    background-color: rgba(30, 30, 30, 0.5);
    color: rgba(102, 102, 102, 0.8);
    border-color: rgba(102, 102, 102, 0.5);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const ProtocolDescription = styled.div`
  background-color: rgba(25, 25, 25, 0.7);
  backdrop-filter: blur(10px);
  padding: 20px 24px;
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 1.6;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 50, 50, 0.5);
  color: rgba(255, 255, 255, 0.85);
  position: relative;
  overflow: hidden;
  animation: slide-in 0.4s ease;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 0, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0) 70%);
    border-radius: 50%;
    top: -50px;
    right: -50px;
    opacity: 0.5;
    animation: pulse 4s infinite;
  }
  
  &::after {
    content: '"';
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 36px;
    color: rgba(0, 255, 0, 0.2);
    font-family: Georgia, serif;
  }
`;

const SimulationCanvas = styled.div`
  width: 100%;
  height: 600px;
  background-color: #001e2f;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  animation: canvasAppear 0.8s ease-out forwards;
  opacity: 0;
  transform: scale(0.98);
  
  @keyframes canvasAppear {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
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

const BatteryIndicator = styled.div`
  width: 100%;
  height: 20px;
  background-color: rgba(30, 30, 30, 0.6);
  border-radius: 10px;
  margin: 15px 0;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => Math.max(0, Math.min(100, (1 - props.used / props.capacity) * 100))}%;
    background: linear-gradient(90deg, #00ff00, #88ff88);
    border-radius: 8px;
    transition: width 0.5s ease;
  }
  
  &::after {
    content: '${props => Math.round((1 - props.used / props.capacity) * 100)}%';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  }
`;

// Add a styled component for the battery depleted notification
const BatteryDepletedMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #e74c3c;
  padding: 20px 30px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  z-index: 100;
  border: 1px solid #e74c3c;
  box-shadow: 0 0 30px rgba(231, 76, 60, 0.5);
  animation: batteryDepleted 0.3s ease-in forwards;
  
  @keyframes batteryDepleted {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  
  span {
    display: block;
    font-size: 14px;
    opacity: 0.8;
    margin-top: 10px;
    font-weight: normal;
  }
`;

function Simulation() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [nodes, setNodes] = useState(5);
  const [routingProtocol, setRoutingProtocol] = useState('HHVBF');
  const [packetSize, setPacketSize] = useState(64);
  const [speed, setSpeed] = useState(50);
  const [viewMode, setViewMode] = useState('3D');
  const [currentWaterCurrent, setCurrentWaterCurrent] = useState({ x: 0, y: 0, z: 0 });

  // Statistics
  const [packetsSent, setPacketsSent] = useState(0);
  const [packetsReceived, setPacketsReceived] = useState(0);
  const [energyAvg, setEnergyAvg] = useState(0);
  const [energyMax, setEnergyMax] = useState(0);
  const [networkLifetime, setNetworkLifetime] = useState(0);

  // Store energy readings for CSV export
  const [energyReadings, setEnergyReadings] = useState([]);

  // Protocol descriptions
  const protocolDescriptions = {
    VBF: "Vector-Based Forwarding (VBF) protocol creates a virtual 'routing pipe' from source to sink. Only nodes within this pipe participate in forwarding, reducing energy consumption.",
    HHVBF: "Hop-by-Hop Vector-Based Forwarding (HHVBF) improves on VBF by defining multiple routing vectors on a hop-by-hop basis, adapting to sparse deployments better.",
    DBR: "Depth-Based Routing (DBR) protocol uses depth information for forwarding decisions, eliminating the need for full location coordinates. Packets travel from deeper to shallower nodes.",
    EEDBR: "Energy-Efficient Depth-Based Routing (EEDBR) enhances DBR by considering residual energy of sensor nodes, balancing energy consumption across the network.",
    OLSR: "Optimized Link State Routing (OLSR) is a proactive protocol that maintains routes to all destinations. It uses Multipoint Relays (MPRs) to reduce overhead in the flooding process, optimizing for underwater networks with high mobility."
  };

  // Add refs
  const sliderRef = useRef(null);
  const controlsRef = useRef(null);

  // Add state for battery depleted message
  const [batteryDepleted, setBatteryDepleted] = useState(false);
  const MAX_BATTERY_CAPACITY = 50; // in Joules, maximum energy capacity

  // Function to create ripple effect on buttons
  const createRipple = (event) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.querySelector(".ripple");
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  // Update slider fill on value change
  useEffect(() => {
    if (sliderRef.current) {
      const percent = (speed / 100) * 100;
      sliderRef.current.style.setProperty('--value-percent', `${percent}%`);
    }
  }, [speed]);

  // Add animation classes to elements when component mounts
  useEffect(() => {
    const controls = document.querySelectorAll('.control-item');
    controls.forEach((control, index) => {
      setTimeout(() => {
        control.classList.add('animate-in');
      }, 100 * index);
    });
  }, []);

  const startSimulation = () => {
    setIsSimulating(true);
    setProgress(0);
    setPacketsSent(0);
    setPacketsReceived(0);
    setEnergyAvg(0);
    setEnergyMax(0);
    setNetworkLifetime(0);
    setEnergyReadings([{
      timestamp: "0.0",
      avgEnergy: "0.00",
      maxEnergy: "0.00",
      nodeCount: nodes,
      protocol: routingProtocol,
      packetSize: packetSize,
      speed: speed,
      packetsSent: 0,
      packetsReceived: 0,
      deliveryRatio: 0,
      remainingBattery: 100
    }]);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setProgress(0);
    setPacketsSent(0);
    setPacketsReceived(0);
    setEnergyAvg(0);
    setEnergyMax(0);
    setNetworkLifetime(0);
    setEnergyReadings([]);
    setBatteryDepleted(false);
  };

  const exportCSV = () => {
    if (energyReadings.length === 0) return;

    // Create CSV content with more comprehensive data
    const headers = [
      'Timestamp(s)',
      'AvgEnergy(J)',
      'MaxEnergy(J)',
      'NodeCount',
      'Protocol',
      'PacketSize(bytes)',
      'SimSpeed',
      'PacketsSent',
      'PacketsReceived',
      'DeliveryRatio(%)',
      'RemainingBattery(%)'
    ];

    // Add simulation metadata at the top
    const metadata = [
      `# UWSN Simulation Results`,
      `# Date: ${new Date().toLocaleString()}`,
      `# Protocol: ${routingProtocol}`,
      `# Node Count: ${nodes}`,
      `# Packet Size: ${packetSize} bytes`,
      `# Simulation Duration: ${networkLifetime.toFixed(1)} seconds`,
      `# Battery Capacity: ${MAX_BATTERY_CAPACITY} J`,
      `#`,
      ''
    ];

    const csvContent = [
      ...metadata,
      headers.join(','),
      ...energyReadings.map(reading => {
        return [
          reading.timestamp,
          reading.avgEnergy,
          reading.maxEnergy,
          reading.nodeCount,
          reading.protocol,
          reading.packetSize,
          reading.speed,
          reading.packetsSent,
          reading.packetsReceived,
          reading.deliveryRatio,
          reading.remainingBattery
        ].join(',');
      })
    ].join('\n');

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `uwsn_simulation_${routingProtocol}_${nodes}nodes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulate water currents changing over time
  useEffect(() => {
    if (isSimulating) {
      const currentInterval = setInterval(() => {
        // Generate mild random currents that change gradually
        setCurrentWaterCurrent({
          x: Math.sin(Date.now() / 10000) * 0.5,
          y: Math.cos(Date.now() / 12000) * 0.3,
          z: Math.sin(Date.now() / 15000) * 0.2
        });
      }, 1000);

      return () => clearInterval(currentInterval);
    }
  }, [isSimulating]);

  // Update the effect to set battery depleted state
  useEffect(() => {
    let interval;

    if (isSimulating) {
      let elapsedTime = 0;

      interval = setInterval(() => {
        // Calculate time increment based on speed (1-100)
        // Higher speed means faster time increment
        const timeIncrement = 0.2 * (speed / 50);
        elapsedTime += timeIncrement;

        // Instead of using progress to stop simulation, we'll use energy levels
        setProgress(elapsedTime % 100); // Just for visual feedback, loops every 100

        // Simulate packets being sent and received based on protocol efficiency
        const protocolEfficiency = {
          VBF: 0.65,  // Basic efficiency
          HHVBF: 0.75, // Better than VBF
          DBR: 0.70,   // Good for depth-based
          EEDBR: 0.80, // Best energy efficiency
          OLSR: 0.72   // Good for mobility but moderate overhead
        };

        const efficiency = protocolEfficiency[routingProtocol] || 0.65;

        // Packets sent increases with speed
        const sentIncrement = Math.floor(Math.random() * 3 + 1) * (speed / 50);
        setPacketsSent(prev => prev + sentIncrement);
        setPacketsReceived(prev => prev + Math.floor(sentIncrement * efficiency * (0.9 + Math.random() * 0.2)));

        // Simulate energy consumption based on protocol
        const energyEfficiency = {
          VBF: 1.0,   // Base energy consumption
          HHVBF: 0.85, // 15% more efficient than VBF
          DBR: 0.90,   // 10% more efficient than VBF
          EEDBR: 0.75, // 25% more efficient than VBF (best energy efficiency)
          OLSR: 1.1    // 10% less efficient than VBF due to control overhead
        };

        const energyFactor = energyEfficiency[routingProtocol] || 1.0;

        // Energy consumption increases with higher speed and more nodes
        // Baseline consumption + randomness + speed factor + node factor
        const baseConsumption = 0.05 * timeIncrement;
        const randomVariation = Math.random() * 0.03 * timeIncrement;
        const speedFactor = (speed / 50) * 0.05 * timeIncrement;
        const nodeFactor = (nodes / 10) * 0.02 * timeIncrement;

        const energyIncrease = (baseConsumption + randomVariation + speedFactor + nodeFactor) * energyFactor;
        const newAvgEnergy = energyAvg + energyIncrease;
        const newMaxEnergy = energyMax + (energyIncrease * 1.5);

        // Stop simulation if max energy exceeds capacity
        if (newMaxEnergy >= MAX_BATTERY_CAPACITY) {
          setIsSimulating(false);
          setBatteryDepleted(true);
          clearInterval(interval);
        } else {
          setEnergyAvg(newAvgEnergy);
          setEnergyMax(newMaxEnergy);
          setNetworkLifetime(elapsedTime);

          // Record energy reading for CSV export with more comprehensive data
          setEnergyReadings(prev => [
            ...prev,
            {
              timestamp: elapsedTime.toFixed(1),
              avgEnergy: newAvgEnergy.toFixed(2),
              maxEnergy: newMaxEnergy.toFixed(2),
              nodeCount: nodes,
              protocol: routingProtocol,
              packetSize: packetSize,
              speed: speed,
              packetsSent: packetsSent,
              packetsReceived: packetsReceived,
              deliveryRatio: packetsSent > 0 ? Math.round((packetsReceived / packetsSent) * 100) : 0,
              remainingBattery: Math.max(0, Math.round((1 - newMaxEnergy / MAX_BATTERY_CAPACITY) * 100))
            }
          ]);
        }
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isSimulating, routingProtocol, nodes, energyAvg, energyMax, speed, MAX_BATTERY_CAPACITY, packetSize, packetsSent, packetsReceived]);

  return (
    <SimulationContainer>
      <Title>Underwater Wireless Sensor Network Simulation</Title>

      <ProtocolDescription>
        {protocolDescriptions[routingProtocol]}
      </ProtocolDescription>

      <Controls ref={controlsRef}>
        <ControlGroup className="control-item">
          <Label>Number of Nodes</Label>
          <Input
            type="number"
            value={nodes}
            onChange={e => setNodes(parseInt(e.target.value) || 1)}
            min="1"
            max="150"
          />
        </ControlGroup>

        <ControlGroup className="control-item">
          <Label>Routing Protocol</Label>
          <Select value={routingProtocol} onChange={e => setRoutingProtocol(e.target.value)}>
            <option value="VBF">VBF</option>
            <option value="HHVBF">HHVBF</option>
            <option value="DBR">DBR</option>
            <option value="EEDBR">EEDBR</option>
            <option value="OLSR">OLSR</option>
          </Select>
        </ControlGroup>

        <ControlGroup className="control-item">
          <Label>Packet Size</Label>
          <Input
            type="number"
            value={packetSize}
            onChange={e => setPacketSize(parseInt(e.target.value) || 16)}
            min="16"
            max="1024"
          />
        </ControlGroup>

        <ControlGroup className="control-item">
          <Label>Simulation Speed</Label>
          <SpeedSlider
            ref={sliderRef}
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={e => setSpeed(parseInt(e.target.value))}
          />
        </ControlGroup>

        {!isSimulating ? (
          <Button
            className="control-item"
            onClick={(e) => {
              createRipple(e);
              startSimulation();
            }}
          >
            Start Simulation
          </Button>
        ) : (
          <Button
            className="control-item"
            onClick={(e) => {
              createRipple(e);
              resetSimulation();
            }}
            style={{ borderColor: '#ffcc00', color: '#ffcc00' }}
          >
            Stop Simulation
          </Button>
        )}

        <Button
          className="control-item"
          onClick={(e) => {
            createRipple(e);
            resetSimulation();
          }}
          style={{ borderColor: '#e74c3c', color: '#e74c3c' }}
        >
          Reset
        </Button>

        <ExportButton
          className="control-item"
          onClick={(e) => {
            createRipple(e);
            exportCSV();
          }}
          disabled={energyReadings.length === 0}
        >
          Export CSV
        </ExportButton>
      </Controls>

      <SimulationCanvas>
        <Canvas camera={{ position: [0, 0, 600], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enabled={viewMode === '3D'} />
          <SimulationModel
            isSimulating={isSimulating}
            progress={progress}
            nodeCount={nodes}
            viewMode={viewMode}
            routingProtocol={routingProtocol}
            simulationSpeed={speed}
            packetSize={packetSize}
            waterCurrent={currentWaterCurrent}
          />
        </Canvas>

        <ViewControls>
          <ViewButton
            onClick={() => setViewMode('3D')}
            className={viewMode === '3D' ? 'active' : ''}
          >
            3D View
          </ViewButton>
          <ViewButton
            onClick={() => setViewMode('2D')}
            className={viewMode === '2D' ? 'active' : ''}
          >
            Top View
          </ViewButton>
        </ViewControls>

        {batteryDepleted && (
          <BatteryDepletedMessage>
            Battery Depleted!
            <span>The network has run out of energy after {networkLifetime.toFixed(1)} seconds.</span>
          </BatteryDepletedMessage>
        )}
      </SimulationCanvas>

      <StatsContainer>
        <StatsCard>
          <StatsTitle>Network Statistics</StatsTitle>
          <StatItem>
            <span>Packets sent:</span>
            <span>{packetsSent}</span>
          </StatItem>
          <StatItem>
            <span>Packets received:</span>
            <span>{packetsReceived}</span>
          </StatItem>
          <StatItem>
            <span>Packet delivery ratio:</span>
            <span>{packetsSent > 0 ? Math.round((packetsReceived / packetsSent) * 100) : 0}%</span>
          </StatItem>
          <StatItem>
            <span>Current:</span>
            <span>X: {currentWaterCurrent.x.toFixed(2)} Y: {currentWaterCurrent.y.toFixed(2)} Z: {currentWaterCurrent.z.toFixed(2)}</span>
          </StatItem>
        </StatsCard>

        <StatsCard>
          <StatsTitle>Energy Consumption</StatsTitle>
          <StatItem>
            <span>Average energy used:</span>
            <span>{energyAvg.toFixed(1)} J</span>
          </StatItem>
          <StatItem>
            <span>Max energy used:</span>
            <span>{energyMax.toFixed(1)} J</span>
          </StatItem>
          <StatItem>
            <span>Battery Capacity:</span>
            <span>{MAX_BATTERY_CAPACITY} J</span>
          </StatItem>

          <BatteryIndicator used={energyMax} capacity={MAX_BATTERY_CAPACITY} />

          <StatItem>
            <span>Network lifetime:</span>
            <span>{networkLifetime.toFixed(1)} s</span>
          </StatItem>
        </StatsCard>
      </StatsContainer>
    </SimulationContainer>
  );
}

export default Simulation; 