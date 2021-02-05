// import * as TWEEN from "https://code.createjs.com/1.0.0/tweenjs.min.js";
let scene, renderer, camera, controls, musTrig, parkTrig, ground, mapPlane;
let mus, geo, com, ada, park; 
var clouds = [];
var mapItems = [];
var fadeMus =[]; 
var histMus =[]; 
var offsets = []; 
var eggs=[]; 
let extraImages=[]; 
let startingColor = []; 
let eggTween= []; 
let targetPosition = new THREE.Vector3( 1.5, 1.5, 21.5); 

const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");
const popUp = document.querySelectorAll(".popUp"); 
let overlay = document.querySelector(".modalOverlay"); 
let modelContent = document.querySelectorAll(".modelContent");


let parkBlock = document.querySelectorAll(".parkContent"); 
parkBlock[0].style.display="inline-block"; 
let parkButtons = document.querySelectorAll(".parkTransitions"); 
parkButtons[0].style.display="inline-block"; 

let muszoomOutBlock = document.getElementById("zoomOutBlock");
let musExploreBtn = document.getElementById('explore'); 
let musBlock = document.getElementById('museumInfo'); 

var modelBlocks = Array.prototype.slice.call(document.querySelectorAll('.modelBlock')); 

let trigger1=false; 

//CAMERA VARIABLES
const fov = 75;
let camStart = {x:0, y:150, z:0}; 
let camMain = {x:0, y:200, z:0}; 
let zoomBack =  new THREE.Vector3(50, 120, 0); 
let domEvents; 

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
 domEvents = new THREEx.DomEvents(camera, renderer.domElement); 
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
  // cameraBegin(camera); 
 //ALL EVENT LISTENERS 
 watchEvents(domEvents); 
  animate();
}//end of setup
function watchEvents(domEvents){
  //EGG CLICK TRIGGERS 
  eggs.forEach((egg, index)=> {
    domEvents.addEventListener(eggs[index], "click", function(event){
      TWEEN.removeAll();
      if(index==0){
        // clickEgg(zoomBack, offset, index, clear, altPopUp); 
        tweenCamera(camera,zoomBack, 3500, mus, 0 );  
        // backToAllHistorical(); 
      }
      else{
        clickEgg(eggs[index], offsets[index], index); 
      }
      }); 
  }); 
  eggs.forEach((egg, index)=> {
       startingColor[index] =eggs[index].material.color.getHex()
  }); 
  eggs.forEach((egg, index)=> {
    domEvents.addEventListener(eggs[index], "mouseover", function(event){
      console.log("mouse Over"); 
        eggs[index].material.color.setHex(0xCDC2F6); 
        TWEEN.removeAll();
        new TWEEN.Tween(eggs[index].scale )
        .to( new THREE.Vector3(2.2, 2.2, 2.2), 500 )
      .easing( TWEEN.Easing.Cubic.InOut )
      .start();
      }); 
  }); 
  eggs.forEach((egg, index)=> {
    domEvents.addEventListener(eggs[index], "mouseout", function(event){
      console.log("mouseOut"); 
        eggs[index].material.color.setHex(startingColor[index]); 
        // console.log(eggs[index].scale);
        new TWEEN.Tween(eggs[index].scale )
        .to( new THREE.Vector3(1, 1, 1), 500 )
      .easing( TWEEN.Easing.Cubic.InOut )
      .start();
      eggs[index].scale.x = 1; 
        eggs[index].scale.y = 1; 
        eggs[index].scale.z= 1; 
          tweenEggs(); 
      }); 
  }); 
  window.addEventListener("resize", onWindowResize, true);
    //scrolling effect that switches museum to torpedo
    console.log(modelContent[0].scrollTop); 

  modelContent[0].addEventListener("scroll", function(event){
  console.log(modelContent[0].scrollTop); 
console.log(modelContent[0].scrollHeight -modelContent[0].offsetHeight); 
if(modelContent[0].scrollTop >= modelContent[0].scrollHeight -modelContent[0].offsetHeight && trigger1==false){
  modelContent[0].style.display= "none"; 
  modelContent[0].scrollTop = 0; 
  trigger1=true; 
  mainHistMap(); 
}
}); 
    //ANIMATE THE EGGS
    // tweenEggs();  
}

function backToAllHistorical(){
  console.log("back to historical"); 
    musExploreBtn.style.display= "none"; 
    modelContent[0].scrollTop =0; 
    popUp[0].scrollTop = 0; 
    modelContent[1].style.display="none"; 
    modelContent[0].style.display="block"; 
    trigger1=false; 
  let onComplete = function(){ 
    modelContent[0].scrollTop =0;
    // TWEEN.removeAll();
    popUp[0].style.display = "block"; 
    musExploreBtn.style.display= "none"; 
    muszoomOutBlock.style.display="none";
  }
    zoomBackTween(camera, zoomBack, 2000,fadeMus, onComplete, false); 
}
function tweenEggs(){
  console.log("tweening eggs again")
  eggs.forEach((egg, index)=> {
    if (eggs[index].scale.x >= 1.4){
      targetPosition = new THREE.Vector3( 1, 1, 1 );
     }
    else{
       targetPosition = new THREE.Vector3( 1.5, 1.5, 1.5 );
    }
    eggTween[index] = new TWEEN.Tween( eggs[index].scale )
     .to( targetPosition, 1500 )
   .repeat( Infinity )
   .yoyo(true)
   .easing( TWEEN.Easing.Cubic.InOut)
   .start();
   }); 
}
function mainHistMap(){
    modelContent[1].style.display="block"; 
    modelContent[0].style.display="none"; 
    // musExploreBtn.style.display= "block"; 
}
function returntoHistorical1(){
    musExploreBtn.style.display= "none"; 
    modelContent[0].scrollTop =0; 
    modelContent[1].style.display="none"; 
    modelContent[0].style.display="block"; 
    trigger1=false; 
  }
function clickBack(index, event, altPopUp){
  if(index ==0){
    returntoHistorical1()
   }
    TWEEN.removeAll();
    modelContent[0].scrollTop =0; 
    musBlock.scrollTop =0; 
    window.scrollTo(0,0); 
    clickEgg(mapItems[index], offsets[index], index, true, altPopUp); 
}
function showParks1(){
    parkBlock[0].style.display="none"; 
    parkButtons[0].style.display="none"; 
    parkButtons[1].style.display="inline-block"; 
    let tihsTween =  new TWEEN.Tween(parkAdd1.material ).to( { opacity:1 }, 1000 ).onComplete(function(){
      parkAdd1.material.opacity = 1; 
      console.log(parkAdd1.material.opacity); 
  })
    zoomBackTween(camera, zoomBack, 2000, mapItems, tihsTween, true ); 
}
function showParks2(){
  parkBlock[1].style.display="inline-block"; 
  parkButtons[1].style.display="none"; 
    parkButtons[2].style.display="inline-block"; 
}
function zoomBackTween(camera, position, duration, fadeOthers,completeFunct, tween) {    
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
var tween3 = new TWEEN.Tween(camera.position)
.to({x:position.x, y: position.y, z: position.z}, 1500)
.easing(TWEEN.Easing.Quadratic.In)
.onComplete(() =>{
    modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    clearModal(false)
    new TWEEN.Tween(mapPlane.material ).to( { opacity: .5 }, 1000 ).start();
    fadeOthers.forEach(fadeOther =>{new TWEEN.Tween(fadeOther.material ).to( { opacity: .5 }, 1000 ).onComplete(() =>{TWEEN.removeAll()}).start();})
    if(tween ==true){completeFunct.start();}
  else{ completeFunct(); }
  })
.start();
}
function clickEgg(clicked, offset, index, clear, altPopUp){
  //TWEEN TO LOCATION/ ZOOM
  clearModal(clear); 
  parkBlock[0].style.display="block";
  //change the appearnace of clicked v not clicked things
clicked.material.color.setHex(startingColor[index]); 
mapItems.forEach((mapItem, index) =>{
  mapItem.scale = new THREE.Vector3(1, 1, 1); 
})
clicked.scale.x =2; 
clicked.scale.y =2; 
clicked.scale.z =2; 
TWEEN.removeAll();
clicked.material.color.setHex(startingColor[index]); 
  let moveTO = new THREE.Vector3(clicked.position.x + offset.x, clicked.position.y + offset.y, clicked.position.z + offset.z)  
  tweenCamera(camera,moveTO, 3500, clicked, index, altPopUp );  
}

function tweenCamera(camera, position, duration, object, index, altPopUp ) {   
  TWEEN.removeAll();
  new TWEEN.Tween(camera.position).to({
    x: position.x, y: position.y , z:position.z 
  }, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .onComplete(() =>{
    overlay.style.display ="block"; 
    if(altPopUp){
      popUp[altPopUp].style.display = "block"; 
    }
    else{
      popUp[index].style.display = "block"; 
    }
    modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    overlay.addEventListener("click", clearPopUp, false);  
  })
  .start();
}
function tweenCameraBack(camera, position, duration) {    
  // modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  var tween2 = new TWEEN.Tween(camera.position)
  .to({x:position.x, y: position.y, z: position.z}, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .start();
}
function clearModal(overlayDisplay){
  if (overlayDisplay==true){
    overlay.style.display ="block"; 
    overlay.style.opacity ="0.001"; 
  }
  else{
    overlay.style.display ="none"; 
  }
  // parkAdd1.material.opacity = 0; 
  mapPlane.material.opacity = 1;
  extraImages.forEach((extraImage)=>{extraImage.material.opacity =0}); 
  modelContent[0].scrollTop = 0; 
  musBlock.scrollTop =0; 
  mapItems.forEach((extraImage)=>{extraImage.material.opacity =1}); 
  modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    popUp.forEach((popUp, index)=> {
      popUp.style.display = "none";
    });
}
function clearPopUp(){
  returntoHistorical1(); 
  modelContent[0].scrollTop =0; 
   clearModal(false); 
 console.log("clear popups" ); 
  overlay.removeEventListener("click", clearPopUp, false); 
  tweenCameraBack(camera,camMain, 3000); 
  //make easter eggs jump again
  tweenEggs(); 
}
function cameraBegin(camera){
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  var tween = new TWEEN.Tween(coords)
  .to({x:camMain.x, y:camMain.y, z:camMain.z}, 2500)
  .delay(1000) 
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(() =>{
    camera.position.set(camera.position.x, coords.y, camera.position.z);
    camera.lookAt(scene.position)
  })
  .onComplete(() =>{
    TWEEN.removeAll();
   tweenEggs();  
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
  offsets[0] =  {x: 5, y: 50, z: 4}; 
   let pos0 = {x: 12,  y:5, z:23 }
   let size0 = {x: 15, y: 10}; 
  setUpEgg(0, size0, mus, pos0,musImg); 
  histMus[0]= mus; 
  //ADD PARK CUBE
  offsets[1] = {x: 5, y: 50, z: 5}; 
  let pos1 = {x: -90,  y:4, z:-40 }
  let size1 = {x: 15, y: 10}; 
 setUpEgg(1, size1, park, pos1,musImg);

//EXTRA PARK STUFF
  const parksImg = new THREE.TextureLoader().load("/media/map_1.png");
  var parkP = new THREE.PlaneGeometry(200, 300);
  var parkM = new THREE.MeshStandardMaterial({ map: parksImg, transparent: true,  
    side: THREE.DoubleSide,
    depthWrite: false, }); 
   
  parkAdd1 = new THREE.Mesh(parkP,parkM);
  parkAdd1.rotation.x = -90 * (Math.PI / 180);
  parkAdd1.position.y = 1;
  // parkAdd1.visible = false; 
  extraImages[0] = parkAdd1
  scene.add(parkAdd1); 
  parkAdd1.material.opacity = 0;
//GEOLOGY 
  offsets[2] =  {x: 10, y: 40, z: -10}; 
  let pos2 = {x: -45,  y:4, z:-70}
  let size2 = {x: 15, y: 10}; 
 setUpEgg(2, size2, geo, pos2,musImg);

//COMMUNITY
    offsets[3] = {x: 5, y: 50, z: 5}; 
    let pos3 = {x: -30,  y:3, z:-20 }
    let size3 = {x: 15, y: 10}; 
   setUpEgg(3, size3, com, pos3,musImg);

//ADAPTIVE 
   offsets[4] = {x: 4, y: 50, z: 3}; 
    let pos4 = {x: -140,  y:3, z:10 }
    let size4 = {x: 15, y: 10}; 
   setUpEgg(4, size4, ada, pos4,musImg);

  //ADD TORPOEDO house CUBE
  const geometry3 = new THREE.BoxBufferGeometry();
  var boxMat3 = new THREE.MeshStandardMaterial({ color: 0x1292af });
  nhTrig = new THREE.Mesh(geometry3, boxMat3);
  mapItems[5] = nhTrig;
  scene.add(nhTrig);
  nhTrig.position.set(80, 0, -65);
  nhTrig.scale.set(5, 5, 5);
  offsets[5] = {x: 0, y: 40, z: 0}; 
  histMus[1]= mus; 

  //ADD light house
  const geometry6 = new THREE.BoxBufferGeometry();
  var boxMat6 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  lightHouseTrig = new THREE.Mesh(geometry6, boxMat6);
  mapItems[6] =  lightHouseTrig;
  scene.add(lightHouseTrig);
  lightHouseTrig.position.set(145, 0, 5);
  lightHouseTrig.scale.set(5, 5, 5);
  offsets[6] = {x: 2, y: 40, z: 2}; 
  histMus[2]= mus; 
  //Nimitz House
      const geometry7 = new THREE.BoxBufferGeometry();
      var boxMat7 = new THREE.MeshStandardMaterial({ color: 0x1292af });
      lqTrig = new THREE.Mesh(geometry7, boxMat7);
      mapItems[7] = lqTrig;
      scene.add(lqTrig);
      lqTrig.position.set(80, 0, -25);
      lqTrig.scale.set(5, 5, 5);
      offsets[7] = {x: 0, y: 40, z: 0}; 
      histMus[3]= mus; 
  //ADD building 2
  const geometry4 = new THREE.BoxBufferGeometry();
  var boxMat4 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  buil2Trig = new THREE.Mesh(geometry4, boxMat4);
  mapItems[8] = buil2Trig;
  scene.add(buil2Trig);
  buil2Trig.position.set(15, 0, -10);
  buil2Trig.scale.set(5, 5, 5);
  offsets[8] = {x: 2, y: 40, z: 2}; 
  histMus[4]= mus; 

    //ADD building 3
    const geometry5 = new THREE.BoxBufferGeometry();
    var boxMat5 = new THREE.MeshStandardMaterial({ color: 0x1292af});
    buil3Trig = new THREE.Mesh(geometry5, boxMat5);
    mapItems[9] =  buil3Trig;
    scene.add(buil3Trig);
    buil3Trig.position.set(15, 0, -30);
    buil3Trig.scale.set(5, 5, 5);
    offsets[9] = {x: 2, y: 40, z: 2}; 
    histMus[3]= mus; 

}
function setUpEgg(index, size, name, pos, texture){
  name = new THREE.Mesh(new THREE.PlaneGeometry(size.x, size.y), new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
  }));
  name.rotation.x = -90 * (Math.PI / 180);
  name.position.y = 3;
  scene.add(name);
  name.position.set(pos.x, pos.y, pos.z);
  mapItems[index] = name;
  eggs[index] = name; 
  if(index!=0){
    fadeMus[index] = name; 
  }
}
function makeGround(){
//WATER + GROUND

  const water = new THREE.TextureLoader().load("/media/water.jpg");
    //WATER PLANE
    var planeGeometry = new THREE.PlaneGeometry(5000, 5000, 100, 100);
    var planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffbb,
      map: water,
      transparecy: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      opacity: 0.5,
    });
    ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.rotation.x = -90 * (Math.PI / 180);
    ground.position.y = -5;
    scene.add(ground);

    ground1 = new THREE.Mesh(planeGeometry, planeMaterial);
    ground1.rotation.x = -90 * (Math.PI / 180);
    ground1.position.y = -20;
    scene.add(ground1);

const map = new THREE.TextureLoader().load("/media/map.png");
  //MAP PLANE
  var planeGeometry = new THREE.PlaneGeometry(300, 150);
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
