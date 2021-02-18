// import { Vector3 } from "./three.module";

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
var inScene=[false, false, false, false, false]; 
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
const close = document.querySelector(".closeContainer"); 
const title = document.querySelectorAll(".titleBlock");
const mainBlock1 = document.querySelectorAll(".mainBlock1");

// const mainBlock10 = document.querySelector(".mainBlock1");
const mainBlock2 = document.querySelectorAll(".mainBlock2");
const mainBLock3 = document.querySelectorAll(".mainBlock3");
const faders = document.querySelectorAll(".fadeIn");
const ends = document.querySelectorAll(".endSect"); 
// const sliders = document.querySelectorAll(".slideIn");

// modelContent[eggIndex].addEventListener("scroll", function(event){
  //SCROLL TO THE BOTTOM
  // if(modelContent[eggIndex].scrollTop >= modelContent[eggIndex].scrollHeight -modelContent[eggIndex].offsetHeight && trigger1==false){
  //     trigger1=true;
  //     mainHistMap(eggIndex); 
  //   }
  // }); 
  const endOptions = {
    root: null, //viewport is the window you are looking for 
    threshold: 1,
    rootMrgin: "0px ",  //how much of this is on the page, value 1 to 0   //150 pulls yoru root margin in by 150px
    //can set four values for rootMargin
  }; 
  const sideOptions = {
    root: null, //viewport is the window you are looking for 
    threshold: .70,
    rootMrgin: "-200px ",  //how much of this is on the page, value 1 to 0   //150 pulls yoru root margin in by 150px
    //can set four values for rootMargin
  }; 
  const sideScrollers = document.querySelectorAll(".sideScroller");
  let delta = 0.; 
  let hasListener = false; 
const sideCont = document.querySelectorAll(".scrollCont"); 

    const sideScroll = new IntersectionObserver
    (function(entries, sideScroll){
      entries.forEach((entry, i)=>{
        let thisCont = sideCont[parseInt(entry.target.id)]; 
        if(entry.isIntersecting ){
          console.log("your intersecting a scroller"); 
          thisCont.addEventListener("mousewheel", sideScrollImg); 
          hasListener = true; 
          }
           else if(!entry.isIntersecting){
       console.log("notin scroller"); 
       if (hasListener) {
         console.log("you are not intersecting anymore but the box has an event listener");
      //    hasListener =false; 
       }
       else{return}
        }
      })
    }, sideOptions); 
    
    sideScrollers.forEach(sidesc=>{
      sideScroll.observe(sidesc); 
    })
let hitRight = false; 
 function sideScrollImg (event){
    if (!event.deltaY) {
      return;
    }
    let scrolluntil= -1*(this.offsetWidth- (window.innerWidth*.80)); 
    // console.log(this.offsetWidth); 
    // console.log("scrollUnit " + scrolluntil); 
    // console.log("delta" + delta); 
    if(scrolluntil>delta && hitRight ==false){
      console.log("FINISH"); 
      // this.style = "background:black; "
      this.removeEventListener("mousewheel", sideScrollImg); 
      hitRight = true; 
      this.style.transform = `translate3d(${scrolluntil}px,0, 0px)`;
      delta=scrolluntil; 
      return
    }
   this.style.transform = `translate3d(${-event.deltaY +delta}px,0, 0px)`;
   delta+=-event.deltaY
   event.preventDefault();
   if (delta >0){
    // this.style = "background:none; "
    this.style.transform = `translate3d(0px,0, 0px)`;
    delta =0; 
    hitRight = false; 
    this.removeEventListener("mousewheel", sideScrollImg);
   }
  }


const endScroll = new IntersectionObserver
(function(entries, endScroll){
  entries.forEach((entry, i)=>{
    if(!entry.isIntersecting){
      trigger1=false;
      return
    }
    else{ 
      if(trigger1 ==false){
        console.log('go to new interface')
        console.log(parseInt(entry.target.id)); 
        mainHistMap(parseInt(entry.target.id)); 
      }
    }
  })
}, endOptions);  
ends.forEach(end=>{
  endScroll.observe(end); 
})
const options = {
  root: null, //viewport is the window you are looking for 
  threshold: 0, //how much of this is on the page, value 1 to 0 
  rootMrgin: "-150px ",  //150 pulls yoru root margin in by 150px
  //can set four values for rootMargin
}; 
const appearOptions ={
threshold: .85,
rootMargin: "0px 0px -50px 0px"
}; 
const appearOnScroll = new IntersectionObserver
(function(entries, appearOnScroll){
  entries.forEach((entry, i)=>{
    if(!entry.isIntersecting){
      if(entry){ entry.target.classList.remove('appear'); }
     
      return
    }
    else{
      entry.target.classList.add('appear'); 
    }
  })
}, appearOptions); 

faders.forEach(fader=>{
  appearOnScroll.observe(fader); 
})

const backGroundIn = new IntersectionObserver
(function(entries, backGroundIn){
  entries.forEach((entry, i)=>{
    if(!entry.isIntersecting){
      
      if(popUp[parseInt(entry.target.id)]){ popUp[parseInt(entry.target.id)].classList.remove('background'); }
      return
    }
    else{
      console.log(parseInt(entry.target.id)); 
      popUp[parseInt(entry.target.id)].classList.add('background'); 
 
    }
  })
}, options); 

const bodies = document.querySelectorAll(".body"); 
bodies.forEach((body, index)=>{
  backGroundIn.observe(body); 
})


let trigger1=false; 

//CAMERA VARIABLES
const fov = 75;
let camStart = {x:0, y:140, z:0}; 
let camMain = {x:0, y:115, z:0}; 
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
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0020);

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
	// Add light

  
//DOMEVENTS
 domEvents = new THREEx.DomEvents(camera, renderer.domElement); 
  //LIGHTS
  var hemLight = new THREE.HemisphereLight(0xFFFFFF, 0x0808dd, 1);
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
  addEggs(); 
  window.addEventListener("resize", onWindowResize, true);
  //ANIMATE THE EGGS
  jumpEggs();  
}
function addEggs(){
  eggs.forEach((egg, index) => {
    if(inScene[index]==false){
      scene.add(egg); 
      egg.position.y =10; 
      domEvents.addEventListener(eggs[index], "click", function(event){
        clickThing(index, index, true);  
    }, false)
    startingColor[index] =egg.material.color.getHex(); 
    domEvents.addEventListener(egg, "mouseover", function(event){
      mouseOver(index); 
  }, false); 
  domEvents.addEventListener(egg, "mouseout", function(event){
    mouseOut(index); 
}, false); 
    inScene[index]=true; 
    }
    });  
}

function removeEggs(){
eggs.forEach((egg, index) => {
  new TWEEN.Tween(egg.material ).to( { opacity: 0 }, 1000 ).onComplete(()=>{
    // egg.position = (10, 100, 10); 
    // console.log(egg); 
    scene.remove(egg);}).start();
if(inScene[index]){
  domEvents.removeEventListener(eggs[index], "click", function(event){
  clickThing(index, index, true);  
}, false); 
domEvents.removeEventListener(egg, "mouseover", function(event){
  mouseOver(index); 
}, false); 
domEvents.removeEventListener(egg, "mouseout", function(event){
mouseOut(index); 
}, false); 
  inScene[index]=false; 
}

  });     
}
function mouseOver(index){
   
    TWEEN.remove(eggTween[index]); 
    new TWEEN.Tween(eggs[index].scale )
    .to( new THREE.Vector3(1.3, 1.3, 1.3), 500 )
  .easing(TWEEN.Easing.Cubic.InOut)
  .onComplete(()=>
  {  
    // eggs[index].material.color.setHex(0xCDC2F6); 
    TWEEN.remove(eggTween[index]) })
  .start();
  }
  function interiorObjOver(index){
  }
  function mouseOut(index){
        // console.log("mouseOut"); 
          // console.log(eggs[index].scale); 
          new TWEEN.Tween(eggs[index].scale )
          .to( new THREE.Vector3(1, 1, 1), 500 )
        .easing( TWEEN.Easing.Cubic.InOut )
        .onComplete(()=>{
          // eggs[index].material.color.setHex(startingColor[index]); 
          TWEEN.add(eggTween[index]); 
        })
        .start();       
  }
function resetPortals(){
  // console.log("back to historical"); 
 

  zoomOutBlock.forEach(block=> {block.style.display="none"}); 
  modelContent.forEach(model=> {
    model.style.display="block";
    model.scrollTop =0;
    model.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
console.log("scorllign back up here") 
 }); 
    domEvents.removeEventListener(showHist[5], "click",function(event){
        clickThing(i+5, index)
    });
    trigger1=true; 
    sideCont.forEach(scrollCont=>{
      scrollCont.style.transform = `translate3d(0px,0, 0px)`;
      delta =0; 
    })
}
function returnmainHistMap(index){
    // console.log("going back home from an historical object")
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
    // close.classList.remove("fadeAway")
  
    bottomNav[index].style.display = "flex"; 
  
    //fade stuff away
    mapItems.forEach(mapItem =>{new TWEEN.Tween(mapItem.material)
        .to( { opacity: 0 }, 1000 ).start();})

      
    show[index].forEach(mapItem =>{new TWEEN.Tween(mapItem.material)
        .to( { opacity: 1 }, 1000 ).onComplete(()=>  {
          // close.classList.remove("fadeAway")
          //  close.classList.add("fadeIn")
          //  close.classList.add("appear")
      
        }).start();})
          
     


    //bring the other stuff into view and add some events to them
        show[index].forEach(histMu=>{
            console.log(histMu.position.z); 
            let move = new THREE.Vector3(histMu.position.x,histMu.position.y,histMu.position.z + 2)
            // console.log(move); 
            new TWEEN.Tween(histMu.position).to(move, 1500)
          .easing(TWEEN.Easing.Quadratic.In).repeat(Infinity).yoyo(true).start()
              domEvents.addEventListener(histMu, "mouseover",function(event){
            interiorObjOver(index); 
        });
    })
        show[index].forEach((histMus, i)=>{
        domEvents.addEventListener(histMus, "click",function(event){
            // console.log(histMus); 
            // console.log(i); 
            clickThing(i+5, index)
        });  })
}

function clickThing(index, eggIndex, clickedMainEgg){
    // TWEEN.removeAll();
    clearModal(); 
   
    if(clickedMainEgg){
      eggs[index].material.color.setHex(startingColor[index]); 
      // console.log(index); 
        resetPortals(); 
        removeEggs();
        // console.log(eggs[index]); 
        //add a scroll listener to that portal 
  //  console.log(modelContent[eggIndex]); 
  

        let position = new THREE.Vector3(offsets[index].x, offsets[index].y, offsets[index].z); 
        goToClicked(camera,position, 3500, index);  
     }
     else{
        zoomOutBlock[eggIndex].style.display="none"; 
        let position = new THREE.Vector3(mapItems[index].position.x+offsets[index].x, mapItems[index].position.y+offsets[index].y, mapItems[index].position.z+offsets[index].z); 
        goToClicked(camera,position, 3500, index );   
  }
}
// function transformScrolll(event){
//   if (!event.deltaY) {
//     return;
//   }

//   event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
//   event.preventDefault();
// }
function goToClicked(camera, position, duration, index ) {   
  new TWEEN.Tween(mapPlane.material ).to( { opacity: .5 }, 1000 ).start();
  new TWEEN.Tween(camera.position).to({
    x: position.x, y: position.y , z:position.z 
  }, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .onComplete(() =>{
   
    overlay.addEventListener("click", clearPopUp, false);  
    if(index<5){
      
      new TWEEN.Tween(replace[index].material ).to( { opacity: 1 }, 1500 ).onComplete(()=>{
        overlay.style.display ="block"; 
        popUp[index].style.display = "block"; 
        bottomNav[index].style.display = "flex"; 
        close.style.display = "block"; 
        modelContent.forEach(modelContent=>{modelContent.scrollTo({top:0, behaviour:'auto'})}); 
      }).start(); 
      console.log(showHist[2].position.y); 
      let vec3 = new THREE.Vector3(showHist[2].position.x-5,showHist[2].position.y+10, showHist[2].position.z )
      new TWEEN.Tween(showHist[2].position).to(vec3, 1000).easing(TWEEN.Easing.Quadratic.In).start()

      let vec4 = new THREE.Vector3(showHist[3].position.x,showHist[3].position.y+10, showHist[3].position.z )
      new TWEEN.Tween(showHist[3].position).to(vec4, 1000).easing(TWEEN.Easing.Quadratic.In).start()

      let vec5 = new THREE.Vector3(showHist[4].position.x,showHist[4].position.y+10, showHist[4].position.z )
      new TWEEN.Tween(showHist[4].position).to(vec5, 1000).easing(TWEEN.Easing.Quadratic.In).start()

      let vec6 = new THREE.Vector3(showHist[0].position.x-5,showHist[0].position.y+10, showHist[0].position.z )
      new TWEEN.Tween(showHist[0].position).to(vec6, 1000).easing(TWEEN.Easing.Quadratic.In).start()

      let vec7 = new THREE.Vector3(showHist[1].position.x-5,showHist[1].position.y+10, showHist[1].position.z )
      new TWEEN.Tween(showHist[1].position).to(vec7, 1000).easing(TWEEN.Easing.Quadratic.In).start()
                 
    }   
    else{
      overlay.style.display ="block"; 
        popUp[index].style.display = "block"; 
        bottomNav[index].style.display = "flex"; 
        close.style.display = "block"; 
        modelContent.forEach(modelContent=>{  modelContent.scrollTo({top:0, behaviour:'auto'})}); 
      
    }

  })
  .start();
  modelContent.forEach(modelContent=>{  modelContent.scrollTo({top:0, behaviour:'auto'})}); 
}
function tweenCameraBack(camera, position, duration) {    
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  var tween2 = new TWEEN.Tween(camera.position)
  .to({x:position.x, y: position.y, z: position.z}, 1500)
  .easing(TWEEN.Easing.Quadratic.In)
  .start();
}
function clearModal(){
  overlay.style.display ="none"; 
  extraImages.forEach(extraImage=>{extraImage.material.opacity =0}); 
  modelContent.forEach(modelContent=>{  modelContent.scrollTo({top:0, behaviour:'auto'})}); 
    popUp.forEach((popUp, index)=> {
    popUp.style.display = "none";
    // modelContent[index].display = "none";
    bottomNav[index].style.display = "none";
    });
    TWEEN.removeAll();
}
function clearPopUp(){
  clearModal(); 
  resetPortals(); 
  new TWEEN.Tween(showHist[1].position).to({
    x: showHist[1].position.x, y: showHist[1].position.y-10, z:showHist[1].position.z}, 1500).easing(TWEEN.Easing.Quadratic.In).start()

    new TWEEN.Tween(showHist[2].position).to({
      x: showHist[2].position.x+5, y: showHist[2].position.y-10, z:showHist[2].position.z}, 1500).easing(TWEEN.Easing.Quadratic.In).start()
      new TWEEN.Tween(showHist[3].position).to({
        x: showHist[3].position.x, y: showHist[3].position.y-10, z:showHist[3].position.z}, 1500).easing(TWEEN.Easing.Quadratic.In).start()
        new TWEEN.Tween(showHist[4].position).to({
          x: showHist[4].position.x, y: showHist[4].position.y-10, z:showHist[4].position.z}, 1500).easing(TWEEN.Easing.Quadratic.In).start()
          new TWEEN.Tween(showHist[0].position).to({
            x: showHist[0].position.x+5, y: showHist[0].position.y-10, z:showHist[0].position.z}, 1500).easing(TWEEN.Easing.Quadratic.In).start()
  // mapPlane.material.opacity = 1;
  console.log("take away hidden class"); 
  // hide[0].classList.remove("show"); 
  // hide[0].classList.add("hidden"); 

replace.forEach(replace=>{
  console.log(replace); 
  // scene.remove(replace); 
  new TWEEN.Tween(replace.material ).to( { opacity: 0 }, 500 ).onComplete(replace=> {scene.remove(replace)}).start();
 ;})
 new TWEEN.Tween(mapPlane.material ).to( { opacity: 1 }, 1000 ).start();
 mapItems.forEach((mapItem, index)=>{
if(index<10){
  new TWEEN.Tween(mapItem.material ).to( { opacity: 1 }, 1500 ).start();
}
 })
 
close.style.display = "none"; 
console.log("clearPopUP"); 
overlay.removeEventListener("click", clearPopUp, false); 
tweenCameraBack(camera,camMain, 3000); 
addEggs(); 
jumpEggs(); 
}
function jumpEggs(){
    // console.log("tweening eggs again")
    let jump= []; 
    jump[0] = -1; 
    jump[1] = .8; 
    jump[2] = -.9; 
    jump[3] = 1.2; 
    jump[4] = -1.2; 
   
    eggs.forEach((egg, index)=> {

      let move = new THREE.Vector3(egg.position.x,egg.position.y,egg.position.z + jump[index])
            // console.log(move); 
            eggTween[index] =  new TWEEN.Tween(egg.position).to(move, 800)
          .easing(TWEEN.Easing.Quadratic.InOut).repeat(Infinity).yoyo(true).start() 
     }); 
    //  let move = new THREE.Vector3(eggs[0].position.x,eggs[0].position.y,eggs[0].position.z - 1)
    //  eggTween[0] =  new TWEEN.Tween(eggs[0].position).to(move, 800)
    //  .easing(TWEEN.Easing.Quadratic.InOut).repeat(Infinity).yoyo(true).start()
  }
function cameraBegin(camera){
  document.querySelector(".titleText").classList.add("fadeAway"); 
  let coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  var tween = new TWEEN.Tween(coords)
  .to({x:camMain.x, y:camMain.y, z:camMain.z}, 4500)
  .delay(1000) 
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate(() =>{
    camera.position.set(camera.position.x, coords.y, camera.position.z);
    camera.lookAt(scene.position)
  })
  .onComplete(() =>{
    document.querySelector(".titleText").classList.add("disappear"); 
    clouds.forEach(cloud=>{scene.remove(cloud)}); 
   jumpEggs();  
  })
  .start();
}
function makeClouds(){
  const cloud = new THREE.TextureLoader().load("/media/cloud.png");
  for (let i = 0; i < 300; i++) {
    const object = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloud }));
    object.rotation.x = -90 * (Math.PI / 180);
    object.position.x =
      Math.random() * canvas.clientWidth  - 0.5 * canvas.clientWidth;
      //height up 
    object.position.y = Math.random() * 800 + 200;
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
// const water = new THREE.TextureLoader().load("/media/water.jpg");
const textureLoader = new THREE.TextureLoader()
const musImg = textureLoader.load("/media/building1.png");
const palmTree = textureLoader.load("/media/PALMTREE.png");
const community = textureLoader.load("/media/Community.png");
const wetland= textureLoader.load("/media/WETLAND.png");
const crane = textureLoader.load("/media/CRANE.png");
//ADD MUSUEM CUBE
  offsets[0] =  {x: 50, y: 105, z: -10}; 
   let pos0 = {x: 15,  y:5, z:27 }
   let size0 = {x: 30, y: 20}; 
  setUpEgg(0, size0, mus, pos0,musImg); 
  //ADD PARK CUBE
  offsets[1] = {x: -125, y: 105, z: 8}; 
  let pos1 = {x: -120,  y:9, z:0 }
  let size1 = {x: 15, y: 30}; 
 setUpEgg(1, size1, park, pos1,palmTree);
//GEOLOGY 
  offsets[2] =  {x: -25, y: 105, z: -35}; 
  let pos2 = {x: 15,  y:10, z:-40}
  let size2 = {x: 25, y: 25}; 
 setUpEgg(2, size2, geo, pos2,crane);
//COMMUNITY
    offsets[3] = {x: -40, y: 105, z: -5}; 
    let pos3 = {x: -40,  y:10, z:-15}
    let size3 = {x: 37, y: 22}; 
   setUpEgg(3, size3, com, pos3,community);
//ADAPTIVE 
   offsets[4] = {x: -87, y: 105, z: -28}; 
    let pos4 = {x: -87,  y:10, z:-25 }
    let size4 = {x: 30, y: 20}; 
   setUpEgg(4, size4, ada, pos4,wetland);
  //ADD TORPOEDO house CUBE
  const geometry3 = new THREE.BoxBufferGeometry();
  var boxMat3 = new THREE.MeshStandardMaterial({ color: 0x1292af });
  nhTrig = new THREE.Mesh(geometry3, boxMat3);
  mapItems[5] = nhTrig;
  showHist[0]= nhTrig; 
  scene.add(nhTrig);
  nhTrig.position.set(90, -10, -40);
  nhTrig.scale.set(5, 5, 5);
  offsets[5] = {x: 0, y: 40, z: 0}; 
  //ADD light house
  const geometry6 = new THREE.BoxBufferGeometry();
  var boxMat6 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  lightHouseTrig = new THREE.Mesh(geometry6, boxMat6);
  mapItems[6] =  lightHouseTrig;
  showHist[1]= lightHouseTrig; 
  scene.add(lightHouseTrig);
  lightHouseTrig.position.set(135, -10, 10);
  lightHouseTrig.scale.set(5, 5, 5);
  offsets[6] = {x: 2, y: 40, z: 2}; 
  //Nimitz House
  const geometry7 = new THREE.BoxBufferGeometry();
  var boxMat7 = new THREE.MeshStandardMaterial({ color: 0x1292af });
  lqTrig = new THREE.Mesh(geometry7, boxMat7);
  mapItems[7] = lqTrig;
  showHist[2]= lqTrig; 
  scene.add(lqTrig);
  lqTrig.position.set(88, -10, -10);
  lqTrig.scale.set(5, 5, 5);
  offsets[7] = {x: 0, y: 40, z: 0}; 
  //ADD building 2
  const geometry4 = new THREE.BoxBufferGeometry();
  var boxMat4 = new THREE.MeshStandardMaterial({ color: 0x1292af});
  buil2Trig = new THREE.Mesh(geometry4, boxMat4);
  mapItems[8] = buil2Trig;
  showHist[3]= buil2Trig; 
  scene.add(buil2Trig);
  buil2Trig.position.set(15, -10, 0);
  buil2Trig.scale.set(5, 5, 5);
  offsets[8] = {x: 2, y: 40, z: 0}; 
    //ADD building 3
    const geometry5 = new THREE.BoxBufferGeometry();
    var boxMat5 = new THREE.MeshStandardMaterial({ color: 0x1292af});
    buil3Trig = new THREE.Mesh(geometry5, boxMat5);
    mapItems[9] =  buil3Trig;
    showHist[4]= buil3Trig; 
    scene.add(buil3Trig);
    buil3Trig.position.set(15, -10, -18);
    buil3Trig.scale.set(5, 5, 5);
    offsets[9] = {x: 2, y: 40, z: -18}; 
    //ADD New Museum
    let neoMussize = {x: 14, y: 9}; 
    let neoMuspos = {x: 17,  y:8, z:25}; 
    offsets[10] = {x: 1, y: 40, z: 3}; 
    replacementEgg(0, neoMussize, neoMus, neoMuspos, musImg,0, 5, 10 )
    //Add park replacement
    // let neoParkpos= {x:15,y: 5,z: 23};
    // let neoParksize = {x: 15, y: 10}; 
    // replacementEgg(1, neoParksize, neoPark, neoMuspos , musImg,1, 0, 11 )
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
      opacity: 0,
    }));
    name.rotation.x = -90 * (Math.PI / 180);
    name.position.y = 3;
    name.scale.set(2.2, 2.2, 2.2);
    name.position.set(pos.x, pos.y, pos.z);
    show[showIndex][showsubindex]= name; 
    replace[index] = name; 
    mapItems[mapIndex]= name; 
    scene.add(name); 
  }
function makeGround(){
//WATER + GROUND
  // const water = new THREE.TextureLoader().load("/media/water.jpg");
    // WATER PLANE
    // var planeGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    // var planeMaterial = new THREE.MeshStandardMaterial({
    //   // color: 0xffffbb,
    //   // map: water,
    //   transparecy: true,
    //   side: THREE.DoubleSide,
    //   depthWrite: true,
    //   opacity: 0.6,
    // });
    // ground = new THREE.Mesh(planeGeometry, planeMaterial);
    // ground.rotation.x = -90 * (Math.PI / 180);
    // ground.position.y = -5;
    // scene.add(ground);
    var planeGeometry2 = new THREE.PlaneGeometry(5000, 5000, 100, 100);
    var planeMaterial2= new THREE.MeshStandardMaterial({
      color: 0x1292af,
      // map: water,
      transparecy: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      opacity: 1,
    });
     ground1 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    ground1.rotation.x = -90 * (Math.PI / 180);
    ground1.position.y = -40;
    scene.add(ground1);

const map = new THREE.TextureLoader().load("/media/mapTexture.png");
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

  requestAnimationFrame(animate);
  TWEEN.update(time); 
  renderer.render(scene, camera);
//   controls.update();
//   controls.handleResize();
}
