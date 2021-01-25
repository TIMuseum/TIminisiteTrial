// import * as TWEEN from "https://code.createjs.com/1.0.0/tweenjs.min.js";
let scene, renderer, camera, controls, musTrig, lakeTrig;
var clouds = [];
var cubes = [];

//canvas ans field of view
const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");
const popUp = document.querySelectorAll(".popUp"); 
let overlay = document.querySelector(".modalOverlay"); 


const fov = 75;
overlay.addEventListener("click", function(){
  overlay.style = "visibility:hidden"; 
 clearPopUp(); 
})
window.onbeforeunload = function () {
  console.log("loading"); 
}
window.addEventListener("load", init);
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
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  //SCENE
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0015);

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    fov,
    canvas.clientWidth / canvas.clientHeight,
    1,
    10000
  );
  camera.lookAt(scene.position);
  camera.position.set(0, 1500, 0);

  //DOMEVENTS
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement); 

  //CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.minDistance = 5;
  controls.maxDistance = 2000;

  //LIGHTS
  var hemLight = new THREE.HemisphereLight(0xffffbb, 0x0808dd, 1);
  scene.add(hemLight);

  
  //CLOUDS
  clouds = makeClouds(); 
//TEXTURE LOADER
const map = new THREE.TextureLoader().load("/media/map@2x.png");
const water = new THREE.TextureLoader().load("/media/water.jpg");

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
  ground.position.y = -5;
  scene.add(ground);

  //MAP PLANE
  var planeGeometry = new THREE.PlaneGeometry(200, 300);
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
  musTrig.position.set(-23, 0, 26);
  musTrig.scale.set(5, 5, 5);
  renderer.render(scene, camera);

  //ADD LAKE CUBE
  const geometry2 = new THREE.BoxBufferGeometry();
  var boxMat2 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  lakeTrig = new THREE.Mesh(geometry2, boxMat2);
  cubes[1] = lakeTrig;
  scene.add(lakeTrig);
  lakeTrig.position.set(-30, 0, -100);
  lakeTrig.scale.set(5, 5, 5);

//ADD Nizche house CUBE
const geometry3 = new THREE.BoxBufferGeometry();
var boxMat3 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
nhTrig = new THREE.Mesh(geometry3, boxMat3);
cubes[2] = lakeTrig;
scene.add(nhTrig);
nhTrig.position.set(50, 0, 80);
nhTrig.scale.set(5, 5, 5);

  //animate camera
cameraBegin(camera); 

 //ALL EVENT LISTENERS 
  domEvents.addEventListener(ground, 'click', function(event){
    clearPopUp(); 
    }); 
  domEvents.addEventListener(musTrig, "click", function(event){
    const offset = {x: 10, y: 70, z: 50}; 
    clickEgg(musTrig, offset, 0); 
}); 
domEvents.addEventListener(lakeTrig, "click", function(event){
  const offset = {x: -80, y: 70, z: 0}; 
  clickEgg(lakeTrig, offset, 1); 
}); 



domEvents.addEventListener(musTrig, "mouseover", function(event){
musTrig.material.emissive.setHex( 0xFFFF00);
})
domEvents.addEventListener(musTrig, 'mouseout', function(event){
musTrig.material.emissive.setHex( 0xFF0000);
}); 

  window.addEventListener("resize", onWindowResize, false);
  animate();
}


function animate(time) {
  lakeTrig.rotation.y += 0.01;
  musTrig.rotation.x += 0.01;
  nhTrig.rotation.z +=0.01; 
  controls.update();

  camera.lookAt(scene.position);
  camera.updateMatrixWorld();
  TWEEN.update(time); 
  //KEEP RUNNING THESE FUNCTIONS

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


function onWindowResize() {
  const width =  window.innerWidth; 
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function clickEgg(clicked, offset, index){
  //TWEEN TO LOCATION/ ZOOM
  clearPopUp(); 
  const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
    var tween = new TWEEN.Tween(coords)
    .to({ x: clicked.position.x+offset.x, y: clicked.position.y + offset.y, z:clicked.position.z + offset.z })
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() =>{
      camera.position.set(coords.x, coords.y, coords.z)
      // console.log("updated camera " + "camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
    })
    .start();
//Change color and popup style
    clicked.material.color.set(0xff0000); 

    popUp[index].style.display = "block"; 
    overlay.style = 'visibility: visible';
    // overlay.classList.toggle("show"); 
    console.log(overlay); 
  

}

function clearPopUp(){
  popUp.forEach((popUp, index)=> {
    popUp.style.display = "none";}); 
}

function makeClouds(){
  const cloud = new THREE.TextureLoader().load("/media/cloud.png");
  for (let i = 0; i < 200; i++) {
    const object = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloud }));
    object.rotation.x = -90 * (Math.PI / 180);

    object.position.x =
      Math.random() * canvas.clientWidth  - 0.5 * canvas.clientWidth;
      //height up 
    object.position.y = Math.random() * 800 + 600;
    object.position.z = Math.random() *  canvas.clientHeight -  .5 * canvas.clientHeight;

    object.scale.x = Math.random() * 300 + 300;
    object.scale.y = object.scale.x - Math.random() * 100 + 50;
    object.scale.z = Math.random() * 100 + 50;
    clouds[i] = object;
    scene.add(object);
  }
  return clouds; 
}

function cameraBegin(camera){
  const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  // console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  var tween = new TWEEN.Tween(coords)
  .to({x: 0, y: 300 , z:0}, 2500)
  .delay(1000) 
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(() =>{
    camera.position.set(camera.position.x, coords.y, camera.position.z);
    // console.log("updated camera " + "camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  })
  .start();
}