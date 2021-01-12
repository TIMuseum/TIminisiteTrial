import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";
// https://unpkg.com/three@0.
let scene, renderer, camera, controls, musTrig, lakeTrig;
var clouds = [];
var cubes = [];

//canvas ans field of view
const canvas = document.getElementById("myCanvas");
const fov = 75;
class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
    }
    pick(normalizedPosition, scene, camera) {
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
        this.pickedObject = undefined;
      }

      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(cubes);
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;
        // save its color
        this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
        // set its emissive color to flashing red/yellow
        this.pickedObject.material.emissive.setHex( 0xFFFF00);
      }
    }
  }

const pickPosition= {x: 0, y: 0};
const pickHelper = new PickHelper();;

clearPickPosition();

//event listeners

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
  // scene.fog(0xffffff, 5, 50);

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.lookAt(scene.position);
  camera.position.set(100, 1000, 2000);


  //CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 2000;

  //LIGHTS
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

    object.position.x =
      Math.random() * window.innerWidth - 0.5 * window.innerWidth;
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

  //ADD MUSUEM CUBE
  const geometry = new THREE.BoxBufferGeometry();
  var boxMat = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  musTrig = new THREE.Mesh(geometry, boxMat);
  cubes[0] = musTrig;
  scene.add(musTrig);
  musTrig.position.set(100, 10, 58);
  musTrig.scale.set(8, 8, 8);

  //ADD LAKE CUBE
  const geometry2 = new THREE.BoxBufferGeometry();
  var boxMat2 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  lakeTrig = new THREE.Mesh(geometry2, boxMat2);
  cubes[1] = lakeTrig;
  scene.add(lakeTrig);
  lakeTrig.position.set(-50, 10, 0);
  lakeTrig.scale.set(8, 8, 8);



  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("mouseout", clearPickPosition);
  window.addEventListener("mouseleave", clearPickPosition);
  animate();
}

window.addEventListener("load", init);

function animate() {
  //museum trigger
  lakeTrig.rotation.y += 0.01;
  musTrig.rotation.x += 0.01;
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  //RAYCASTER INTERSECTION
  pickHelper.pick(pickPosition, scene, camera);
  //KEEP RUNNING THESE FUNCTIONS
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    };
  }

  function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
  }

function clearPickPosition() {
  // if the user stops touching the screen we want to stop picking.
  //For now we just pick a value unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  pickPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   console.log("mouse X " + mouse.x)
  pickPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //   console.log("mouse Y " + mouse.y)
}
("");

function onWindowResize() {
  const width = window.innerWidth,
    height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
