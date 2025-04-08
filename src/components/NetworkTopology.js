import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Container,
  Title,
  Section,
  SectionTitle,
  Text,
  Controls,
  ControlButton,
  SliderContainer,
  SliderLabel,
  Slider,
  Grid,
  Card as InfoCard,
  CardTitle as InfoTitle,
  CardContent as InfoContent,
  fadeIn
} from '../styles/SharedComponents';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  
  canvas {
    outline: none;
  }
`;

const InfoList = styled.ul`
  margin: 0;
  padding-left: 20px;
  
  li {
    margin-bottom: 6px;
  }
`;

const StatusBar = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 4px;
  color: #00ff00;
  font-size: 0.85rem;
  border: 1px solid rgba(0, 255, 0, 0.3);
  z-index: 10;
`;

function NetworkTopology() {
  const [topology, setTopology] = useState('random');
  const [nodeCount, setNodeCount] = useState(50);
  const [sinkCount, setSinkCount] = useState(1);
  const [connectionRange, setConnectionRange] = useState(200);
  const [status, setStatus] = useState('Interactive 3D topology visualization');

  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const nodesRef = useRef([]);
  const sinksRef = useRef([]);
  const connectionsRef = useRef([]);

  // Initialize Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001a00);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 5000);
    camera.position.set(0, 500, 800);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Create water surface
    const waterGeometry = new THREE.PlaneGeometry(2000, 2000, 32, 32);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x001a00,
      transparent: true,
      opacity: 0.6,
      metalness: 0.7,
      roughness: 0.3,
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    scene.add(water);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00ff00, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a point light for sink nodes
    const sinkLight = new THREE.PointLight(0x00ff00, 0.5, 200);
    sinkLight.position.set(0, 0, 0);
    scene.add(sinkLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  // Generate network topology based on user selections
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear previous nodes and connections
    nodesRef.current.forEach(node => sceneRef.current.remove(node));
    sinksRef.current.forEach(sink => sceneRef.current.remove(sink));
    connectionsRef.current.forEach(connection => sceneRef.current.remove(connection));

    nodesRef.current = [];
    sinksRef.current = [];
    connectionsRef.current = [];

    // Create sink nodes
    for (let i = 0; i < sinkCount; i++) {
      const sinkGeometry = new THREE.CylinderGeometry(12, 12, 30, 16);
      const sinkMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5,
      });

      const sink = new THREE.Mesh(sinkGeometry, sinkMaterial);

      // Position sink based on topology
      let xPos, zPos;

      if (topology === 'grid' || topology === 'random') {
        if (sinkCount === 1) {
          xPos = 0;
          zPos = 0;
        } else {
          const angle = (i / sinkCount) * Math.PI * 2;
          const radius = 400;
          xPos = Math.cos(angle) * radius;
          zPos = Math.sin(angle) * radius;
        }
      } else if (topology === 'column') {
        xPos = 0;
        zPos = -400 + (i * (800 / (sinkCount - 1 || 1)));
      } else if (topology === 'triangle') {
        if (i === 0) {
          xPos = 0;
          zPos = -400;
        } else if (i === 1) {
          xPos = -400;
          zPos = 400;
        } else {
          xPos = 400;
          zPos = 400;
        }
      }

      sink.position.set(xPos, 30, zPos);

      sceneRef.current.add(sink);
      sinksRef.current.push(sink);
    }

    // Create sensor nodes
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const nodeGeometry = new THREE.SphereGeometry(8, 16, 16);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.3,
      });

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

      // Position node based on topology
      let xPos, yPos, zPos;

      if (topology === 'random') {
        // Random distribution
        xPos = (Math.random() - 0.5) * 1600;
        yPos = Math.random() * 400 + 20;
        zPos = (Math.random() - 0.5) * 1600;
      } else if (topology === 'grid') {
        // Grid distribution
        const gridSize = Math.ceil(Math.sqrt(nodeCount));
        const cellSize = 1600 / gridSize;
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        xPos = (col * cellSize) - 800 + (Math.random() * 50 - 25);
        yPos = Math.random() * 400 + 20;
        zPos = (row * cellSize) - 800 + (Math.random() * 50 - 25);
      } else if (topology === 'column') {
        // Vertical column distribution
        const columnCount = Math.ceil(nodeCount / 5);
        const column = Math.floor(i / 5);
        const row = i % 5;

        xPos = (column * (1600 / columnCount)) - 800 + (Math.random() * 50 - 25);
        yPos = (row * 80) + 20;
        zPos = (Math.random() - 0.5) * 1600;
      } else if (topology === 'triangle') {
        // Triangle distribution (focusing on three areas)
        const area = i % 3;
        if (area === 0) {
          xPos = (Math.random() - 0.5) * 400;
          zPos = (Math.random() - 0.5) * 400 - 400;
        } else if (area === 1) {
          xPos = (Math.random() - 0.5) * 400 - 400;
          zPos = (Math.random() - 0.5) * 400 + 400;
        } else {
          xPos = (Math.random() - 0.5) * 400 + 400;
          zPos = (Math.random() - 0.5) * 400 + 400;
        }
        yPos = Math.random() * 400 + 20;
      }

      node.position.set(xPos, yPos, zPos);
      node.userData = {
        id: i,
        energy: 100,
        type: 'sensor',
      };

      sceneRef.current.add(node);
      nodesRef.current.push(node);
      nodes.push({ id: i, position: new THREE.Vector3(xPos, yPos, zPos) });
    }

    // Create connections between nodes based on connection range
    nodes.forEach(node => {
      const nodePosition = node.position;

      // Connect to sink nodes if in range
      sinksRef.current.forEach((sink, sinkIndex) => {
        const sinkPosition = sink.position;
        const distance = nodePosition.distanceTo(sinkPosition);

        if (distance <= connectionRange) {
          const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
            nodePosition,
            sinkPosition
          ]);

          const connectionMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            opacity: 0.3,
            transparent: true,
          });

          const connection = new THREE.Line(connectionGeometry, connectionMaterial);
          connection.userData = {
            from: node.id,
            to: `sink-${sinkIndex}`,
          };

          sceneRef.current.add(connection);
          connectionsRef.current.push(connection);
        }
      });

      // Connect to other nodes if in range
      nodes.forEach(otherNode => {
        if (node.id === otherNode.id) return; // Skip self

        const otherPosition = otherNode.position;
        const distance = nodePosition.distanceTo(otherPosition);

        if (distance <= connectionRange) {
          // Avoid duplicate connections
          const connectionExists = connectionsRef.current.some(conn =>
            (conn.userData.from === node.id && conn.userData.to === otherNode.id) ||
            (conn.userData.from === otherNode.id && conn.userData.to === node.id)
          );

          if (!connectionExists) {
            const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
              nodePosition,
              otherPosition
            ]);

            const connectionMaterial = new THREE.LineBasicMaterial({
              color: 0x00ff00,
              opacity: 0.2,
              transparent: true,
            });

            const connection = new THREE.Line(connectionGeometry, connectionMaterial);
            connection.userData = {
              from: node.id,
              to: otherNode.id,
            };

            sceneRef.current.add(connection);
            connectionsRef.current.push(connection);
          }
        }
      });
    });

    // Update status with network information
    const connectedNodes = new Set();
    connectionsRef.current.forEach(conn => {
      if (typeof conn.userData.from === 'number') connectedNodes.add(conn.userData.from);
      if (typeof conn.userData.to === 'number') connectedNodes.add(conn.userData.to);
    });

    const connectivity = Math.round((connectedNodes.size / nodeCount) * 100);

    setStatus(`Nodes: ${nodeCount} | Connections: ${connectionsRef.current.length} | Connectivity: ${connectivity}%`);

  }, [topology, nodeCount, sinkCount, connectionRange]);

  const topologyOptions = [
    { id: 'random', name: 'Random Distribution' },
    { id: 'grid', name: 'Grid Distribution' },
    { id: 'column', name: 'Vertical Column' },
    { id: 'triangle', name: 'Triangle Distribution' }
  ];

  const topologyInfo = {
    'random': {
      title: 'Random Distribution',
      description: 'Nodes are randomly placed throughout the volume, creating a natural and irregular network structure.',
      advantages: [
        'Mimics real-world deployment scenarios',
        'Good for testing protocol adaptability',
        'Provides diverse node distances and connection patterns'
      ],
      challenges: [
        'May create isolated node clusters',
        'Network connectivity can be unpredictable',
        'Uneven energy consumption across the network'
      ]
    },
    'grid': {
      title: 'Grid Distribution',
      description: 'Nodes are organized in a structured grid pattern with small random offsets to represent practical deployment.',
      advantages: [
        'Ensures consistent coverage of the area',
        'Predictable connectivity patterns',
        'Easier to analyze protocol behavior'
      ],
      challenges: [
        'Less realistic for underwater environments',
        'Regular patterns may favor certain routing protocols',
        'May create hotspots at central grid nodes'
      ]
    },
    'column': {
      title: 'Vertical Column',
      description: 'Nodes are distributed in vertical columns, representing common underwater sensor deployments along moorings.',
      advantages: [
        'Realistic representation of tethered deployments',
        'Good for depth-based protocol testing',
        'Efficient for water column monitoring'
      ],
      challenges: [
        'Limited horizontal connectivity',
        'Reliance on vertical packet forwarding',
        'Potential single points of failure within columns'
      ]
    },
    'triangle': {
      title: 'Triangle Distribution',
      description: 'Nodes are concentrated in three distinct areas, creating a triangle-shaped network topology.',
      advantages: [
        'Tests multi-hop routing capabilities',
        'Creates natural clustering for hierarchical protocols',
        'Simulates data collection from multiple areas of interest'
      ],
      challenges: [
        'Inter-cluster communication depends on limited nodes',
        'Non-uniform node distribution',
        'Potential energy bottlenecks at cluster boundaries'
      ]
    }
  };

  return (
    <Container>
      <Title>Network Topology Visualization</Title>

      <Section>
        <SectionTitle>3D Topology Explorer</SectionTitle>
        <Text>
          Visualize and explore different underwater sensor network topologies in an interactive 3D environment.
          Adjust node count, sink positions, and connection parameters to analyze network characteristics.
        </Text>

        <Controls>
          {topologyOptions.map(option => (
            <ControlButton
              key={option.id}
              active={topology === option.id}
              onClick={() => setTopology(option.id)}
            >
              {option.name}
            </ControlButton>
          ))}
        </Controls>

        <SliderContainer>
          <SliderLabel>
            <span>Node Count</span>
            <span>{nodeCount}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="10"
            max="150"
            value={nodeCount}
            onChange={(e) => setNodeCount(parseInt(e.target.value))}
          />
        </SliderContainer>

        <SliderContainer>
          <SliderLabel>
            <span>Sink Count</span>
            <span>{sinkCount}</span>
          </SliderLabel>
          <Slider
            type="range"
            min="1"
            max="5"
            value={sinkCount}
            onChange={(e) => setSinkCount(parseInt(e.target.value))}
          />
        </SliderContainer>

        <SliderContainer>
          <SliderLabel>
            <span>Connection Range</span>
            <span>{connectionRange}m</span>
          </SliderLabel>
          <Slider
            type="range"
            min="100"
            max="500"
            step="50"
            value={connectionRange}
            onChange={(e) => setConnectionRange(parseInt(e.target.value))}
          />
        </SliderContainer>

        <CanvasContainer ref={canvasRef}>
          <StatusBar>{status}</StatusBar>
        </CanvasContainer>

        <Text style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>
          Click and drag to rotate. Scroll to zoom. Right-click and drag to pan.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Topology Characteristics</SectionTitle>
        <Text>
          Compare the properties of different network deployment strategies and their impact
          on protocol performance, energy consumption, and communication patterns.
        </Text>

        <InfoCard>
          <InfoTitle>{topologyInfo[topology].title}</InfoTitle>
          <InfoContent>
            <p>{topologyInfo[topology].description}</p>

            <h4 style={{ color: '#00ff00', marginTop: '16px', marginBottom: '8px' }}>Advantages</h4>
            <InfoList>
              {topologyInfo[topology].advantages.map((advantage, idx) => (
                <li key={idx}>{advantage}</li>
              ))}
            </InfoList>

            <h4 style={{ color: '#00ff00', marginTop: '16px', marginBottom: '8px' }}>Challenges</h4>
            <InfoList>
              {topologyInfo[topology].challenges.map((challenge, idx) => (
                <li key={idx}>{challenge}</li>
              ))}
            </InfoList>
          </InfoContent>
        </InfoCard>
      </Section>

      <Section>
        <SectionTitle>Network Parameters Impact</SectionTitle>
        <Text>
          Analysis of how various network parameters affect the overall performance and operation
          of underwater wireless sensor networks across different topologies.
        </Text>

        <Grid>
          <InfoCard>
            <InfoTitle>Node Density</InfoTitle>
            <InfoContent>
              <p>Higher node density improves connectivity and reliability but increases energy
                consumption due to interference and higher control packet overhead.</p>
              <p style={{ marginTop: '8px' }}>Optimal for: <strong style={{ color: '#00ff00' }}>Grid Distribution</strong></p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Sink Placement</InfoTitle>
            <InfoContent>
              <p>Strategic sink placement significantly impacts network lifetime and data delivery
                efficiency. Multiple sinks help balance traffic load and reduce energy hotspots.</p>
              <p style={{ marginTop: '8px' }}>Optimal for: <strong style={{ color: '#00ff00' }}>Triangle Distribution</strong></p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Connection Range</InfoTitle>
            <InfoContent>
              <p>Longer connection ranges improve connectivity but require more transmission power,
                reducing node lifetime. Shorter ranges need more sophisticated multi-hop routing.</p>
              <p style={{ marginTop: '8px' }}>Optimal for: <strong style={{ color: '#00ff00' }}>Random Distribution</strong></p>
            </InfoContent>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Network Depth</InfoTitle>
            <InfoContent>
              <p>Vertical distribution affects pressure-based protocols and acoustic channel characteristics.
                Deeper nodes often experience different attenuation and multipath propagation.</p>
              <p style={{ marginTop: '8px' }}>Optimal for: <strong style={{ color: '#00ff00' }}>Vertical Column</strong></p>
            </InfoContent>
          </InfoCard>
        </Grid>
      </Section>
    </Container>
  );
}

export default NetworkTopology; 