
let scene, renderer, camera, controls, musTrig, lakeTrig;
var clouds = [];
var cubes = [];

//canvas ans field of view
const canvas = document.getElementById("myCanvas");
const canvasContainer = document.getElementById("CC");
const popUp = document.getElementById("popUp");
const fov = 75;

//main funtion begins on load of webpage
function init() {
    console.log("loading everything"); 
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
  // scene.background = new THREE.Color( 0xefd1b5 );
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

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

  //TEXTURE LOADER
  const map = new THREE.TextureLoader().load("/media/solo_map.png");
  const cloud = new THREE.TextureLoader().load("/media/cloud.png");
  const water = new THREE.TextureLoader().load("/media/water.jpg");

  //CLOUDS
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
  renderer.render(scene, camera);


  //ADD LAKE CUBE
  const geometry2 = new THREE.BoxBufferGeometry();
  var boxMat2 = new THREE.MeshStandardMaterial({ color: 0xf3ffe2 });
  lakeTrig = new THREE.Mesh(geometry2, boxMat2);
  cubes[1] = lakeTrig;
  scene.add(lakeTrig);
  lakeTrig.position.set(-50, 10, 0);
  lakeTrig.scale.set(8, 8, 8);


  domEvents.addEventListener(musTrig, "click", function(event){

    musTrig.material.color.set(0xff0000); 
    var text = document.createElement('p'); 
    var node = document.createTextNode("You just clicked the museum trigger"); 
    text.appendChild(node); 
    canvas.appendChild(text); 
    popUp.appendChild(text); 
    text.id = "addedTxt"; 
    console.log(text); 
    // lakeTrig.material.color.set(0xff0000); 
}); 
domEvents.addEventListener(musTrig, "mouseover", function(event){
musTrig.material.emissive.setHex( 0xFFFF00);
})
domEvents.addEventListener(musTrig, 'mouseout', function(event){
musTrig.material.emissive.setHex( 0xFF0000);
}); 

  // window.addEventListener("resize", onWindowResize, false);

  animate();
}
window.addEventListener("load", init);


function animate() {
  //museum trigger
  lakeTrig.rotation.y += 0.01;
  musTrig.rotation.x += 0.01;
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();

  //KEEP RUNNING THESE FUNCTIONS
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


function onWindowResize() {
  const width =  window.innerWidth; 
  height = canvas.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
