import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";

let scene, renderer, camera, controls, cube, sprite1, cameraStart;
let theta = 0;
const radius = 100;

const canvas = document.getElementById("myCanvas");
const fov = 75;

console.log(canvas);

window.addEventListener("load", init);
canvas.addEventListener("mouseenter", add);

function add() {
  console.log("helloooooo");
}

function init() {
  //renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0xefd1b5, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //scene
  scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xefd1b5 );
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
  // scene.fog(0xffffff, 5, 50);

  
  //camera

  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.set(0, 600, 250);
  camera.lookAt(scene.position);

  //controls
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

  //ADD BOX
  const geometry = new THREE.BoxBufferGeometry();
  var material = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.z = -2;

  //texture loader
  const map = new THREE.TextureLoader().load("/media/solo_map.png");
  const cloud = new THREE.TextureLoader().load("/media/cloud.png");
  const water = new THREE.TextureLoader().load("/media/water.jpg");

  //CLOUD
  sprite1 = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloud }));
  sprite1.position.set(-20, 4, 5);
  sprite1.scale.set(20, 15, 1);
  sprite1.rotation.x = -90 * (Math.PI / 180);
  scene.add(sprite1);

  //BACKGROUND PLANE
  var planeGeometry = new THREE.PlaneGeometry(4000, 4000, 100, 100);
  var planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffbb , map: water, transparecy: true, opacity: .6});
  var ground = new THREE.Mesh(planeGeometry, planeMaterial);
  ground.rotation.x = -90 * (Math.PI / 180);
  ground.position.y = -100;
  scene.add(ground);

  //MAP PLANE
  var planeGeometry = new THREE.PlaneGeometry(300, 200);
  var planeMaterial = new THREE.MeshStandardMaterial({
    map: map,
    transparent: true,
  });
  var ground = new THREE.Mesh(planeGeometry, planeMaterial);
  ground.rotation.x = -90 * (Math.PI / 180);
  ground.position.y = -50;
  scene.add(ground);

  window.addEventListener("resize", onWindowResize, false);
  animate();
}
function animate() {
  camera.position.x= -.1; 
  camera.lookAt( scene.position );
camera.updateMatrixWorld();

theta += 0.1;

camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
camera.lookAt( scene.position );

camera.updateMatrixWorld();


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
