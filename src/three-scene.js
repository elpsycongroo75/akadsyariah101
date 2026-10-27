import * as THREE from 'three';

export class Sharia3DScene {
  constructor(containerId, onStepChange = null) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.onStepChange = onStepChange;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8fafc); // Crisp light slate background

    const w = this.container.clientWidth || 600;
    const h = this.container.clientHeight || 420;

    this.camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 1000);
    this.camera.position.set(0, 9, 13);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Overlay container for 3D HTML labels
    this.overlay = document.createElement('div');
    this.overlay.className = 'three-labels-overlay';
    this.container.appendChild(this.overlay);

    this.currentMode = 'kmk';
    this.currentStep = 1;
    this.activeTween = null;

    this.groupKMK = new THREE.Group();
    this.groupMMQ = new THREE.Group();
    this.scene.add(this.groupKMK);
    this.scene.add(this.groupMMQ);
    this.groupMMQ.visible = false;

    this.labels = [];
    this.particles = [];

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.initLights();
    this.buildKMKScene();
    this.buildMMQScene();
    this.bindEvents();
    this.animate();
  }

  initLights() {
    // Ambient soft lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Main sun light
    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.3);
    sunLight.position.set(12, 18, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    // Soft emerald fill light
    const fillLight = new THREE.DirectionalLight(0xdcfce7, 0.6);
    fillLight.position.set(-10, 8, -10);
    this.scene.add(fillLight);

    // Subtle floor plane
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.9,
      metalness: 0.05
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Subtle grid lines
    const grid = new THREE.GridHelper(20, 20, 0xcbd5e1, 0xe2e8f0);
    grid.position.y = 0;
    this.scene.add(grid);
  }

  // -------------------------------------------------------------
  // BUILD KMK SCENE: 5 Real Banking Nodes with Animated Connections
  // -------------------------------------------------------------
  buildKMKScene() {
    this.kmkNodes = {};

    // 1. Bank Syariah Building (Emerald + White Classical)
    const bankGroup = new THREE.Group();
    // Base
    const bBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.4, 2.0),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 })
    );
    bBase.position.y = 0.2;
    bBase.castShadow = true;
    bankGroup.add(bBase);

    // Main body
    const bBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 1.4, 1.7),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    bBody.position.y = 1.1;
    bBody.castShadow = true;
    bankGroup.add(bBody);

    // Emerald Dome / Islamic Roof
    const bRoof = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 0.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x085f3b, metalness: 0.3, roughness: 0.2 })
    );
    bRoof.position.y = 2.2;
    bRoof.castShadow = true;
    bankGroup.add(bRoof);

    // Gold Finial / Crescent top
    const bCrest = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xc59b27, metalness: 0.8, roughness: 0.2 })
    );
    bCrest.position.y = 2.7;
    bankGroup.add(bCrest);

    // Columns
    const colMat = new THREE.MeshStandardMaterial({ color: 0x085f3b });
    for (let x of [-0.65, -0.22, 0.22, 0.65]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.4), colMat);
      col.position.set(x, 1.1, 0.9);
      bankGroup.add(col);
    }

    bankGroup.position.set(-4.5, 0, 1.8);
    this.groupKMK.add(bankGroup);
    this.kmkNodes.bank = bankGroup;

    // 2. Nasabah / Kontraktor Office (Blue & Slate Modern Office)
    const nasabahGroup = new THREE.Group();
    const nBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.6, 1.8),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    nBase.position.y = 0.8;
    nBase.castShadow = true;
    nasabahGroup.add(nBase);

    // Blue modern slanted roof
    const nRoof = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.25, 2.0),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.2 })
    );
    nRoof.position.y = 1.7;
    nasabahGroup.add(nRoof);

    // Windows
    const winMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1 });
    const win1 = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8), winMat);
    win1.position.set(0, 0.9, 0.91);
    nasabahGroup.add(win1);

    nasabahGroup.position.set(4.5, 0, 1.8);
    this.groupKMK.add(nasabahGroup);
    this.kmkNodes.nasabah = nasabahGroup;

    // 3. Bouwheer / Pemberi Kerja (Highrise Glass Tower)
    const bouwheerGroup = new THREE.Group();
    const bTower = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 3.2, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.4 })
    );
    bTower.position.y = 1.6;
    bTower.castShadow = true;
    bouwheerGroup.add(bTower);

    // Spire
    const bSpire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.12, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
    );
    bSpire.position.y = 3.7;
    bouwheerGroup.add(bSpire);

    bouwheerGroup.position.set(4.5, 0, -3.2);
    this.groupKMK.add(bouwheerGroup);
    this.kmkNodes.bouwheer = bouwheerGroup;

    // 4. Proyek SPK (Construction Site with Crane & Half-Built Building)
    const proyekGroup = new THREE.Group();
    // Concrete foundation / half-built floors
    const pFloor1 = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.5, 2.0),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 })
    );
    pFloor1.position.y = 0.25;
    proyekGroup.add(pFloor1);

    const pFloor2 = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.8, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 })
    );
    pFloor2.position.y = 0.9;
    proyekGroup.add(pFloor2);

    // Construction Crane (Yellow)
    const craneGroup = new THREE.Group();
    const cPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 3.2),
      new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.3 })
    );
    cPole.position.y = 1.6;
    craneGroup.add(cPole);

    // Crane Arm
    const cArm = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xeab308 })
    );
    cArm.position.set(0.6, 3.1, 0);
    craneGroup.add(cArm);

    craneGroup.position.set(0.7, 0, 0.6);
    proyekGroup.add(craneGroup);
    this.craneArm = cArm;

    proyekGroup.position.set(-4.5, 0, -3.2);
    this.groupKMK.add(proyekGroup);
    this.kmkNodes.proyek = proyekGroup;

    // 5. Central Escrow Vault (Golden Vault with Hologram Shield Rings)
    const escrowGroup = new THREE.Group();
    // Pedestal
    const ePed = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.8, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    ePed.position.y = 0.2;
    escrowGroup.add(ePed);

    // Gold Vault Sphere
    const eVault = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xc59b27,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x78350f,
        emissiveIntensity: 0.2
      })
    );
    eVault.position.y = 1.1;
    eVault.castShadow = true;
    escrowGroup.add(eVault);

    // Outer Glowing Escrow Ring
    const eRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.06, 16, 64),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.8,
        metalness: 0.5
      })
    );
    eRing1.rotation.x = Math.PI / 2.3;
    eRing1.position.y = 1.1;
    escrowGroup.add(eRing1);
    this.escrowRing1 = eRing1;

    const eRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.04, 16, 64),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.8
      })
    );
    eRing2.rotation.y = Math.PI / 3;
    eRing2.position.y = 1.1;
    escrowGroup.add(eRing2);
    this.escrowRing2 = eRing2;

    escrowGroup.position.set(0, 0, -0.6);
    this.groupKMK.add(escrowGroup);
    this.kmkNodes.escrow = escrowGroup;

    // Build Connecting Flow Paths (Curved glowing tubes)
    this.buildFlowLines();

    // Register 3D HTML Labels
    this.registerLabel('bank', 'BANK SYARIAH', 'Penyedia Modal 70-80%', this.kmkNodes.bank, 3.2);
    this.registerLabel('nasabah', 'NASABAH (KONTRAKTOR)', 'Self-Financing 20-30%', this.kmkNodes.nasabah, 2.3);
    this.registerLabel('proyek', 'PROYEK SPK', 'Objek Pelaksanaan Kerja', this.kmkNodes.proyek, 3.6);
    this.registerLabel('bouwheer', 'BOUWHEER (PEMBERI KERJA)', 'Sumber Termin Pembayaran', this.kmkNodes.bouwheer, 4.1);
    this.registerLabel('escrow', 'REKENING ESCROW', 'Split Settlement Otomatis', this.kmkNodes.escrow, 2.4);
  }

  buildFlowLines() {
    this.flowPipes = [];
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.5
    });

    const connections = [
      { from: this.kmkNodes.bank.position, to: this.kmkNodes.escrow.position },
      { from: this.kmkNodes.nasabah.position, to: this.kmkNodes.escrow.position },
      { from: this.kmkNodes.escrow.position, to: this.kmkNodes.proyek.position },
      { from: this.kmkNodes.bouwheer.position, to: this.kmkNodes.escrow.position },
      { from: this.kmkNodes.bouwheer.position, to: this.kmkNodes.nasabah.position }
    ];

    connections.forEach((conn) => {
      const curve = new THREE.LineCurve3(
        new THREE.Vector3(conn.from.x, 0.4, conn.from.z),
        new THREE.Vector3(conn.to.x, 0.4, conn.to.z)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
      const tube = new THREE.Mesh(tubeGeo, pipeMat);
      this.groupKMK.add(tube);
    });

    // Flowing Energy Pulse (Gold & Emerald Spheres)
    this.flowParticles = [];
    for (let i = 0; i < 6; i++) {
      const pMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x10b981 : 0xc59b27,
          emissive: i % 2 === 0 ? 0x10b981 : 0xc59b27,
          emissiveIntensity: 1.0
        })
      );
      pMesh.position.y = 0.4;
      this.groupKMK.add(pMesh);
      this.flowParticles.push({
        mesh: pMesh,
        from: this.kmkNodes.bank.position,
        to: this.kmkNodes.escrow.position,
        t: (i / 6)
      });
    }
  }

  // -------------------------------------------------------------
  // BUILD MMQ SCENE: Realistic 3D Asset with Dynamic Ownership
  // -------------------------------------------------------------
  buildMMQScene() {
    this.mmqGroup = new THREE.Group();
    this.groupMMQ.add(this.mmqGroup);

    // 1. Factory / Industrial Capital Asset
    // Main Warehouse Body
    const facBase = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 2.2, 3.4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    facBase.position.y = 1.1;
    facBase.castShadow = true;
    this.mmqGroup.add(facBase);

    // Pitched Gable Roof
    const roofGeo = new THREE.ConeGeometry(3.2, 1.2, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 2.8;
    this.mmqGroup.add(roof);

    // Windows & Bay Doors
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4 });
    const rollDoor = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), doorMat);
    rollDoor.position.set(-1.0, 0.8, 1.71);
    this.mmqGroup.add(rollDoor);

    // Chimneys / Silo on right
    const silo = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 3.6, 24),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.5, roughness: 0.2 })
    );
    silo.position.set(2.8, 1.8, -0.6);
    silo.castShadow = true;
    this.mmqGroup.add(silo);

    // 2. Holographic 3D Ownership HUD Arc floating above the asset
    this.ownershipArchGroup = new THREE.Group();
    this.ownershipArchGroup.position.set(0, 4.2, 0);
    this.mmqGroup.add(this.ownershipArchGroup);

    // Bank Arc Mesh (Emerald)
    this.bankArcMat = new THREE.MeshStandardMaterial({
      color: 0x085f3b,
      emissive: 0x085f3b,
      emissiveIntensity: 0.4,
      roughness: 0.2
    });
    // Nasabah Arc Mesh (Gold)
    this.nasabahArcMat = new THREE.MeshStandardMaterial({
      color: 0xc59b27,
      emissive: 0xc59b27,
      emissiveIntensity: 0.4,
      roughness: 0.2
    });

    this.rebuildMMQArches(0.2); // Start at 20% Nasabah, 80% Bank

    // Register MMQ Label
    this.registerLabel('mmqAsset', 'ASET INVESTASI (PABRIK/MESIN)', 'Objek Sewa Ijarah & Pembelian Bertahap', this.mmqGroup, 4.8);
  }

  rebuildMMQArches(nasabahRatio) {
    // Clear old arch meshes
    while (this.ownershipArchGroup.children.length > 0) {
      this.ownershipArchGroup.remove(this.ownershipArchGroup.children[0]);
    }

    const radius = 2.2;
    const tubeRadius = 0.16;
    const clamped = Math.max(0.01, Math.min(0.999, nasabahRatio));

    // Nasabah Arc (0 to clamped * 2PI)
    const nasabahAngle = clamped * Math.PI * 2;
    const nasabahGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 64, nasabahAngle);
    const nasabahMesh = new THREE.Mesh(nasabahGeo, this.nasabahArcMat);
    nasabahMesh.rotation.x = Math.PI / 2;
    this.ownershipArchGroup.add(nasabahMesh);

    // Bank Arc (clamped * 2PI to 2PI)
    const bankAngle = (1 - clamped) * Math.PI * 2;
    const bankGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 64, bankAngle);
    const bankMesh = new THREE.Mesh(bankGeo, this.bankArcMat);
    bankMesh.rotation.x = Math.PI / 2;
    bankMesh.rotation.z = nasabahAngle; // Start where nasabah ends
    this.ownershipArchGroup.add(bankMesh);

    // Center ownership sphere
    const centerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.6 })
    );
    this.ownershipArchGroup.add(centerSphere);
  }

  updateMMQOwnership(nasabahRatio) {
    this.rebuildMMQArches(nasabahRatio);
  }

  // -------------------------------------------------------------
  // HTML Floating 3D Labels
  // -------------------------------------------------------------
  registerLabel(id, title, subtitle, targetObj, yOffset) {
    const el = document.createElement('div');
    el.className = 'three-label-badge';
    el.innerHTML = `
      <div class="label-title">${title}</div>
      <div class="label-sub">${subtitle}</div>
    `;
    this.overlay.appendChild(el);
    this.labels.push({ id, el, targetObj, yOffset });
  }

  updateLabels() {
    const tempV = new THREE.Vector3();
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    const isKMK = this.currentMode === 'kmk';

    this.labels.forEach((lbl) => {
      // Check visibility according to active mode
      const isKMKLabel = lbl.id !== 'mmqAsset';
      if ((isKMK && !isKMKLabel) || (!isKMK && isKMKLabel)) {
        lbl.el.style.display = 'none';
        return;
      }

      lbl.el.style.display = 'block';
      lbl.targetObj.getWorldPosition(tempV);
      tempV.y += lbl.yOffset;
      tempV.project(this.camera);

      // Check if behind camera
      if (tempV.z > 1) {
        lbl.el.style.display = 'none';
        return;
      }

      const x = (tempV.x * 0.5 + 0.5) * w;
      const y = (-tempV.y * 0.5 + 0.5) * h;

      lbl.el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
    });
  }

  setMode(mode) {
    this.currentMode = (mode === 'kmk') ? 'kmk' : 'mmq';
    if (this.currentMode === 'kmk') {
      this.groupKMK.visible = true;
      this.groupMMQ.visible = false;
      this.camera.position.set(0, 9, 13);
      this.camera.lookAt(0, 0, 0);
    } else {
      this.groupKMK.visible = false;
      this.groupMMQ.visible = true;
      this.camera.position.set(4, 7, 10);
      this.camera.lookAt(0, 1.8, 0);
    }
  }

  // Highlights specific step in KMK (1 to 6) or MMQ
  highlightStep(stepNum) {
    this.currentStep = stepNum;
    if (this.currentMode === 'kmk') {
      // Reset scales
      Object.values(this.kmkNodes).forEach(node => node.scale.set(1, 1, 1));

      let from1 = this.kmkNodes.bank.position;
      let to1 = this.kmkNodes.escrow.position;
      let from2 = null;
      let to2 = null;

      switch (stepNum) {
        case 1: // SPK Due Diligence: Bouwheer & Nasabah
          this.kmkNodes.bouwheer.scale.set(1.2, 1.2, 1.2);
          this.kmkNodes.nasabah.scale.set(1.2, 1.2, 1.2);
          from1 = this.kmkNodes.bouwheer.position;
          to1 = this.kmkNodes.nasabah.position;
          break;
        case 2: // Akad & Line: Bank & Nasabah
          this.kmkNodes.bank.scale.set(1.2, 1.2, 1.2);
          this.kmkNodes.nasabah.scale.set(1.2, 1.2, 1.2);
          from1 = this.kmkNodes.nasabah.position;
          to1 = this.kmkNodes.bank.position;
          break;
        case 3: // Drawdown to Escrow
          this.kmkNodes.bank.scale.set(1.2, 1.2, 1.2);
          this.kmkNodes.escrow.scale.set(1.3, 1.3, 1.3);
          from1 = this.kmkNodes.bank.position;
          to1 = this.kmkNodes.escrow.position;
          break;
        case 4: // Proyek Execution
          this.kmkNodes.escrow.scale.set(1.2, 1.2, 1.2);
          this.kmkNodes.proyek.scale.set(1.3, 1.3, 1.3);
          from1 = this.kmkNodes.escrow.position;
          to1 = this.kmkNodes.proyek.position;
          break;
        case 5: // Incoming Billing
          this.kmkNodes.bouwheer.scale.set(1.25, 1.25, 1.25);
          this.kmkNodes.escrow.scale.set(1.3, 1.3, 1.3);
          from1 = this.kmkNodes.bouwheer.position;
          to1 = this.kmkNodes.escrow.position;
          break;
        case 6: // Settlement
          this.kmkNodes.escrow.scale.set(1.3, 1.3, 1.3);
          this.kmkNodes.bank.scale.set(1.2, 1.2, 1.2);
          this.kmkNodes.nasabah.scale.set(1.2, 1.2, 1.2);
          from1 = this.kmkNodes.escrow.position;
          to1 = this.kmkNodes.bank.position;
          from2 = this.kmkNodes.escrow.position;
          to2 = this.kmkNodes.nasabah.position;
          break;
      }

      // Re-route flow particles
      if (this.flowParticles) {
        this.flowParticles.forEach((p, idx) => {
          if (from2 && idx >= 3) {
            p.from = from2;
            p.to = to2;
          } else {
            p.from = from1;
            p.to = to1;
          }
        });
      }
    } else {
      // MMQ Mode
      const ratios = [0.20, 0.20, 0.20, 0.35, 0.70, 1.00];
      const targetRatio = ratios[stepNum - 1] || 0.20;
      this.updateMMQOwnership(targetRatio);
    }
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
      activeGroup.rotation.y += deltaX * 0.007;
      activeGroup.rotation.x = Math.max(-0.25, Math.min(0.45, activeGroup.rotation.x + deltaY * 0.004));

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
      activeGroup.rotation.y += deltaX * 0.007;
      activeGroup.rotation.x = Math.max(-0.25, Math.min(0.45, activeGroup.rotation.x + deltaY * 0.004));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('resize', () => {
      if (!this.container) return;
      const w = this.container.clientWidth || 600;
      const h = this.container.clientHeight || 420;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Slow ambient rotation when idle
    if (!this.isDragging) {
      if (this.currentMode === 'kmk') {
        this.groupKMK.rotation.y += 0.002;
        if (this.craneArm) this.craneArm.rotation.y = Math.sin(Date.now() * 0.001) * 0.4;
        if (this.escrowRing1) this.escrowRing1.rotation.z += 0.02;
        if (this.escrowRing2) this.escrowRing2.rotation.x += 0.015;

        // Flow particles
        if (this.flowParticles) {
          this.flowParticles.forEach((p) => {
            p.t = (p.t + 0.008) % 1;
            p.mesh.position.lerpVectors(p.from, p.to, p.t);
            p.mesh.position.y = 0.4 + Math.sin(p.t * Math.PI) * 0.3;
          });
        }
      } else {
        this.groupMMQ.rotation.y += 0.0025;
        if (this.ownershipArchGroup) {
          this.ownershipArchGroup.rotation.z += 0.006;
        }
      }
    }

    this.updateLabels();
    this.renderer.render(this.scene, this.camera);
  }
}
