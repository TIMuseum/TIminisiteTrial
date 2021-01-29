// import * as TWEEN from "https://code.createjs.com/1.0.0/tweenjs.min.js";
let scene, renderer, camera, controls, musTrig, parkTrig, ground, mapPlane;
let mus, geo, com, ada, park; 
var clouds = [];
var mapItems = [];
var offsets = []; 
var eggs=[]; 
let extraImages=[]; 
let startingColor = []; 

const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");
const popUp = document.querySelectorAll(".popUp"); 
let overlay = document.querySelector(".modalOverlay"); 
let modelContent = document.querySelectorAll(".modalContent");

let amountScroll = 0; 
const scrollMaxPres = 3500; 

//CAMERA VARIABLES
const fov = 75;
let  camStart = {x:0, y:250, z:0}; 
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
  camera.position.set(camStart.x, camStart.y, camStart.z);

//DOMEVENTS
const domEvents = new THREEx.DomEvents(camera, renderer.domElement); 
  //CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.minDistance = -200;
  controls.maxDistance = 3000;
  //LIGHTS
  var hemLight = new THREE.HemisphereLight(0xffffbb, 0x0808dd, 1);
  scene.add(hemLight); 

  //ADD STUFF TO THE SCEENE
  clouds = makeClouds(); 
  setUpCubes(); 
  makeGround(); 

  //ANIMATE CAMERA INTO SCENE
//   cameraBegin(camera); 
 //ALL EVENT LISTENERS 
 watchEvents(domEvents); 
  animate();
}//end of setup

function watchEvents(domEvents){
  //EGG CLICK TRIGGERS 
  eggs.forEach((egg, index)=> {
    domEvents.addEventListener(eggs[index], "click", function(event){
        clickEgg(eggs[index], offsets[index], index); 
      }); 
  }); 
  eggs.forEach((egg, index)=> {
       startingColor[index] =eggs[index].material.color.getHex()
  }); 
  eggs.forEach((egg, index)=> {
    domEvents.addEventListener(eggs[index], "mouseover", function(event){
        eggs[index].material.color.setHex(0xFF0000); 
      }); 
  }); 
  eggs.forEach((egg, index)=> {
    domEvents.addEventListener(eggs[index], "mouseout", function(event){
        eggs[index].material.color.setHex(startingColor[index]); 
      }); 
  }); 
  window.addEventListener("resize", onWindowResize, true);
    //scrolling effect that switches museum to torpedo
    popUp[0].onwheel = scrollHistorical; 
}
function scrollHistorical(event){
    if(amountScroll >= scrollMaxPres){
      amountScroll = scrollMaxPres; 
      console.log("max"); 
      popUp[0].style.color ='#F9ECDC';
      clearModal(); 
      clickEgg(nhTrig, offsets[5], 5); 
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

  function clickBack(index, event){
    console.log("back to museum!")
    clickEgg(mapItems[index], offsets[index], index); 
  }

function showParks(){
    let position = new THREE.Vector3(-50, 150, 0); 
    parkTween(camera, position, 2000); 
    
    // mus.position.set(-23, 5, 26);
    // mapItems[0] = mus;
    // offsets[0] =  {x: 10, y: 50, z: 50}; 
}
function parkTween(camera, position, duration) {    
    let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    // console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  var tween3 = new TWEEN.Tween(camera.position)
  .to({x:position.x, y: position.y, z: position.z}, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .onComplete(() =>{
      scene.add(parkAdd1);})
  .start();
  
  }
function clickEgg(clicked, offset, index){
  //TWEEN TO LOCATION/ ZOOM
  clearModal(); 
  let moveTO = new THREE.Vector3(clicked.position.x + offset.x, clicked.position.y + offset.y, clicked.position.z + offset.z)  
  tweenCamera(camera,moveTO, 3500, clicked, index );
    
}

function tweenCamera(camera, position, duration, object, index) {   

  new TWEEN.Tween(camera.position).to({
    x: position.x, y: position.y , z:position.z 
  }, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .onComplete(() =>{
    overlay.style.display ="block"; 
    popUp[index].style.display = "block"; 
    modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    overlay.addEventListener("click", clearPopUp, false);  
  })
  .start();
  console.log(camera.position)
}
function tweenCameraBack(camera, position, duration) {    
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  // console.log("camera x " + coords.x + " camera y " + coords.y + " camera z " + coords.z); 
  var tween2 = new TWEEN.Tween(camera.position)
  .to({x:position.x, y: position.y, z: position.z}, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .start();

}
function clearModal(){
  overlay.style.display ="none"; 
  console.log("you exited a modal"); 
scene.remove(extraImages[0]); 
  extraImages.forEach((extraImage)=>{scene.remove(extraImage)}); 
  modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    popUp.forEach((popUp, index)=> {
      popUp.style.display = "none";
    }); 
    amountScroll = 0; 
}
function clearPopUp(){
 clearModal()
  overlay.removeEventListener("click", clearPopUp, false); 
  console.log("preTween position " + camera.position.x + " y " + camera.position.y + " z" + camera.position.z); 
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
const water = new THREE.TextureLoader().load("/media/water.jpg");
const musImg = new THREE.TextureLoader().load("/media/museum.png");
    //ADD MUSUEM CUBE
  var musGeometry = new THREE.PlaneGeometry(15, 10);
  var musMaterial = new THREE.MeshStandardMaterial({
    map: musImg,
    transparent: true,
  });
  mus = new THREE.Mesh(musGeometry, musMaterial);
  eggs[0] = mus; 
  mus.rotation.x = -90 * (Math.PI / 180);
  mus.position.y = 3;
  scene.add(mus);
  mus.position.set(-23, 5, 26);
  mapItems[0] = mus;
  offsets[0] =  {x: 5, y: 50, z: 4}; 

  //ADD PARK CUBE
  park = new THREE.Sprite(new THREE.SpriteMaterial({alphaMap: mapPlane, map: musImg, trasparent: true,  side: THREE.DoubleSide,depthWrite: true }));
// park.rotation.x = -90 * (Math.PI / 180);
  eggs[1] = park; 
  scene.add(park);
  mapItems[1] = park;
  park.scale.set(20, 10,20); 
  park.position.set(-30, 4, -100);
  offsets[1] = {x: 5, y: 50, z: 5}; 
//Extra park stuff
const wilds = new THREE.TextureLoader().load("/media/wilds.png");
    var parkP = new THREE.PlaneGeometry(15, 10);
    var parkM = new THREE.MeshStandardMaterial({  map: wilds, transparent: true});
  parkAdd1 = new THREE.Mesh(parkP,parkM);
  parkAdd1.rotation.x = -90 * (Math.PI / 180);
  parkAdd1.position.y = 1;
  parkAdd1.scale.set(5, 5,5); 
  extraImages[0] = parkAdd1
//GEOLOGY 
  var geoGeometry = new THREE.PlaneGeometry(15, 10);
  var geoMaterial = new THREE.MeshStandardMaterial({
    map: musImg,
    transparent: true,
  });
  geo = new THREE.Mesh(geoGeometry, geoMaterial);
  geo.rotation.x = -90 * (Math.PI / 180);
  mus.position.y = 3;
  scene.add(geo);
  geo.position.set(20, 4, -60);
  mapItems[2] = geo;
  offsets[2] =  {x: 30, y: 40, z: -10}; 
  eggs[2] = geo; 


  com = new THREE.Sprite(new THREE.SpriteMaterial({alphaMap: mapPlane, map: musImg, trasparent: true,  side: THREE.DoubleSide,depthWrite: true }));
  eggs[3] =com; 
  mapItems[3] = com;
  scene.add(com);
  com.scale.set(20, 10,20); 
  com.position.set(-20, 3, -60);
  offsets[3] = {x: 5, y: 50, z: 5}; 

//ADAPTIVE 
    ada = new THREE.Sprite(new THREE.SpriteMaterial({ map: musImg, trasparent: true,   }));
  eggs[4] =ada; 
  mapItems[4] = ada;
  scene.add(ada);
  ada.scale.set(20, 10,20); 
  ada.position.set(-90, 3, -80);
   offsets[4] = {x: 4, y: 50, z: 3}; 


  //ADD TORPOEDO house CUBE
  const geometry3 = new THREE.BoxBufferGeometry();
  var boxMat3 = new THREE.MeshStandardMaterial({ color: 0x1292af });
  nhTrig = new THREE.Mesh(geometry3, boxMat3);
  mapItems[5] = nhTrig;
  scene.add(nhTrig);
  nhTrig.position.set(50, 0, 80);
  nhTrig.scale.set(5, 5, 5);
  offsets[5] = {x: 0, y: 40, z: 0}; 

  //ADD building 2
  const geometry4 = new THREE.BoxBufferGeometry();
  var boxMat4 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  buil2Trig = new THREE.Mesh(geometry4, boxMat4);
  mapItems[6] = buil2Trig;
  scene.add(buil2Trig);
  buil2Trig.position.set(5, 0, 15);
  buil2Trig.scale.set(5, 5, 5);
  offsets[6] = {x: 2, y: 40, z: 2}; 

    //ADD building 3
    const geometry5 = new THREE.BoxBufferGeometry();
    var boxMat5 = new THREE.MeshStandardMaterial({ color: 0x1292af});
    buil3Trig = new THREE.Mesh(geometry5, boxMat5);
    mapItems[7] =  buil3Trig;
    scene.add(buil3Trig);
    buil3Trig.position.set(25, 0, 5);
    buil3Trig.scale.set(5, 5, 5);
    offsets[7] = {x: 2, y: 40, z: 2}; 


    //MARKER CUBES 
// 0,0
const geo2 = new THREE.BoxBufferGeometry();
var mat2 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
cube1 = new THREE.Mesh(geo2, mat2);
scene.add(cube1);
cube1.position.set(0, 0, 0);
cube1.scale.set(8, 8, 8);

//X 100
const geo3 = new THREE.BoxBufferGeometry();
var mat3 = new THREE.MeshStandardMaterial({ color: 0xffffff });
cube2 = new THREE.Mesh(geo3, mat3);
scene.add(cube2);
cube2.position.set(100, 0, 0);
cube2.scale.set(8, 8, 8);

//Y 100
const geo4 = new THREE.BoxBufferGeometry();
var mat4 = new THREE.MeshStandardMaterial({ color: 0xffffff });
cube3 = new THREE.Mesh(geo4, mat4);
scene.add(cube3);
cube3.position.set(0, 0, 100);
cube3.scale.set(8, 8, 8);

//X -100
const geo5 = new THREE.BoxBufferGeometry();
var mat5 = new THREE.MeshStandardMaterial({ color: 0xffffff });
cube5 = new THREE.Mesh(geo5, mat5);
scene.add(cube5);
cube5.position.set(-100, 0, 0);
cube5.scale.set(8, 8, 8);

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
    side: THREE.DoubleSide,
    depthWrite: false,
    opacity: 0.5,
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
    side: THREE.DoubleSide,
    depthWrite: false
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

  camera.updateMatrixWorld(); 

  requestAnimationFrame(animate);
  TWEEN.update(time); 
  renderer.render(scene, camera);
//   controls.update();
//   controls.handleResize();
}
