class UltraGraphicsAnimations {
  constructor() {
    this.scenes = new Map();
    this.renderers = new Map();
    this.cameras = new Map();
    this.animationFrames = new Map();
    this.mousePosition = { x: 0, y: 0 };
    this.setupMouseTracking();
  }

  setupMouseTracking() {
    document.addEventListener('mousemove', (event) => {
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }

  // MASSIVE Particle Galaxy with Nebula Effects for Education
  initEducationAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create MASSIVE particle system (5000+ particles)
    const particleCount = 5000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = [];
    const phases = [];

    // Generate spectacular galaxy with multiple arms
    for (let i = 0; i < particleCount; i++) {
      const armIndex = i % 4; // 4 spiral arms
      const armAngle = (armIndex / 4) * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.5) * 25 + 5;
      const angle = armAngle + radius * 0.15 + Math.random() * 0.8;
      
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 12 * Math.exp(-radius / 15);
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 3;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Spectacular color gradients
      const distance = Math.sqrt(x * x + z * z);
      const color = new THREE.Color();
      
      // Create nebula-like color variations
      if (distance < 8) {
        color.setHSL(0.15 + Math.random() * 0.1, 0.9, 0.8); // Golden core
      } else if (distance < 15) {
        color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.7); // Blue-purple arms
      } else {
        color.setHSL(0.85 + Math.random() * 0.1, 0.6, 0.5); // Red outer regions
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 4 + 0.5;
      phases.push(Math.random() * Math.PI * 2);

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.02,
        rotationSpeed: 0.001 + Math.random() * 0.002
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create glowing particle material
    const particleTexture = this.createGlowTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      map: particleTexture
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add spectacular geometric formations
    const geometricShapes = this.createSpectacularShapes(scene);

    // Add nebula clouds
    const nebulaClouds = this.createNebulaClouds(scene);

    camera.position.set(0, 10, 40);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      const time = Date.now() * 0.001;
      const positions = particleSystem.geometry.attributes.position.array;
      const colors = particleSystem.geometry.attributes.color.array;

      // Animate galaxy rotation and pulsing
      for (let i = 0; i < particleCount; i++) {
        const velocity = velocities[i];
        const phase = phases[i];
        
        // Galaxy rotation
        const currentRadius = Math.sqrt(positions[i * 3] * positions[i * 3] + positions[i * 3 + 2] * positions[i * 3 + 2]);
        const currentAngle = Math.atan2(positions[i * 3 + 2], positions[i * 3]);
        const newAngle = currentAngle + velocity.rotationSpeed;
        
        positions[i * 3] = Math.cos(newAngle) * currentRadius + Math.sin(time + phase) * 0.5;
        positions[i * 3 + 1] += Math.sin(time * 3 + phase) * 0.02;
        positions[i * 3 + 2] = Math.sin(newAngle) * currentRadius + Math.cos(time + phase) * 0.5;

        // Mouse interaction creates energy waves
        const mouseInfluence = 2;
        const distanceToMouse = Math.abs(positions[i * 3] / 20 - this.mousePosition.x) + 
                               Math.abs(positions[i * 3 + 1] / 20 - this.mousePosition.y);
        
        if (distanceToMouse < 0.3) {
          positions[i * 3] += Math.sin(time * 5) * mouseInfluence;
          positions[i * 3 + 1] += Math.cos(time * 5) * mouseInfluence;
          
          // Brighten colors near mouse
          colors[i * 3] = Math.min(1, colors[i * 3] * 1.5);
          colors[i * 3 + 1] = Math.min(1, colors[i * 3 + 1] * 1.5);
          colors[i * 3 + 2] = Math.min(1, colors[i * 3 + 2] * 1.5);
        }
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.geometry.attributes.color.needsUpdate = true;

      // Animate geometric shapes with complex rotations
      geometricShapes.forEach((shape, index) => {
        shape.rotation.x += 0.02 + Math.sin(time + index) * 0.01;
        shape.rotation.y += 0.015 + Math.cos(time + index) * 0.01;
        shape.rotation.z += 0.01 + Math.sin(time * 0.5 + index) * 0.005;
        shape.position.y += Math.sin(time * 2 + index * 0.5) * 0.03;
        
        // Pulsing scale effect
        const pulse = 1 + Math.sin(time * 4 + index) * 0.3;
        shape.scale.setScalar(pulse);
      });

      // Animate nebula clouds
      nebulaClouds.forEach((cloud, index) => {
        cloud.rotation.z += 0.002 + index * 0.001;
        cloud.material.opacity = 0.1 + Math.sin(time + index) * 0.05;
      });

      // Dynamic camera movement
      camera.position.x = Math.sin(time * 0.1) * 8 + this.mousePosition.x * 5;
      camera.position.y = 10 + Math.cos(time * 0.08) * 4 + this.mousePosition.y * 3;
      camera.position.z = 40 + Math.sin(time * 0.05) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Cyberpunk Data Matrix for Projects Section
  initProjectsAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create massive data stream matrix
    const streamCount = 150;
    const streams = [];
    
    for (let i = 0; i < streamCount; i++) {
      const stream = this.createDataStream(scene, i);
      streams.push(stream);
    }

    // Create holographic data nodes
    const dataNodes = this.createHolographicNodes(scene);

    // Create energy connections
    const energyConnections = this.createEnergyConnections(scene, dataNodes);

    // Create floating code fragments
    const codeFragments = this.createCodeFragments(scene);

    camera.position.set(0, 0, 20);

    const animate = () => {
      const time = Date.now() * 0.001;

      // Animate data streams
      streams.forEach((stream, index) => {
        stream.children.forEach((particle, particleIndex) => {
          particle.position.y -= stream.userData.speed;
          
          // Reset particles that fall off screen
          if (particle.position.y < -30) {
            particle.position.y = 30;
            particle.position.x = stream.userData.x + (Math.random() - 0.5) * 2;
          }

          // Glitch effect
          if (Math.random() < 0.001) {
            particle.position.x += (Math.random() - 0.5) * 4;
            particle.material.color.setHex(Math.random() * 0xffffff);
          }

          // Mouse interaction
          const mouseDistance = Math.abs(particle.position.x / 10 - this.mousePosition.x);
          if (mouseDistance < 0.2) {
            particle.scale.setScalar(2 + Math.sin(time * 10) * 0.5);
            particle.material.emissive.setHex(0x00ff88);
          } else {
            particle.scale.setScalar(1);
            particle.material.emissive.setHex(0x000000);
          }
        });
      });

      // Animate holographic nodes
      dataNodes.forEach((node, index) => {
        node.rotation.x += 0.03;
        node.rotation.y += 0.02;
        
        // Pulsing holographic effect
        const pulse = 1 + Math.sin(time * 3 + index) * 0.4;
        node.scale.setScalar(pulse);
        
        // Color cycling
        node.material.color.setHSL((time * 0.5 + index * 0.2) % 1, 0.8, 0.6);
      });

      // Animate energy connections
      energyConnections.forEach(connection => {
        const positions = connection.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time * 5 + i) * 0.1;
        }
        connection.geometry.attributes.position.needsUpdate = true;
        
        // Flowing energy effect
        connection.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
      });

      // Animate code fragments
      codeFragments.forEach((fragment, index) => {
        fragment.rotation.y += 0.01;
        fragment.position.y += Math.sin(time + index) * 0.02;
        
        // Fade in/out effect
        fragment.material.opacity = 0.7 + Math.sin(time * 2 + index) * 0.3;
      });

      // Camera movement with mouse tracking
      camera.position.x = this.mousePosition.x * 10;
      camera.position.y = this.mousePosition.y * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Quantum Wave Reality for Experience Section
  initExperienceAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create quantum field mesh
    const quantumField = this.createQuantumField(scene);

    // Create energy orbs with trails
    const energyOrbs = this.createEnergyOrbs(scene);

    // Create dimensional portals
    const portals = this.createDimensionalPortals(scene);

    // Create particle storms
    const particleStorms = this.createParticleStorms(scene);

    camera.position.set(0, 15, 25);

    const animate = () => {
      const time = Date.now() * 0.001;

      // Animate quantum field with complex mathematics
      const positions = quantumField.geometry.attributes.position;
      const colors = quantumField.geometry.attributes.color;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Multiple wave interference patterns
        const wave1 = Math.sin(x * 0.2 + time * 3) * 3;
        const wave2 = Math.cos(y * 0.15 + time * 2.5) * 2;
        const wave3 = Math.sin((x + y) * 0.1 + time * 1.5) * 1.5;
        const wave4 = Math.cos(Math.sqrt(x*x + y*y) * 0.05 + time * 4) * 1;
        
        // Mouse creates quantum disturbance
        const mouseX = this.mousePosition.x * 10;
        const mouseY = this.mousePosition.y * 10;
        const distanceToMouse = Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
        const mouseEffect = Math.exp(-distanceToMouse * 0.1) * Math.sin(time * 8 - distanceToMouse * 0.5) * 4;
        
        const finalZ = wave1 + wave2 + wave3 + wave4 + mouseEffect;
        positions.setZ(i, finalZ);

        // Dynamic coloring based on wave height and position
        const normalizedZ = (finalZ + 8) / 16;
        const distanceFromCenter = Math.sqrt(x*x + y*y) / 15;
        
        colors.setX(i, normalizedZ * 0.5 + distanceFromCenter * 0.3);
        colors.setY(i, 0.3 + normalizedZ * 0.4);
        colors.setZ(i, 0.8 + Math.sin(time + normalizedZ) * 0.2);
      }
      
      positions.needsUpdate = true;
      colors.needsUpdate = true;

      // Animate energy orbs with quantum effects
      energyOrbs.forEach((orb, index) => {
        const radius = 12;
        const speed = 0.02 + index * 0.005;
        const angle = time * speed + index * Math.PI * 0.4;
        
        orb.position.x = Math.cos(angle) * radius;
        orb.position.z = Math.sin(angle) * radius;
        orb.position.y = 5 + Math.sin(time * 2 + index) * 3;
        
        // Quantum tunneling effect
        if (Math.random() < 0.002) {
          orb.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20
          );
        }
        
        // Rotation and scaling
        orb.rotation.x += 0.03;
        orb.rotation.y += 0.025;
        const pulse = 1 + Math.sin(time * 4 + index) * 0.5;
        orb.scale.setScalar(pulse);
        
        // Create energy trails
        if (Math.random() < 0.3) {
          this.createEnergyTrail(scene, orb.position.clone(), orb.material.color);
        }
      });

      // Animate dimensional portals
      portals.forEach((portal, index) => {
        portal.rotation.z += 0.02 + index * 0.005;
        portal.rotation.x += Math.sin(time + index) * 0.01;
        
        // Portal energy fluctuations
        const energy = 0.5 + Math.sin(time * 3 + index) * 0.3;
        portal.material.opacity = energy;
        portal.scale.setScalar(1 + energy * 0.3);
        
        // Color shifting
        portal.material.color.setHSL((time * 0.3 + index * 0.3) % 1, 0.8, 0.7);
      });

      // Animate particle storms
      particleStorms.forEach(storm => {
        storm.rotation.y += 0.01;
        const positions = storm.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time + i) * 0.02;
          positions[i + 1] += Math.cos(time + i * 0.1) * 0.02;
          positions[i + 2] += Math.sin(time * 0.5 + i * 0.05) * 0.02;
        }
        
        storm.geometry.attributes.position.needsUpdate = true;
      });

      // Dynamic camera with quantum uncertainty
      const uncertainty = Math.sin(time * 0.1) * 0.5;
      camera.position.x = Math.sin(time * 0.08) * 8 + this.mousePosition.x * 6 + uncertainty;
      camera.position.y = 15 + Math.cos(time * 0.06) * 5 + this.mousePosition.y * 4;
      camera.position.z = 25 + Math.sin(time * 0.04) * 4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Helper methods for creating complex graphics
  createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');

    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.1, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  createSpectacularShapes(scene) {
    const shapes = [];
    const geometries = [
      new THREE.TetrahedronGeometry(2),
      new THREE.OctahedronGeometry(2),
      new THREE.IcosahedronGeometry(2),
      new THREE.DodecahedronGeometry(2),
      new THREE.TorusGeometry(2, 0.5, 8, 16),
      new THREE.ConeGeometry(1.5, 3, 8)
    ];

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / 12, 0.9, 0.7),
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );

      scene.add(shape);
      shapes.push(shape);
    }

    return shapes;
  }

  createNebulaClouds(scene) {
    const clouds = [];
    
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.6, 0.4),
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });

      const cloud = new THREE.Mesh(geometry, material);
      cloud.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 60
      );
      cloud.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(cloud);
      clouds.push(cloud);
    }

    return clouds;
  }

  // Additional complex helper methods would continue here...
  // (I'll include the key ones for the data streams, quantum field, etc.)

  createDataStream(scene, index) {
    const streamGroup = new THREE.Group();
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.3 + Math.random() * 0.4, 0.8, 0.6),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (index % 15) * 4 - 30,
        30 - i * 3,
        (Math.floor(index / 15) - 5) * 4
      );

      streamGroup.add(particle);
    }

    streamGroup.userData = {
      speed: 0.2 + Math.random() * 0.3,
      x: (index % 15) * 4 - 30
    };

    scene.add(streamGroup);
    return streamGroup;
  }

  createQuantumField(scene) {
    const geometry = new THREE.PlaneGeometry(30, 30, 150, 150);
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    // Initialize colors
    const colors = new Float32Array(geometry.attributes.position.count * 3);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    return mesh;
  }

  // Continue with more helper methods...

  handleResize(containerId) {
    const container = document.getElementById(containerId);
    const renderer = this.renderers.get(containerId);
    const camera = this.cameras.get(containerId);
    
    if (container && renderer && camera) {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
  }

  destroy(containerId) {
    if (this.animationFrames.has(containerId)) {
      cancelAnimationFrame(this.animationFrames.get(containerId));
      this.animationFrames.delete(containerId);
    }
    
    const renderer = this.renderers.get(containerId);
    if (renderer) {
      renderer.dispose();
      this.renderers.delete(containerId);
    }
    
    this.scenes.delete(containerId);
    this.cameras.delete(containerId);
  }
}

window.threeJSAnimations = new UltraGraphicsAnimations();

/* Replace your theme toggle styles with these fixed versions: */

/* Theme Toggle Styles - Fixed Overflow */
.theme-toggle {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1001;
  transition: var(--theme-transition);
}

.theme-toggle__button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-primary);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: var(--theme-transition);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1002;
}

.theme-toggle__button:hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: var(--shadow-xl);
}

.theme-toggle__container {
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-primary);
  border-radius: 2rem;
  padding: 0.5rem;
  box-shadow: var(--shadow-xl);
  border: 2px solid var(--border-color);
  backdrop-filter: blur(20px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-50%) translateX(20px) scale(0.9);
  transition: var(--theme-transition);
  min-width: 220px;
  /* Fix overflow */
  overflow: hidden;
  z-index: 1001;
}

.theme-toggle.open .theme-toggle__container {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0) scale(1);
}

.theme-toggle__options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  /* Fix overflow */
  overflow: hidden;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 1.5rem;
  transition: var(--theme-transition);
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  z-index: 2;
  /* Fix overflow */
  overflow: hidden;
  white-space: nowrap;
}

.theme-option:hover {
  color: var(--text-primary);
  background: rgba(var(--primary-color-rgb, 99, 102, 241), 0.1);
  transform: translateX(2px);
}

.theme-option.active {
  color: white;
  /* Ensure active state doesn't overflow */
  background: transparent;
}

.theme-option i {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.theme-option span {
  flex: 1;
  /* Prevent text overflow */
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-toggle__indicator {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  height: calc(33.333% - 0.33rem);
  background: var(--gradient-primary);
  border-radius: 1.5rem;
  transition: var(--theme-transition);
  transform: translateY(0);
  z-index: 1;
  /* Fix overflow and ensure it stays within bounds */
  overflow: hidden;
  box-sizing: border-box;
}

.theme-toggle__indicator.dark {
  transform: translateY(calc(100% + 0.5rem));
}

.theme-toggle__indicator.surprise {
  transform: translateY(calc(200% + 1rem));
}

/* Add RGB color variables for better theme support */
:root {
  --primary-color-rgb: 99, 102, 241;
  --bg-primary-rgb: 255, 255, 255;
}

[data-theme="dark"] {
  --primary-color-rgb: 139, 92, 246;
  --bg-primary-rgb: 15, 23, 42;
}

[data-theme="surprise"] {
  --primary-color-rgb: 231, 76, 60;
  --bg-primary-rgb: 26, 26, 46;
}

/* Mobile adjustments - Fix overflow */
@media (max-width: 768px) {
  .theme-toggle {
    top: auto;
    bottom: 20px;
    right: 20px;
  }
  
  .theme-toggle__container {
    right: 70px;
    bottom: 0;
    top: auto;
    transform: translateX(20px) scale(0.9);
    min-width: 180px;
    /* Ensure it doesn't overflow screen */
    max-width: calc(100vw - 100px);
  }
  
  .theme-toggle.open .theme-toggle__container {
    transform: translateX(0) scale(1);
  }
  
  .theme-toggle__button {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .theme-option {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}

/* Prevent any overflow issues globally */
.theme-toggle * {
  box-sizing: border-box;
}

/* Enhanced visual effects for theme options */
.theme-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(var(--primary-color-rgb), 0.1), transparent);
  transition: left 0.3s ease;
  border-radius: inherit;
}

.theme-option:hover::before {
  left: 100%;
}

/* Surprise theme special effects */
[data-theme="surprise"] .theme-toggle__button {
  background: linear-gradient(45deg, #e74c3c, #f39c12, #e74c3c);
  background-size: 200% 200%;
  animation: surpriseGradient 2s ease-in-out infinite;
}

@keyframes surpriseGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Add to your styles.css for better graphics integration */

/* Enhanced Three.js containers with better performance */
.threejs-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  will-change: transform;
}

.threejs-background canvas {
  width: 100% !important;
  height: 100% !important;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Theme-aware graphics effects */
[data-theme="dark"] .threejs-background {
  filter: brightness(1.2) contrast(1.1) hue-rotate(10deg);
}

[data-theme="surprise"] .threejs-background {
  filter: brightness(1.3) saturate(1.4) hue-rotate(30deg);
  animation: surpriseGlow 4s ease-in-out infinite;
}

@keyframes surpriseGlow {
  0%, 100% { 
    filter: brightness(1.3) saturate(1.4) hue-rotate(30deg);
  }
  50% { 
    filter: brightness(1.5) saturate(1.6) hue-rotate(60deg);
  }
}

/* Better content layering over graphics */
.courses__section .container,
.projects__section .container,
.experience__section .container {
  position: relative;
  z-index: 2;
  background: rgba(var(--bg-primary-rgb), 0.05);
  backdrop-filter: blur(15px) saturate(1.2);
  border-radius: 2rem;
  padding: 3rem;
  margin: 2rem 0;
  border: 1px solid rgba(var(--primary-color-rgb), 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Interactive effects that work with graphics */
.course__card,
.project__card {
  backdrop-filter: blur(20px) saturate(1.3);
  background: rgba(var(--bg-primary-rgb), 0.8);
  border: 1px solid rgba(var(--primary-color-rgb), 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.course__card:hover,
.project__card:hover {
  background: rgba(var(--bg-primary-rgb), 0.95);
  border-color: rgba(var(--primary-color-rgb), 0.5);
  box-shadow: 
    0 25px 50px rgba(var(--primary-color-rgb), 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-10px) scale(1.02);
}

/* Timeline with graphics integration */
.timeline__content {
  backdrop-filter: blur(20px) saturate(1.2);
  background: rgba(var(--bg-primary-rgb), 0.85);
  border: 1px solid rgba(var(--primary-color-rgb), 0.2);
}

.timeline__content:hover {
  background: rgba(var(--bg-primary-rgb), 0.95);
  border-color: rgba(var(--primary-color-rgb), 0.4);
  box-shadow: 0 20px 40px rgba(var(--primary-color-rgb), 0.15);
}

/* Performance optimizations for graphics */
@media (max-width: 768px) {
  .threejs-background canvas {
    filter: brightness(0.7);
    transform: scale(0.9) translateZ(0);
  }
}

/* Ensure smooth scrolling with heavy graphics */
html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

/* GPU acceleration for better performance */
.course__card,
.project__card,
.timeline__content,
.theme-toggle {
  transform: translateZ(0);
  will-change: transform;
}