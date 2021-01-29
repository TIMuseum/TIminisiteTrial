let scene, renderer, camera, controls, musTrig, parkTrig, ground, mapPlane;
let mus, geo, com, ada, park; 
var clouds = [];
var mapItems = [];
var offsets = []; 
var eggs=[]; 

const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");

const fov = 40;
let  camStart = {x:0, y:450, z:0}; 
// let camMain = {x:0, y:250, z:150}; 

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
  
  //CAMERA
  camera = new THREE.PerspectiveCamera(
    fov,
    canvas.clientWidth / canvas.clientHeight,
    1,
    20000
  );
  camera.position.set(camStart.x, camStart.y, camStart.z);
  
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
//   setUpCubes(); 
  makeGround(); 
  markers(); 
  camera.lookAt(mapPlane.position);

  //ANIMATE CAMER INTO SCENE
//   cameraBegin(camera); 
const domEvents = new THREEx.DomEvents(camera, renderer.domElement); 
  window.addEventListener("resize", onWindowResize, true);

  domEvents.addEventListener(mus, "click", function(event){
    clickEgg(mus, offsets[0], 0); 
  }); 
  domEvents.addEventListener(park, "click", function(event){
    clickEgg(park, offsets[1], 1); 
  }); 
 

animate();
}//

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
        // depthWrite: false,
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
      mapPlane.position.set(100, 0, 150); 
      mapPlane.rotation.x = -90 * (Math.PI / 180);
      scene.add(mapPlane);
    
    }
    function animate(time) {

        camera.updateMatrixWorld();
        TWEEN.update(time); 
        // camera.lookAt(scene.position);
        //KEEP RUNNING THESE FUNCTIONS
      
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
      }
function markers(){
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

//ADD PARK CUBE
const musImg = new THREE.TextureLoader().load("/media/museum.png");
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
  mus.position.set(75, 5, 180);
  mapItems[0] = mus;
  offsets[0] =  {x: -40, y: 100, z: +20}; 

park = new THREE.Sprite(new THREE.SpriteMaterial({ map: musImg, trasparent: true,   }));
// park.rotation.x = -90 * (Math.PI / 180);
  eggs[1] = park; 
  scene.add(park);
  mapItems[1] = park;
  park.scale.set(30, 15,30); 
  park.position.set(60, 4, 40);
  offsets[1] = {x: -65, y: 175, z: -40}; 
      }

      function onWindowResize() {
        const width =  window.innerWidth; 
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        console.log("cam X " + camera.position.x + " cam Y " + camera.position.y + " cam z " + camera.position.z); 
        console.log(" cam X rotation " + camera.rotation.x ); 
      }
 

      function clickEgg(clicked, offset, index){
        //TWEEN TO LOCATION/ ZOOM
        // clearModal(); 
        let moveTO = new THREE.Vector3(clicked.position.x + offset.x, clicked.position.y + offset.y, clicked.position.z + offset.z,  )  
        camera.lookAt(clicked);
        tweenCamera(camera,moveTO, 3500, clicked ); 
      
        //   overlay.style.display ="block"; 
        //   popUp[index].style.display = "block"; 
        //   modelContent.forEach((modelContent)=>{modelContent.scrollTop = 0}); 
        //   overlay.addEventListener("click", clearPopUp, false); 
      }
      
      function tweenCamera(camera, position, duration, object) {   
      // backup original rotation

        new TWEEN.Tween(camera.position).to({
          x: position.x, y: position.y , z:position.z 
        }, duration)
        // .easing(TWEEN.Linear.None)
         .onUpdate(function(){
          // camera.position.set(position.x, position.y, camera.position.z);
        //   camera.lookAt(object.position)
              })
              .onComplete(function() {
                // camera.lookAt(object.position)
                // console.log(camera.position)
            })
        .start();
        // camera.rotation.x = -90 * (Math.PI / 180);
        console.log(camera.position)
      }