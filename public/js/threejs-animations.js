class ThreeJSAnimations {
  constructor() {
    this.scenes = new Map();
    this.renderers = new Map();
    this.cameras = new Map();
    this.animationFrames = new Map();
  }

  // Floating Geometric Shapes for Education Section
  initEducationAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.5),
      new THREE.DodecahedronGeometry(0.5)
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true })
    ];

    const shapes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const shape = new THREE.Mesh(geometry, material);
      
      shape.position.x = (Math.random() - 0.5) * 10;
      shape.position.y = (Math.random() - 0.5) * 10;
      shape.position.z = (Math.random() - 0.5) * 10;
      
      shape.userData = {
        rotationSpeed: {
          x: Math.random() * 0.02,
          y: Math.random() * 0.02,
          z: Math.random() * 0.02
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2
      };
      
      scene.add(shape);
      shapes.push(shape);
    }

    camera.position.z = 8;

    const animate = () => {
      const time = Date.now() * 0.001;
      
      shapes.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.01;
      });

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Particle System for Projects Section
  initProjectsAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 10;

    const animate = () => {
      const positions = particleSystem.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Wrap around screen
        if (positions[i * 3] > 10) positions[i * 3] = -10;
        if (positions[i * 3] < -10) positions[i * 3] = 10;
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
        if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Wave Animation for Experience Section
  initExperienceAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(15, 15, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 3;
    scene.add(wave);

    camera.position.z = 8;
    camera.position.y = 3;

    const animate = () => {
      const time = Date.now() * 0.001;
      const position = wave.geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.5;
        position.setZ(i, z);
      }
      
      position.needsUpdate = true;
      wave.rotation.z += 0.005;

      renderer.render(scene, camera);
      this.animationFrames.set(containerId, requestAnimationFrame(animate));
    };

    animate();
    
    this.scenes.set(containerId, scene);
    this.renderers.set(containerId, renderer);
    this.cameras.set(containerId, camera);
  }

  // Handle window resize
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

  // Clean up animations
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

// Initialize animations when DOM is loaded
window.threeJSAnimations = new ThreeJSAnimations();