class UltraGraphicsAnimations {
  constructor() {
    this.scenes = new Map();
    this.renderers = new Map();
    this.cameras = new Map();
    this.animationFrames = new Map();
    this.mousePosition = { x: 0, y: 0 };
    this.setupMouseTracking();
    this.setupTextAnimations();
  }

  setupMouseTracking() {
    document.addEventListener('mousemove', (event) => {
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }

  // Enhanced text animation system for making text POP
  setupTextAnimations() {
    // Add floating animation to all headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      heading.style.animation = `floatText 3s ease-in-out infinite`;
      heading.style.animationDelay = `${index * 0.2}s`;
      heading.style.transform = 'perspective(1000px) rotateX(0deg)';
      heading.style.transition = 'all 0.3s ease';
      
      // Add hover effects
      heading.addEventListener('mouseenter', () => {
        heading.style.transform = 'perspective(1000px) rotateX(10deg) scale(1.05)';
        heading.style.textShadow = '0 10px 30px rgba(99, 102, 241, 0.8), 0 0 50px rgba(99, 102, 241, 0.5)';
      });
      
      heading.addEventListener('mouseleave', () => {
        heading.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
        heading.style.textShadow = '';
      });
    });

    // Enhanced icon animations
    const icons = document.querySelectorAll('.fab, .fas, .far, i[class*="icon"]');
    icons.forEach((icon, index) => {
      icon.style.animation = `pulseIcon 2s ease-in-out infinite`;
      icon.style.animationDelay = `${index * 0.1}s`;
      icon.style.transform = 'perspective(1000px)';
      icon.style.transition = 'all 0.3s ease';
      
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'perspective(1000px) rotateY(360deg) scale(1.3)';
        icon.style.filter = 'drop-shadow(0 0 20px currentColor) brightness(1.5)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
        icon.style.filter = '';
      });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatText {
        0%, 100% { transform: translateY(0px) rotateX(0deg); }
        50% { transform: translateY(-10px) rotateX(5deg); }
      }
      
      @keyframes pulseIcon {
        0%, 100% { transform: scale(1) rotateZ(0deg); }
        25% { transform: scale(1.1) rotateZ(5deg); }
        75% { transform: scale(0.95) rotateZ(-5deg); }
      }
      
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      
      .text-pop {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        background-size: 200% 100%;
        animation: shimmer 3s infinite;
        -webkit-background-clip: text;
        background-clip: text;
      }
    `;
    document.head.appendChild(style);
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

  // Create Holographic Data Nodes
  createHolographicNodes(scene) {
    const nodes = [];
    const nodeCount = 25;
    
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.OctahedronGeometry(0.8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / nodeCount, 0.9, 0.7),
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );

      // Add glowing core
      const coreGeometry = new THREE.SphereGeometry(0.3);
      const coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / nodeCount, 1, 0.9),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      node.add(core);

      scene.add(node);
      nodes.push(node);
    }

    return nodes;
  }

  // Create Energy Connections
  createEnergyConnections(scene, nodes) {
    const connections = [];
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 8 && Math.random() > 0.7) {
          const points = [];
          points.push(nodes[i].position);
          
          // Add curve points for energy flow
          const midPoint = nodes[i].position.clone().add(nodes[j].position).multiplyScalar(0.5);
          midPoint.y += (Math.random() - 0.5) * 4;
          points.push(midPoint);
          points.push(nodes[j].position);

          const curve = new THREE.CatmullRomCurve3(points);
          const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
          const material = new THREE.LineBasicMaterial({
            color: 0x00ffaa,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
          });

          const connection = new THREE.Line(geometry, material);
          scene.add(connection);
          connections.push(connection);
        }
      }
    }

    return connections;
  }

  // Create Floating Code Fragments
  createCodeFragments(scene) {
    const fragments = [];
    const codeTexts = ['AI', 'ML', 'GPU', 'CPU', 'API', 'SQL', 'JS', 'PY', 'C++', 'CUDA'];
    
    for (let i = 0; i < 15; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      
      context.fillStyle = '#00ff88';
      context.font = 'bold 24px monospace';
      context.fillText(codeTexts[i % codeTexts.length], 10, 40);
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      
      const geometry = new THREE.PlaneGeometry(2, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      const fragment = new THREE.Mesh(geometry, material);
      fragment.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      scene.add(fragment);
      fragments.push(fragment);
    }

    return fragments;
  }

  // Create Energy Orbs with Trails
  createEnergyOrbs(scene) {
    const orbs = [];
    
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.IcosahedronGeometry(1);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / 12, 0.9, 0.8),
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const orb = new THREE.Mesh(geometry, material);
      
      // Add inner glow
      const glowGeometry = new THREE.SphereGeometry(0.7);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / 12, 1, 0.9),
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      orb.add(glow);

      scene.add(orb);
      orbs.push(orb);
    }

    return orbs;
  }

  // Create Dimensional Portals
  createDimensionalPortals(scene) {
    const portals = [];
    
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.RingGeometry(2, 3, 32);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / 6, 0.8, 0.7),
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });

      const portal = new THREE.Mesh(geometry, material);
      portal.position.set(
        Math.sin(i / 6 * Math.PI * 2) * 15,
        (Math.random() - 0.5) * 10,
        Math.cos(i / 6 * Math.PI * 2) * 15
      );
      portal.rotation.x = Math.random() * Math.PI;
      portal.rotation.y = Math.random() * Math.PI;

      scene.add(portal);
      portals.push(portal);
    }

    return portals;
  }

  // Create Particle Storms
  createParticleStorms(scene) {
    const storms = [];
    
    for (let i = 0; i < 4; i++) {
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      for (let j = 0; j < particleCount; j++) {
        positions[j * 3] = (Math.random() - 0.5) * 8;
        positions[j * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[j * 3 + 2] = (Math.random() - 0.5) * 8;
        
        const color = new THREE.Color().setHSL(i / 4 + Math.random() * 0.1, 0.8, 0.7);
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const storm = new THREE.Points(geometry, material);
      storm.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
      );

      scene.add(storm);
      storms.push(storm);
    }

    return storms;
  }

  // Create Energy Trail Effect
  createEnergyTrail(scene, position, color) {
    const trailGeometry = new THREE.SphereGeometry(0.15, 8, 6);
    const trailMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    trail.position.copy(position);
    scene.add(trail);

    // Animate trail fade-out
    const animate = () => {
      trail.material.opacity -= 0.02;
      trail.scale.multiplyScalar(0.95);
      
      if (trail.material.opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        scene.remove(trail);
      }
    };
    animate();
  }

  // EXTREME Lightning Storm Animation for Hero Section
  initHeroAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create massive lightning network
    const lightningBolts = this.createLightningNetwork(scene);
    
    // Create plasma spheres
    const plasmaSpheres = this.createPlasmaSpheres(scene);
    
    // Create energy vortex
    const energyVortex = this.createEnergyVortex(scene);

    camera.position.set(0, 0, 50);

    const animate = () => {
      const time = Date.now() * 0.001;

      // Animate lightning bolts
      lightningBolts.forEach((bolt, index) => {
        // Dynamic lightning paths
        const positions = bolt.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(time * 10 + i) * 0.5;
          positions[i + 1] += Math.cos(time * 8 + i) * 0.3;
        }
        bolt.geometry.attributes.position.needsUpdate = true;
        
        // Flickering effect
        bolt.material.opacity = 0.6 + Math.sin(time * 20 + index) * 0.4;
      });

      // Animate plasma spheres
      plasmaSpheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.05;
        sphere.rotation.y += 0.03;
        
        // Intense pulsing
        const pulse = 1 + Math.sin(time * 6 + index) * 0.8;
        sphere.scale.setScalar(pulse);
        
        // Color cycling
        sphere.material.color.setHSL((time * 0.8 + index * 0.3) % 1, 1, 0.8);
      });

      // Animate energy vortex
      energyVortex.rotation.z += 0.05;
      energyVortex.rotation.y += 0.02;

      // Extreme camera shake during "lightning strikes"
      if (Math.random() < 0.01) {
        camera.position.x += (Math.random() - 0.5) * 2;
        camera.position.y += (Math.random() - 0.5) * 2;
      }

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Helper methods for Hero animations
  createLightningNetwork(scene) {
    const bolts = [];
    
    for (let i = 0; i < 20; i++) {
      const points = [];
      const segments = 15;
      
      for (let j = 0; j <= segments; j++) {
        const x = (j / segments - 0.5) * 60 + (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 30;
        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 1, 0.9),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        linewidth: 3
      });

      const bolt = new THREE.Line(geometry, material);
      scene.add(bolt);
      bolts.push(bolt);
    }

    return bolts;
  }

  createPlasmaSpheres(scene) {
    const spheres = [];
    
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.SphereGeometry(2, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / 8, 1, 0.8),
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 40
      );

      scene.add(sphere);
      spheres.push(sphere);
    }

    return spheres;
  }

  createEnergyVortex(scene) {
    const geometry = new THREE.TorusGeometry(15, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const vortex = new THREE.Mesh(geometry, material);
    scene.add(vortex);
    return vortex;
  }

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
  // HERO SECTION - Lightning Storm with Particle System
  initHeroAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create massive particle system with lightning effects
    const particleCount = 3000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.6 + 0.4, 1, 0.8);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 4 + 1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Add floating geometric shapes for visual impact
    const geometries = [];
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.IcosahedronGeometry(2 + Math.random() * 3);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      scene.add(mesh);
      geometries.push(mesh);
    }

    camera.position.z = 50;

    const animate = () => {
      const time = Date.now() * 0.001;

      // Animate particles with lightning-like movement
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.01) * 0.1;
        positions[i * 3] += Math.cos(time + i * 0.01) * 0.05;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y += 0.001;

      // Animate geometric shapes
      geometries.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.001;
        shape.rotation.y += 0.015 + index * 0.001;
        shape.position.y += Math.sin(time + index) * 0.02;
      });

      // Interactive camera movement
      camera.position.x = Math.sin(time * 0.1) * 10 + this.mousePosition.x * 20;
      camera.position.y = Math.cos(time * 0.1) * 5 + this.mousePosition.y * 10;

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }
}

window.threeJSAnimations = new UltraGraphicsAnimations();