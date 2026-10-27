import * as THREE from 'three';

export class Sharia3DScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf4f6f8);

    const w = this.container.clientWidth;
    const h = this.container.clientHeight || 360;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.camera.position.set(0, 4, 9);
    this.camera.lookAt(0, 0.5, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.currentMode = 'kmk';
    this.groupKMK = new THREE.Group();
    this.groupMMQ = new THREE.Group();
    this.scene.add(this.groupKMK);
    this.scene.add(this.groupMMQ);
    this.groupMMQ.visible = false;

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.initLights();
    this.buildKMKModel();
    this.buildMMQModel();
    this.bindEvents();
    this.animate();
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe8f5e9, 0.5);
    fillLight.position.set(-8, 6, -6);
    this.scene.add(fillLight);

    // Subtle grid plane in bright theme
    const grid = new THREE.GridHelper(14, 14, 0xd0d7de, 0xe1e4e8);
    grid.position.y = -1.2;
    this.scene.add(grid);
  }

  buildKMKModel() {
    // Bank Capital Pillar (Emerald Green)
    const bankGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.2, 32);
    const bankMat = new THREE.MeshStandardMaterial({
      color: 0x085f3b,
      metalness: 0.3,
      roughness: 0.3
    });
    this.bankPillar = new THREE.Mesh(bankGeo, bankMat);
    this.bankPillar.position.set(-2.4, 0, 0);
    this.bankPillar.castShadow = true;
    this.groupKMK.add(this.bankPillar);

    // Nasabah Self-Financing Pillar (Islamic Gold)
    const nasabahGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 32);
    const nasabahMat = new THREE.MeshStandardMaterial({
      color: 0xc59b27,
      metalness: 0.4,
      roughness: 0.25
    });
    this.nasabahPillar = new THREE.Mesh(nasabahGeo, nasabahMat);
    this.nasabahPillar.position.set(2.4, -0.4, 0);
    this.nasabahPillar.castShadow = true;
    this.groupKMK.add(this.nasabahPillar);

    // Center SPK Project Core (Dodecahedron / Core Hub)
    const coreGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a365d,
      roughness: 0.2,
      metalness: 0.5
    });
    this.coreProject = new THREE.Mesh(coreGeo, coreMat);
    this.coreProject.position.set(0, 0.4, 0);
    this.coreProject.castShadow = true;
    this.groupKMK.add(this.coreProject);

    // Escrow Ring encircling the Project
    const ringGeo = new THREE.TorusGeometry(1.8, 0.08, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x047857,
      emissiveIntensity: 0.3
    });
    this.escrowRing = new THREE.Mesh(ringGeo, ringMat);
    this.escrowRing.rotation.x = Math.PI / 2;
    this.escrowRing.position.y = 0.4;
    this.groupKMK.add(this.escrowRing);

    // Flowing Connecting Pipes/Beams
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6, roughness: 0.4 });
    
    // Left beam
    const beamLGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.4);
    const beamL = new THREE.Mesh(beamLGeo, pipeMat);
    beamL.rotation.z = Math.PI / 2.3;
    beamL.position.set(-1.2, 0.2, 0);
    this.groupKMK.add(beamL);

    // Right beam
    const beamRGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.4);
    const beamR = new THREE.Mesh(beamRGeo, pipeMat);
    beamR.rotation.z = -Math.PI / 2.3;
    beamR.position.set(1.2, 0.2, 0);
    this.groupKMK.add(beamR);
  }

  buildMMQModel() {
    // MMQ Asset: 3D Multi-Layer Capital & Asset Building
    this.mmqAssetGroup = new THREE.Group();
    this.groupMMQ.add(this.mmqAssetGroup);

    // Create 10 stacked slices of an asset (factory / building structure)
    this.slices = [];
    const totalSlices = 10;
    const sliceHeight = 0.32;
    const width = 2.4;
    const depth = 2.0;

    for (let i = 0; i < totalSlices; i++) {
      const y = -1.0 + i * (sliceHeight + 0.04);
      
      // Bank segment (starts 80% wide, shrinks to 0%)
      const bankMat = new THREE.MeshStandardMaterial({
        color: 0x085f3b,
        roughness: 0.3,
        metalness: 0.3
      });
      const bankMesh = new THREE.Mesh(new THREE.BoxGeometry(1, sliceHeight, depth), bankMat);
      bankMesh.position.y = y;
      bankMesh.castShadow = true;
      
      // Nasabah segment (starts 20% wide, grows to 100%)
      const nasabahMat = new THREE.MeshStandardMaterial({
        color: 0xc59b27,
        roughness: 0.3,
        metalness: 0.4
      });
      const nasabahMesh = new THREE.Mesh(new THREE.BoxGeometry(1, sliceHeight, depth), nasabahMat);
      nasabahMesh.position.y = y;
      nasabahMesh.castShadow = true;

      this.mmqAssetGroup.add(bankMesh);
      this.mmqAssetGroup.add(nasabahMesh);

      this.slices.push({ bankMesh, nasabahMesh, y, width });
    }

    // Base Pedestal
    const baseGeo = new THREE.BoxGeometry(3.0, 0.2, 2.6);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -1.15;
    base.receiveShadow = true;
    this.groupMMQ.add(base);

    // Initial 80:20 ratio
    this.updateMMQOwnership(0.2);
  }

  updateMMQOwnership(nasabahRatio) {
    // nasabahRatio ranges from 0.15 (15%) to 1.0 (100%)
    const clamped = Math.max(0.01, Math.min(0.999, nasabahRatio));
    const bankRatio = 1 - clamped;
    const totalW = 2.4;

    this.slices.forEach(slice => {
      const bankW = totalW * bankRatio;
      const nasabahW = totalW * clamped;

      slice.bankMesh.scale.x = Math.max(0.001, bankW);
      slice.bankMesh.position.x = -totalW / 2 + bankW / 2;

      slice.nasabahMesh.scale.x = Math.max(0.001, nasabahW);
      slice.nasabahMesh.position.x = totalW / 2 - nasabahW / 2;
    });
  }

  setMode(mode) {
    this.currentMode = mode;
    if (mode === 'kmk') {
      this.groupKMK.visible = true;
      this.groupMMQ.visible = false;
      this.camera.position.set(0, 4, 9);
    } else {
      this.groupKMK.visible = false;
      this.groupMMQ.visible = true;
      this.camera.position.set(3, 4, 7);
    }
    this.camera.lookAt(0, 0.3, 0);
  }

  bindEvents() {
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    el.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      const activeGroup = this.currentMode === 'kmk' ? this.groupKMK : this.groupMMQ;
      activeGroup.rotation.y += deltaX * 0.008;
      activeGroup.rotation.x = Math.max(-0.4, Math.min(0.6, activeGroup.rotation.x + deltaY * 0.005));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support for mobile
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    el.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      const activeGroup = this.currentMode === 'kmk' ? this.groupKMK : this.groupMMQ;
      activeGroup.rotation.y += deltaX * 0.008;
      activeGroup.rotation.x = Math.max(-0.4, Math.min(0.6, activeGroup.rotation.x + deltaY * 0.005));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('resize', () => {
      if (!this.container) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight || 360;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.isDragging) {
      if (this.currentMode === 'kmk') {
        this.groupKMK.rotation.y += 0.004;
        if (this.coreProject) this.coreProject.rotation.y += 0.01;
        if (this.escrowRing) this.escrowRing.rotation.z += 0.015;
      } else {
        this.groupMMQ.rotation.y += 0.003;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}
