/* Robô mecha 3D (Three.js) — minimalista preto + teal, segue o mouse.
   Se o WebGL/Three falhar, mantém o SVG de fallback. */
(function () {
  var mount = document.getElementById('rpAvatar');
  var canvas = document.getElementById('robotCanvas');
  if (!mount || !canvas || typeof THREE === 'undefined') return;

  // WebGL disponível?
  try {
    var test = document.createElement('canvas');
    if (!(test.getContext('webgl') || test.getContext('experimental-webgl'))) return;
  } catch (e) { return; }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  var COL = {
    body: 0x20262a,      // armadura escura
    bodyDark: 0x0d1112,  // recessos
    steel: 0x3a4245,     // metal claro
    teal: 0x00a1b0,
    tealBright: 0x8ff0f8
  };

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.45, 6.4);
  camera.lookAt(0, 0.35, 0);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

  // ===== Materiais =====
  function matBody(c) { return new THREE.MeshStandardMaterial({ color: c || COL.body, metalness: 0.65, roughness: 0.42 }); }
  function matSteel() { return new THREE.MeshStandardMaterial({ color: COL.steel, metalness: 0.8, roughness: 0.35 }); }
  function matGlow(c) { return new THREE.MeshStandardMaterial({ color: 0x061012, emissive: c, emissiveIntensity: 1.4, metalness: 0.3, roughness: 0.3 }); }

  var robot = new THREE.Group();

  function box(w, h, d, m, x, y, z) {
    var g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    g.position.set(x || 0, y || 0, z || 0);
    robot.add(g);
    return g;
  }

  // ===== Torso =====
  box(1.9, 1.7, 1.05, matBody(), 0, 0.0, 0);
  box(1.5, 0.5, 0.08, matBody(COL.bodyDark), 0, 0.55, 0.55); // placa peito
  // núcleo reator
  var coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.09, 16, 40), matSteel());
  coreRing.position.set(0, 0.02, 0.55); robot.add(coreRing);
  var core = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 32), matGlow(COL.teal));
  core.position.set(0, 0.02, 0.6); robot.add(core);
  var coreLight = new THREE.PointLight(COL.teal, 1.5, 5);
  coreLight.position.set(0, 0.02, 1.0); robot.add(coreLight);

  // ===== Pescoço =====
  box(0.7, 0.34, 0.7, matSteel(), 0, 1.02, 0);

  // ===== Cabeça (capacete) =====
  var head = new THREE.Group();
  var helmet = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.0, 0.95), matBody());
  head.add(helmet);
  // visor
  var visor = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.3, 0.12), matGlow(COL.teal));
  visor.position.set(0, 0.02, 0.5); head.add(visor);
  var visorHi = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.13), matGlow(COL.tealBright));
  visorHi.position.set(-0.28, 0.06, 0.5); head.add(visorHi);
  // protetores laterais
  var earL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.6, 0.5), matSteel()); earL.position.set(-0.85, 0, 0); head.add(earL);
  var earR = earL.clone(); earR.position.x = 0.85; head.add(earR);
  var dotL = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), matGlow(COL.teal)); dotL.position.set(-0.85, 0, 0.26); head.add(dotL);
  var dotR = dotL.clone(); dotR.position.x = 0.85; head.add(dotR);
  // antena
  var ant = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 12), matSteel()); ant.position.set(0, 0.7, 0); head.add(ant);
  var antTip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), matGlow(COL.teal)); antTip.position.set(0, 0.95, 0); head.add(antTip);
  head.position.set(0, 1.55, 0.02);
  robot.add(head);

  // ===== Ombreiras (pauldrons) =====
  function pauldron(sign) {
    var p = new THREE.Group();
    var m = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.72, 1.15), matBody());
    p.add(m);
    var line = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.09, 0.09), matGlow(COL.teal));
    line.position.set(0, -0.02, 0.6); p.add(line);
    p.position.set(sign * 1.42, 0.62, 0);
    p.rotation.z = sign * -0.18;
    robot.add(p);
  }
  pauldron(-1); pauldron(1);

  // ===== Braços =====
  function arm(sign) {
    var upper = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.05, 0.65), matBody());
    upper.position.set(sign * 1.5, -0.35, 0); robot.add(upper);
    var joint = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), matGlow(COL.teal));
    joint.position.set(sign * 1.5, -0.9, 0.3); robot.add(joint);
  }
  arm(-1); arm(1);

  robot.scale.setScalar(0.82);
  scene.add(robot);

  // ===== Luzes =====
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(3, 4, 5); scene.add(key);
  var rim = new THREE.DirectionalLight(COL.teal, 0.8); rim.position.set(-4, 1, -3); scene.add(rim);
  var fill = new THREE.DirectionalLight(0xbfefff, 0.3); fill.position.set(-2, -1, 3); scene.add(fill);

  // ===== Tamanho / resize =====
  function resize() {
    var s = Math.min(mount.clientWidth, mount.clientHeight) || 320;
    renderer.setSize(s, s, false);
    camera.aspect = 1; camera.updateProjectionMatrix();
    if (reduce) renderer.render(scene, camera);
  }
  window.addEventListener('resize', resize);
  resize();

  // troca o SVG pelo canvas
  mount.classList.add('is-3d');

  // ===== Interação =====
  var targetYaw = 0, targetPitch = 0, curYaw = 0, curPitch = 0;
  if (fine) {
    window.addEventListener('mousemove', function (e) {
      var r = mount.getBoundingClientRect();
      var ax = r.left + r.width / 2, ay = r.top + r.height / 2;
      targetYaw = Math.max(-1, Math.min(1, (e.clientX - ax) / (window.innerWidth * 0.5))) * 0.6;
      targetPitch = Math.max(-1, Math.min(1, (e.clientY - ay) / (window.innerHeight * 0.5))) * 0.35;
    });
    document.addEventListener('mouseleave', function () { targetYaw = 0; targetPitch = 0; });
  }

  if (reduce) {
    // sem animação: renderiza uma pose 3/4 estática
    robot.rotation.y = -0.25; robot.rotation.x = 0.05;
    renderer.render(scene, camera);
    return;
  }

  function loop(t) {
    curYaw += (targetYaw - curYaw) * 0.08;
    curPitch += (targetPitch - curPitch) * 0.08;
    var sway = fine ? Math.sin(t / 1600) * 0.08 : Math.sin(t / 1400) * 0.35; // touch: giro suave sozinho
    robot.rotation.y = curYaw + sway;
    robot.rotation.x = curPitch;
    robot.position.y = Math.sin(t / 900) * 0.06; // flutuação
    core.material.emissiveIntensity = 1.25 + Math.sin(t / 500) * 0.35; // pulso do núcleo
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
