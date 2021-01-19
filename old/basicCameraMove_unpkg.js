import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";

let scene, renderer, camera, controls, musTrig, raycaster; 
let clouds= new Array();

//canvas ans field of view
const canvas = document.getElementById("myCanvas");
const fov = 75;

//event listeners 
window.addEventListener("load", init);
canvas.addEventListener("mouseenter", add);

function add() {
  console.log("helloooooo");
}

//main funtion begins on load of webpage 
function init() {
  //RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0xefd1b5, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);


  //SCENE
  scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xefd1b5 );
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.lookAt(scene.position);
  camera.position.set(100, 1000, 1000);

  //CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 500;

  //LIGHTS
  //ENVIRON LIGHT
  //  var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  //  scene.add(ambientLight);

  //  var pointLight = new THREE.PointLight(0xffffff, 0.5);
  //  pointLight.posiiton = 2;
  //  scene.add(pointLight);

  var hemLight = new THREE.HemisphereLight(0xffffbb, 0x0808dd, 1);
  scene.add(hemLight);

  //TEXTURE LOADER
  const map = new THREE.TextureLoader().load("/media/solo_map.png");
  const cloud = new THREE.TextureLoader().load("/media/cloud.png");
  const water = new THREE.TextureLoader().load("/media/water.jpg");

  //CLOUDS
  for (let i = 0; i < 200; i++) {
    const object = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloud }));
    object.rotation.x = -90 * (Math.PI / 180);

    object.position.x = Math.random() * window.innerWidth - 0.5 * window.innerWidth;
    object.position.y = Math.random() * 2000 + 150;
    object.position.z = Math.random() * 800 - 200;

    object.scale.x = Math.random() * 400 + 100;
    object.scale.y = object.scale.x - Math.random() * 100 + 30;
    object.scale.z = Math.random() * 100 + 50;
    clouds[i] = object;
    scene.add(object);
  }

  //WATER PLANE
  var planeGeometry = new THREE.PlaneGeometry(5000, 5000, 100, 100);
  var planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffbb,
    map: water,
    transparecy: true,
    opacity: 0.6,
  });
  var ground = new THREE.Mesh(planeGeometry, planeMaterial);
  ground.rotation.x = -90 * (Math.PI / 180);
  ground.position.y = -50;
  scene.add(ground);

  //MAP PLANE
  var planeGeometry = new THREE.PlaneGeometry(300, 200);
  var planeMaterial = new THREE.MeshStandardMaterial({
    map: map,
    transparent: true,
  });
  var ground = new THREE.Mesh(planeGeometry, planeMaterial);
  ground.rotation.x = -90 * (Math.PI / 180);
  // ground.position.y = -50;
  scene.add(ground);

  //ADD MUSUEM TRIGGER
  const geometry = new THREE.BoxBufferGeometry();
  var musMat = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  musTrig = new THREE.Mesh(geometry, musMat);
  scene.add(musTrig);
  musTrig.position.set(100, 10, 58);
  musTrig.scale.set(8, 8, 8);

  window.addEventListener("resize", onWindowResize, false);
  animate();
}

function animate() {
  //museum trigger
  musTrig.rotation.x += 0.01;

  //CAMERA ANIMATE
  camera.lookAt(scene.position);
  theta += 0.1;
  // camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
  // camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
  // camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
  // camera.lookAt( scene.position );
  camera.updateMatrixWorld();


//KEEP RUNNING THESE FUNCTIONS
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize() {
  const width = window.innerWidth,
    height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
