// import * as TWEEN from "https://code.createjs.com/1.0.0/tweenjs.min.js";
let scene, renderer, camera, controls, musTrig, parkTrig, ground, mapPlane;
let mus, geo, com, ada, park; 
var clouds = [];
var mapItems = [];
var offsets = []; 
var eggs=[]; 
let extraImages=[]; 
let startingColor = []; 
let eggTween= []; 
let stopTween =false; 
let targetPosition = new THREE.Vector3( 1.5, 1.5, 21.5); 

const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");
const popUp = document.querySelectorAll(".popUp"); 
let overlay = document.querySelector(".modalOverlay"); 
let modelContent = document.querySelectorAll(".modalContent");
let parkBlock = document.querySelectorAll(".parkContent"); 
parkBlock[0].style.display="inline-block"; 
let parkButtons = document.querySelectorAll(".parkTransitions"); 
parkButtons[0].style.display="inline-block"; 
const closeBtn = document.getElementById("close-button"); 

let amountScroll = 0; 
const scrollMaxPres = 3500; 


//CAMERA VARIABLES
const fov = 75;
let  camStart = {x:0, y:250, z:0}; 
let camMain = {x:0, y:250, z:0}; 
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
      parkBlock[0].style.displ
        clickEgg(eggs[index], offsets[index], index); 
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
        console.log(eggs[index].scale);
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
    popUp[0].onwheel = scrollHistorical;   
    //ANIMATE THE EGGS
    tweenEggs();  
}
function selectedEgg(){
  //tween one hover and clicked eggs 
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
function scrollHistorical(event){
    if(amountScroll >= scrollMaxPres){
      amountScroll = scrollMaxPres; 
      // console.log("max"); 
      // popUp[0].style.color ='#F9ECDC';
      clearModal(true); 
      clickEgg(nhTrig, offsets[5], 5, true); 
      amountScroll =0; 
    }
    else if(amountScroll <4000 && amountScroll> 0){
      // popUp[0].style.color ='#89CBAB';
    }
   
    else if(amountScroll <=0){
      amountScroll = 0; 
      // console.log("min"); 
      // popUp[0].style.color ='#B13929';
    }
    // console.log("amount Scroll " + amountScroll); 
    amountScroll+=event.deltaY; 
    // console.log(event.deltaY); 
  }
  function clickBack(index, event){
    // stopTween=true; 
    TWEEN.removeAll();
    clickEgg(mapItems[index], offsets[index], index, true); 
  }
function showParks1(){
    let position = new THREE.Vector3(0, 200, 0); 
    parkBlock[0].style.display="none"; 
    parkButtons[0].style.display="none"; 
    parkButtons[1].style.display="inline-block"; 
    //MAKE OVERLAY NOT VISIBLE BUT PRESENT
    parkTween(camera, position, 2000); 
}
function showParks2(){
  parkBlock[1].style.display="inline-block"; 
  parkButtons[1].style.display="none"; 
    parkButtons[2].style.display="inline-block"; 
}
function parkTween(camera, position, duration) {    
    let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  var tween3 = new TWEEN.Tween(camera.position)
  .to({x:position.x, y: position.y, z: position.z}, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .onComplete(() =>{
console.log(parkAdd1.material.opacity); 

      new TWEEN.Tween(parkAdd1.material ).to( { opacity:1 }, 1000 ).onComplete(function(){
          parkAdd1.material.opacity = 1; 
          console.log(parkAdd1.material.opacity); 
      }).start();
      new TWEEN.Tween(mapPlane.material ).to( { opacity: .5 }, 1000 ).start();
    
    })
  .start();
  // parkAdd1.material.opacity = 1; 
  }
function clickEgg(clicked, offset, index, clear){
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
  tweenCamera(camera,moveTO, 3500, clicked, index );  
}

function tweenCamera(camera, position, duration, object, index) {   
  TWEEN.removeAll();
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
}
function tweenCameraBack(camera, position, duration) {    
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
  modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    popUp.forEach((popUp, index)=> {
      popUp.style.display = "none";
    }); 
    amountScroll = 0; 
}
function clearPopUp(){
 clearModal(false)
 console.log("clear popups" )
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
  nhTrig.position.set(85, 0, -35);
  nhTrig.scale.set(5, 5, 5);
  offsets[5] = {x: 0, y: 40, z: 0}; 

  //ADD building 2
  const geometry4 = new THREE.BoxBufferGeometry();
  var boxMat4 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  buil2Trig = new THREE.Mesh(geometry4, boxMat4);
  mapItems[6] = buil2Trig;
  scene.add(buil2Trig);
  buil2Trig.position.set(15, 0, -10);
  buil2Trig.scale.set(5, 5, 5);
  offsets[6] = {x: 2, y: 40, z: 2}; 

    //ADD building 3
    const geometry5 = new THREE.BoxBufferGeometry();
    var boxMat5 = new THREE.MeshStandardMaterial({ color: 0x1292af});
    buil3Trig = new THREE.Mesh(geometry5, boxMat5);
    mapItems[7] =  buil3Trig;
    scene.add(buil3Trig);
    buil3Trig.position.set(15, 0, -30);
    buil3Trig.scale.set(5, 5, 5);
    offsets[7] = {x: 2, y: 40, z: 2}; 

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

    // ground2 = new THREE.Mesh(planeGeometry, planeMaterial);
    // ground2.rotation.x = -90 * (Math.PI / 180);
    // // ground2.position.x = -50;
    // scene.add(ground2);
// }

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
