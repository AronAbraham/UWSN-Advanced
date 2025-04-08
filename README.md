# Underwater Wireless Sensor Network (UWSN) Simulator

## Overview
A high-fidelity visualization and simulation platform for underwater wireless sensor networks, built upon NS-3 simulation framework. This tool enables researchers and engineers to analyze the performance of various underwater routing protocols in realistic marine environments.

## Technical Specifications

### Network Parameters
- **Node Deployment**: 3D underwater space with configurable depth ranges
- **Network Scale**: Support for up to 500 sensor nodes
- **Sink Nodes**: Configurable surface-level sink node deployment
- **Transmission Range**: Adjustable based on underwater acoustic propagation models
- **Energy Model**: Based on UWSN energy consumption patterns with initial energy of 50 Joules

### Routing Protocols
1. **Vector-Based Forwarding (VBF)**
   - Vector-based geometric routing
   - Pipeline radius parameter: 0-100m
   - Forwarding angle: 0-360°
   - Energy threshold configurable

2. **Hop-by-Hop Vector-Based Forwarding (HH-VBF)**
   - Dynamic per-hop vector calculation
   - Adaptive pipeline radius
   - Enhanced void handling capabilities

3. **Depth-Based Routing (DBR)**
   - Pressure sensor-based forwarding
   - Depth threshold: 0-100m
   - Holding time calculation based on depth difference

4. **Energy-Efficient DBR (EEDBR)**
   - Residual energy consideration
   - Layered forwarding mechanism
   - Energy balancing algorithms

5. **Optimized Link State Routing (OLSR)**
   - Multipoint relay selection
   - Topology control messages
   - Route optimization for underwater environments

### Performance Metrics
- **Energy Efficiency**
  - Average energy consumption (Joules)
  - Network lifetime estimation
  - Energy distribution analysis
  - Residual energy tracking

- **Network Performance**
  - End-to-end delay (ms)
  - Packet delivery ratio (%)
  - Network throughput (bps)
  - Control overhead analysis

- **Quality of Service**
  - Path optimization
  - Load balancing metrics
  - Network reliability assessment
  - Coverage analysis

## Implementation Details

### Core Components
```javascript
// Main simulation parameters
const simulationParameters = {
  simDuration: 100,    // seconds
  nodeCount: 150,      // sensor nodes
  sinkCount: 1,        // sink nodes
  mobilitySpeed: 1,    // m/s
  dataRate: 100,       // bps
  packetSize: 64,      // bytes
  transmissionRange: 100, // meters
  maxDepth: 500        // meters
};
```

### Underwater Channel Model
- Acoustic propagation model
- Multipath fading effects
- Doppler spread consideration
- Ambient noise modeling

### Mobility Model
- 3D random walk
- Current-based mobility
- Configurable node speed
- Depth constraints

## Research Applications

### 1. Protocol Analysis
- Comparative performance evaluation
- Energy efficiency studies
- Scalability assessment
- Reliability analysis

### 2. Network Optimization
- Parameter tuning
- Deployment strategy evaluation
- Coverage optimization
- Energy consumption minimization

### 3. Environmental Monitoring
- Ocean data collection simulation
- Sensor placement optimization
- Event detection scenarios
- Real-time monitoring capabilities

## Installation and Setup

### Prerequisites
- Node.js (v14.0.0 or higher)
- React (v17.0.0 or higher)
- Three.js for 3D visualization
- WebGL-compatible browser

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/AronAbraham/UWSN-Advanced.git
   ```

2. Install dependencies:
   ```bash
   cd uwsn-simulator
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the simulator at `http://localhost:3000`

## Usage Guidelines

### Simulation Configuration
1. Set network parameters
2. Select routing protocol
3. Configure environmental conditions
4. Define mobility patterns
5. Specify energy constraints

### Data Collection
- Real-time performance metrics
- CSV export functionality
- Statistical analysis tools
- Visualization options

### Visualization Features
- 3D network topology
- Packet transmission paths
- Energy distribution maps
- Node mobility patterns

## References

1. Akyildiz, I. F., Pompili, D., & Melodia, T. (2005). Underwater acoustic sensor networks: Research challenges. Ad hoc networks, 3(3), 257-279.

2. Xie, P., Cui, J. H., & Lao, L. (2006). VBF: Vector-Based Forwarding Protocol for Underwater Sensor Networks. Networking, 1216-1221.

3. Yan, H., Shi, Z. J., & Cui, J. H. (2008). DBR: Depth-Based Routing for Underwater Sensor Networks. Networking, 72-86.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
