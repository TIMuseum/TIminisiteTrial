// import * as TWEEN from "https://code.createjs.com/1.0.0/tweenjs.min.js";
let scene, renderer, camera, controls, musTrig, parkTrig, ground, mapPlane;
var clouds = [];
var mapItems = [];
var offsets = []; 
var eggs=[]; 
//canvas ans field of view
const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");
const popUp = document.querySelectorAll(".popUp"); 
let overlay = document.querySelector(".modalOverlay"); 
let modelContent = document.querySelectorAll(".modalContent");

let amountScroll = 0; 
const scrollMaxPres = 3500; 

//CAMERA VARIABLES
const fov = 75;
let  camStart = {x:0, y:1500, z:0}; 
let camMain = {x:0, y:250, z:0}; 

//START EVERYTHING WHEN LOADED
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
  // camera.position.set(0, 1500, 0);

  camera.position.set(camStart.x, camStart.y, camStart.z);

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

  //CLOUDS + CUBES
  clouds = makeClouds(); 
  setUpCubes(); 
  makeGround(); 

  //ANIMATE CAMER INTO SCENE
  cameraBegin(camera); 

 //ALL EVENT LISTENERS 
 watchEvents(domEvents); 

  animate();
}//end of setup
function watchEvents(domEvents){

  // domEvents.addEventListener(ground, 'click', function(event){clearPopUp()}, false); 
  //EGG CLICK TRIGGERS 
  domEvents.addEventListener(musTrig, "click", function(event){
    clickEgg(musTrig, offsets[0], 0); 
  }); 
  domEvents.addEventListener(parkTrig, "click", function(event){
    clickEgg(parkTrig, offsets[1], 1); 
  }); 
  domEvents.addEventListener(geoTrig, "click", function(event){
    clickEgg(geoTrig, offsets[2], 2); 
  }); 
  domEvents.addEventListener(comTrig, "click", function(event){
    clickEgg(comTrig, offsets[3], 3); 
  }); 
  domEvents.addEventListener(adaTrig, "click", function(event){
    clickEgg(adaTrig, offsets[4], 4); 
  }); 

  //MOUSEOVER EVENTS
  domEvents.addEventListener(musTrig, "mouseover", function(event){
  musTrig.material.emissive.setHex( 0xFFFF00);
  })
  domEvents.addEventListener(musTrig, 'mouseout', function(event){
  musTrig.material.emissive.setHex( 0xFF0000);
  });  
//add something that removes this event listener as well 
  window.addEventListener("resize", onWindowResize, true);

//scrolling effect that switches museum to torpedo
  popUp[0].onwheel = scrollHistorical; 
}


  function clickBack(index, event){
    console.log("back to museum!")

    clickEgg(mapItems[index], offsets[index], index); 
  }


function scrollHistorical(event){
  if(amountScroll >= scrollMaxPres){
    amountScroll = scrollMaxPres; 
    console.log("max"); 
    popUp[0].style.color ='#F9ECDC';
    clearModal(); 
    let offset = {x: 80, y: 20, z: 0};
    clickEgg(nhTrig, offset, 5); 
    amountScroll =0; 
  }
  else if(amountScroll <4000 && amountScroll> 0){
    popUp[0].style.color ='#89CBAB';
  }
 
  else if(amountScroll <=0){
    amountScroll = 0; 
    console.log("min"); 
    popUp[0].style.color ='#B13929';
  }
  // console.log("amount Scroll " + amountScroll); 
  amountScroll+=event.deltaY; 
  // console.log(event.deltaY); 
}

function clickEgg(clicked, offset, index){
  //TWEEN TO LOCATION/ ZOOM
  clearModal(); 
  let moveTO = new THREE.Vector3(clicked.position.x + offset.x, clicked.position.y + offset.y, clicked.position.z + offset.z,  )
    
  tweenCamera(camera,moveTO, 3500 ); 

    overlay.style.display ="block"; 
    popUp[index].style.display = "block"; 

    modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    overlay.addEventListener("click", clearPopUp, false); 
}

function tweenCamera(camera, position, duration) {   

  new TWEEN.Tween(camera.position).to({
    x: position.x, y: position.y , z:position.z 
  }, duration)
  // .easing(TWEEN.Linear.None)
   .onUpdate(function(){
   
    // camera.position.set(position.x, position.y, camera.position.z);
    // camera.lookAt(scene.position)
        })
        .onComplete(function() {
      })
  .start();
  console.log(camera.position)
}
function tweenCameraBack(camera, position, duration) {    
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  // console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  var tween = new TWEEN.Tween(coords)
  .to({x:position.x, y: position.y, z: position.z}, 2500)
  .delay(50) 
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(() =>{
    camera.position.set(coords.x, coords.y, camera.position.z);
    // console.log("updated camera " + "camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
    camera.lookAt(scene.position)
  })
  .start();
  
  // // console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  // var tween = new TWEEN.Tween(coords)
  // .to({x:camMain.x, y:camMain.y, z:camMain.z}, 2500)
  // .delay(1000) 
  // .easing(TWEEN.Easing.Quadratic.In)
  // .onUpdate(() =>{
  //   camera.position.set(camera.position.x, coords.y, coords.z);
  //   // console.log("updated camera " + "camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  //   camera.lookAt(scene.position)
  // })
  // .start();

}
function clearModal(){
  overlay.style.display ="none"; 
  console.log("you exited a modal"); 
  modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    popUp.forEach((popUp, index)=> {
      popUp.style.display = "none";
    }); 
    amountScroll = 0; 
}
function clearPopUp(){
 clearModal()
  overlay.removeEventListener("click", clearPopUp, false); 
  exitEgg();
}
function exitEgg(){
  console.log("preTween position " + camera.position.x + " y " + camera.position.y + " z" + camera.position.z); 
  // console.log(position)
  tweenCameraBack(camera,camMain, 3000); 
  
 
}
function cameraBegin(camera){
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  // console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  var tween = new TWEEN.Tween(coords)
  .to({x:camMain.x, y:camMain.y, z:camMain.z}, 2500)
  .delay(1000) 
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(() =>{
    camera.position.set(camera.position.x, coords.y, camera.position.z);
    // console.log("updated camera " + "camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
    camera.lookAt(scene.position)
  })
  .start();
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

function setUpCubes(){

  //ADD MUSUEM CUBE
  const geometry = new THREE.BoxBufferGeometry();
  var boxMat = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  musTrig = new THREE.Mesh(geometry, boxMat);
  mapItems[0] = musTrig;
  eggs[0]; 
  scene.add(musTrig);
  musTrig.position.set(-23, 0, 26);
  musTrig.scale.set(8, 8, 8);
  renderer.render(scene, camera);
  offsets[0] =  {x: 10, y: 50, z: 50}; 
  //ADD PARK CUBE
  const geometry2 = new THREE.BoxBufferGeometry();
  var boxMat2 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  parkTrig = new THREE.Mesh(geometry2, boxMat2);
  mapItems[1] = parkTrig;
  eggs[1]; 
  scene.add(parkTrig);
  parkTrig.position.set(-30, 0, -100);
  parkTrig.scale.set(8, 8, 8);
  offsets[1] = {x: 20, y: 50, z: 0}; 
//GEOLOGY 
const geo = new THREE.BoxBufferGeometry();
  var mat = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  geoTrig = new THREE.Mesh(geo, mat);
  mapItems[2] = geoTrig;
  eggs[2]; 
  scene.add(geoTrig);
  geoTrig.position.set(20, 0, -60);
  geoTrig.scale.set(8, 8, 8);
  offsets[2] = {x: 20, y: 50, z: 0}; 
//COMMUNITY 
const geo2 = new THREE.BoxBufferGeometry();
  var mat2 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  comTrig = new THREE.Mesh(geo2, mat2);
  mapItems[3] = comTrig;
  eggs[3]; 
  scene.add(comTrig);
  comTrig.position.set(-20, 0, -60);
  comTrig.scale.set(8, 8, 8);
  offsets[3] = {x: 20, y: 50, z: 0}; 

//ADAPTIVE 
const geo3 = new THREE.BoxBufferGeometry();
  var mat3 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  adaTrig = new THREE.Mesh(geo3, mat3);
  mapItems[4] = adaTrig;
  eggs[4];
  scene.add(adaTrig);
  adaTrig.position.set(-90, 0, -80);
  adaTrig.scale.set(8, 8, 8);
  offsets[4] = {x: 20, y: 50, z: 0}; 

  //ADD TORPOEDO house CUBE
  const geometry3 = new THREE.BoxBufferGeometry();
  var boxMat3 = new THREE.MeshStandardMaterial({ color: 0x1292af });
  nhTrig = new THREE.Mesh(geometry3, boxMat3);
  mapItems[5] = nhTrig;
  scene.add(nhTrig);
  nhTrig.position.set(50, 0, 80);
  nhTrig.scale.set(5, 5, 5);
  offsets[5] = {x: 20, y: 50, z: 0}; 

  //ADD building 2
  const geometry4 = new THREE.BoxBufferGeometry();
  var boxMat4 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  buil2Trig = new THREE.Mesh(geometry4, boxMat4);
  mapItems[6] = buil2Trig;
  scene.add(buil2Trig);
  buil2Trig.position.set(5, 0, 15);
  buil2Trig.scale.set(5, 5, 5);
  offsets[6] = {x: 20, y: 50, z: 0}; 

    //ADD building 3
    const geometry5 = new THREE.BoxBufferGeometry();
    var boxMat5 = new THREE.MeshStandardMaterial({ color: 0x1292af});
    buil3Trig = new THREE.Mesh(geometry5, boxMat5);
    mapItems[7] =  buil3Trig;
    scene.add(buil3Trig);
    buil3Trig.position.set(25, 0, 5);
    buil3Trig.scale.set(5, 5, 5);
    offsets[7] = {x: 20, y: 50, z: 0}; 
}

function makeGround(){
//WATER + GROUND
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
  ground = new THREE.Mesh(planeGeometry, planeMaterial);
  ground.rotation.x = -90 * (Math.PI / 180);
  ground.position.y = -5;
  scene.add(ground);

  //MAP PLANE
  var planeGeometry = new THREE.PlaneGeometry(200, 300);
  var planeMaterial = new THREE.MeshStandardMaterial({
    map: map,
    transparent: true,
  });
  mapPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  mapPlane.rotation.x = -90 * (Math.PI / 180);
  scene.add(mapPlane);
}

function onWindowResize() {
  const width =  window.innerWidth; 
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
function animate(time) {
  parkTrig.rotation.y += 0.01;
  musTrig.rotation.y += 0.01;
  geoTrig.rotation.y +=0.01
  comTrig.rotation.y +=0.01
  adaTrig.rotation.y +=0.01

  camera.updateMatrixWorld();
  TWEEN.update(time); 
  // camera.lookAt(scene.position);
  //KEEP RUNNING THESE FUNCTIONS

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}
