// import * as TWEEN from "https://code.createjs.com/1.0.0/tweenjs.min.js";
let scene, renderer, camera, ground, mapPlane;
let mus, geo, com, ada, park; 
let neoMus, neoGeo, neoCom, neoAda, neoPark; 
var clouds = [];
var mapItems = [];
var offsets = []; 

var showHist =[]; 
var showPark = []; 
var showGeo =[]; 
var showCom =[]; 
var showAda =[]; 
var show = [showHist,showPark, showGeo, showCom, showAda]; 

var replace=[]; 
var eggs=[]; 
let extraImages=[]; 
let startingColor = []; 
let eggTween= []; 
let targetPosition = new THREE.Vector3( 1.5, 1.5, 21.5); 

const canvas = document.getElementById("myCanvas");
const overlay = document.querySelector(".modalOverlay"); 
const popUp = document.querySelectorAll(".popUp"); 
const modelContent = document.querySelectorAll(".modelContent");
const zoomOutBlock = document.querySelectorAll(".zoomOutBlock");
const bottomNav = document.querySelectorAll(".bottomNav"); 
const close = document.getElementById("close"); 

let trigger1=false; 

//CAMERA VARIABLES
const fov = 75;
let camStart = {x:0, y:150, z:0}; 
let camMain = {x:0, y:200, z:0}; 
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
  camera.rotation.x = -90 * (Math.PI / 180);
//DOMEVENTS
 domEvents = new THREEx.DomEvents(camera, renderer.domElement); 
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
}
function watchEvents(domEvents){
  //EGG CLICK TRIGGERS 
  addEggs(); 
  addEggEvents();
  window.addEventListener("resize", onWindowResize, true);
  modelContent.forEach((model, index)=>{
    modelContent[0].addEventListener("scroll", function(event){
    console.log("watching for scrolling");  
    if(modelContent[0].scrollTop >= modelContent[0].scrollHeight -modelContent[0].offsetHeight && trigger1==false){
        trigger1=true; 
        mainHistMap(0); }
    }); })

    //ANIMATE THE EGGS
    jumpEggs();  
}
function addEggs(){
    eggs.forEach((egg, index) => {
        scene.add(egg); 
                });
}
function addEggEvents(){
    eggs.forEach((egg, index)=> {
        domEvents.addEventListener(eggs[index], "click", function(event){
            clickThing(index, index, true);  
        }, false)
      }); 
      eggs.forEach((egg, index)=> {
           startingColor[index] =eggs[index].material.color.getHex()
      }); 
      eggs.forEach((egg, index)=> {
        domEvents.addEventListener(egg, "mouseover", function(event){
            mouseOver(index); 
        }, false); 
      });
      
      eggs.forEach((egg, index)=> {
        domEvents.addEventListener(egg, "mouseout", function(event){
            mouseOut(index); 
        }, false); 
      }); 
}
function removeEggs(){
        eggs.forEach((egg, index) => {
scene.remove(egg); 
        });     
        eggs.forEach((egg, index)=> {
            domEvents.removeEventListener(eggs[index], "click", function(event){
                clickThing(index, index, true);  
            }, false)
          });  
}
function mouseOver(index){
    // console.log("mouse Over"); 
   console.log(index); 
    eggs[index].material.color.setHex(0xCDC2F6); 
    TWEEN.removeAll();
    new TWEEN.Tween(eggs[index].scale )
    .to( new THREE.Vector3(2.2, 2.2, 2.2), 500 )
  .easing( TWEEN.Easing.Cubic.InOut )
  .start();
  }
  function interiorObjOver(index){
    // console.log("mouse Over musuem item");   
    // document. style=("cursor: pointer"); 
  }
  function mouseOut(index){
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
            jumpEggs(); 
  }
function resetPortals(){
  console.log("back to historical"); 
//   console.log(index); 
  zoomOutBlock.forEach((block, index)=> {block.style.display="none"}); 
  modelContent.forEach((block, index)=> {block.style.display="block";block.scrollTop =0;  }); 
trigger1=false; 
}
function returnmainHistMap(index){
    console.log("going back home from an historical object")
    tweenCameraBack(camera, offsets[index], 1500); 
    mainHistMap(index); 
}
function mainHistMap(index, thingsToWatch){
    modelContent[index].style.display="none"; 
    popUp.forEach((popUp, index)=> {
        popUp.style.display = "none";
        bottomNav[index].style.display = "none";
      });
    overlay.style.display ="none"; 
    zoomOutBlock[index].style.display="block"; 
    bottomNav[index].style.display = "flex"; 
    new TWEEN.Tween(mapPlane.material ).to( { opacity: .5 }, 1000 ).start();
    //fade stuff away
    mapItems.forEach(mapItem =>{new TWEEN.Tween(mapItem.material)
        .to( { opacity: 0 }, 1000 ).start();})
    show[index].forEach(mapItem =>{new TWEEN.Tween(mapItem.material)
        .to( { opacity: 1 }, 1000 ).start();})

    //bring the other stuff into view and add some events to them
        show[index].forEach(histMu=>{
            console.log(histMu.position.z); 
            // console.log("this index "+ index)
            let move = new THREE.Vector3(histMu.position.x,histMu.position.y,histMu.position.z + 1)
            console.log(move); 
            new TWEEN.Tween(histMu.position).to(move, 1500)
          .easing(TWEEN.Easing.Quadratic.In).repeat(Infinity).yoyo(true).start()
              domEvents.addEventListener(histMu, "mouseover",function(event){
            interiorObjOver(index); 
        });
    })
        show[index].forEach((histMus, i)=>{
        domEvents.addEventListener(histMus, "click",function(event){
            console.log(histMus); 
            console.log(i); 
            clickThing(i+5, index)
        });  })
}
function clickThing(index, eggIndex, clickedMainEgg){
    // TWEEN.removeAll();
    // modelContent.forEach((model, index)=>{ modelContent[index].scrollTop =0}); 
    clearModal(true); 
    if(clickedMainEgg){
        resetPortals(); 
        removeEggs();
        //add a scroll listener to that portal 
            modelContent[eggIndex].addEventListener("scroll", function(event){
            // console.log("watching for scrolling");  
            if(modelContent[eggIndex].scrollTop >= modelContent[eggIndex].scrollHeight -modelContent[eggIndex].offsetHeight && trigger1==false){
                trigger1=true; 
                mainHistMap(eggIndex); }
            });
    scene.add(replace[eggIndex]);   
        let position = new THREE.Vector3(offsets[index].x, offsets[index].y, offsets[index].z); 
        goToClicked(camera,position, 3500, index);  
     }
     else{
        // console.log("subEgg");  
        zoomOutBlock[eggIndex].style.display="none"; 
        let position = new THREE.Vector3(mapItems[index].position.x+offsets[index].x, mapItems[index].position.y+offsets[index].y, mapItems[index].position.z+offsets[index].z); 
        goToClicked(camera,position, 3500, index );   
  }
}
function goToClicked(camera, position, duration, index ) {   
  new TWEEN.Tween(mapPlane.material ).to( { opacity: .5 }, 1000 ).start();
  new TWEEN.Tween(camera.position).to({
    x: position.x, y: position.y , z:position.z 
  }, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .onComplete(() =>{
    overlay.style.display ="block"; 
    popUp[index].style.display = "block"; 
    bottomNav[index].style.display = "flex"; 
    close.style.display = "block"; 
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
  mapPlane.material.opacity = 1;
  extraImages.forEach((extraImage)=>{extraImage.material.opacity =0}); 
  mapItems.forEach((mapItem)=>{mapItem.material.opacity =1}); 
  modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
    popUp.forEach((popUp, index)=> {
    popUp.style.display = "none";
    bottomNav[index].style.display = "none";
    });
    close.style.display = "none"; 
}
function clearPopUp(){
resetPortals(); 
replace.forEach(replace=>{scene.remove(replace);})
addEggs(); 
addEggEvents()
clearModal(false); 
console.log("clearPopUP"); 
overlay.removeEventListener("click", clearPopUp, false); 
tweenCameraBack(camera,camMain, 3000); 
jumpEggs(); 
}
function jumpEggs(){
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
   jumpEggs();  
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
  offsets[0] =  {x: 12, y: 120, z: 23}; 
   let pos0 = {x: 12,  y:5, z:23 }
   let size0 = {x: 15, y: 10}; 
  setUpEgg(0, size0, mus, pos0,musImg); 
  //ADD PARK CUBE
  offsets[1] = {x: -90, y: 120, z: -40}; 
  let pos1 = {x: -90,  y:4, z:-40 }
  let size1 = {x: 15, y: 10}; 
 setUpEgg(1, size1, park, pos1,musImg);
 
//EXTRA PARK STUFF
//GEOLOGY 
  offsets[2] =  {x: -45, y: 120, z: -70}; 
  let pos2 = {x: -45,  y:4, z:-70}
  let size2 = {x: 15, y: 10}; 
 setUpEgg(2, size2, geo, pos2,musImg);
//COMMUNITY
    offsets[3] = {x: -30, y: 120, z: -20}; 
    let pos3 = {x: -30,  y:3, z:-20 }
    let size3 = {x: 15, y: 10}; 
   setUpEgg(3, size3, com, pos3,musImg);
//ADAPTIVE 
   offsets[4] = {x: -140, y: 120, z: 10}; 
    let pos4 = {x: -140,  y:3, z:10 }
    let size4 = {x: 15, y: 10}; 
   setUpEgg(4, size4, ada, pos4,musImg);
  //ADD TORPOEDO house CUBE
  const geometry3 = new THREE.BoxBufferGeometry();
  var boxMat3 = new THREE.MeshStandardMaterial({ color: 0x1292af });
  nhTrig = new THREE.Mesh(geometry3, boxMat3);
  mapItems[5] = nhTrig;
  showHist[0]= nhTrig; 
  scene.add(nhTrig);
  nhTrig.position.set(80, 0, -65);
  nhTrig.scale.set(5, 5, 5);
  offsets[5] = {x: 0, y: 40, z: 0}; 
  //ADD light house
  const geometry6 = new THREE.BoxBufferGeometry();
  var boxMat6 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  lightHouseTrig = new THREE.Mesh(geometry6, boxMat6);
  mapItems[6] =  lightHouseTrig;
  showHist[1]= lightHouseTrig; 
  scene.add(lightHouseTrig);
  lightHouseTrig.position.set(145, 0, 5);
  lightHouseTrig.scale.set(5, 5, 5);
  offsets[6] = {x: 2, y: 40, z: 2}; 
  //Nimitz House
      const geometry7 = new THREE.BoxBufferGeometry();
      var boxMat7 = new THREE.MeshStandardMaterial({ color: 0x1292af });
      lqTrig = new THREE.Mesh(geometry7, boxMat7);
      mapItems[7] = lqTrig;
      showHist[2]= lqTrig; 
      scene.add(lqTrig);
      lqTrig.position.set(80, 0, -25);
      lqTrig.scale.set(5, 5, 5);
      offsets[7] = {x: 0, y: 40, z: 0}; 
  //ADD building 2
  const geometry4 = new THREE.BoxBufferGeometry();
  var boxMat4 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  buil2Trig = new THREE.Mesh(geometry4, boxMat4);
  mapItems[8] = buil2Trig;
  showHist[3]= buil2Trig; 
  scene.add(buil2Trig);
  buil2Trig.position.set(15, 0, -10);
  buil2Trig.scale.set(5, 5, 5);
  offsets[8] = {x: 2, y: 40, z: 2}; 
    //ADD building 3
    const geometry5 = new THREE.BoxBufferGeometry();
    var boxMat5 = new THREE.MeshStandardMaterial({ color: 0x1292af});
    buil3Trig = new THREE.Mesh(geometry5, boxMat5);
    mapItems[9] =  buil3Trig;
    showHist[4]= buil3Trig; 
    scene.add(buil3Trig);
    buil3Trig.position.set(15, 0, -30);
    buil3Trig.scale.set(5, 5, 5);
    offsets[9] = {x: 2, y: 40, z: 2}; 
    //ADD New Museum
    let neoMuspos= {x:12,y: 5,z: 23};
    let neoMussize = {x: 15, y: 10}; 
    replacementEgg(0, neoMussize, neoMus, neoMuspos, musImg,0, 5, 10 )
    //Add park replacement
    // let neoParkpos= {x:12,y: 5,z: 23};
    let neoParksize = {x: 15, y: 10}; 
    replacementEgg(1, neoParksize, neoPark, pos1 , musImg,1, 0, 11 )
}
function setUpEgg(index, size, name, pos, texture){
  name = new THREE.Mesh(new THREE.PlaneGeometry(size.x, size.y), new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
  }));
  name.rotation.x = -90 * (Math.PI / 180);
  name.position.y = 3;
  offsets[10] = {x: 2, y: 40, z: 2}; 
  scene.add(name);
  name.position.set(pos.x, pos.y, pos.z);
  mapItems[index] = name;
  eggs[index] = name; 
}
function replacementEgg(index, size, name, pos, texture, showIndex, showsubindex, mapIndex){
    name = new THREE.Mesh(new THREE.PlaneGeometry(size.x, size.y), new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
    }));
    name.rotation.x = -90 * (Math.PI / 180);
    name.position.y = 3;
    name.scale.set(2.2, 2.2, 2.2);
    name.position.set(pos.x, pos.y, pos.z);
    show[showIndex][showsubindex]= name; 
    replace[index] = name; 
    mapItems[mapIndex]= name; 
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
