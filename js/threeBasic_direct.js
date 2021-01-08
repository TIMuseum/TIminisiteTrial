

let scene, renderer, camera, controls, cube, enter;
enter=false; 
const canvas = document.getElementById("myCanvas");
const fov = 75;
console.log(canvas); 

window.addEventListener("load", init);
canvas.addEventListener("mouseenter", add); 

function add(){
    console.log("helloooooo"); 

}
function init() {
  //scene

  scene = new THREE.Scene();

  //renderer
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true });
  renderer.setClearColor(0x333333);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  //camera
  camera = new THREE.PerspectiveCamera(fov,window.innerWidth / window.innerHeight,1,1000);
  camera.position.z = 2;

  //LIGHTS
 //general environment lighting
//  var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//  scene.add(ambientLight);

 var pointLight = new THREE.PointLight(0xffffff, 0.5);
 pointLight.posiiton = 2; 
 scene.add(pointLight);

 var hemLight = new THREE.HemisphereLight(0xffffbb, 0x0808dd, 1); 
 scene.add(hemLight); 


  //ADD BOX
      const geometry = new THREE.BoxBufferGeometry();
      var material = new THREE.MeshStandardMaterial({color: 0xF3FFE2})
       cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      cube.position.z = -2;
      enter=true;

   //GROUND PLANE 
   var planeGeometry = new THREE.PlaneGeometry(10000, 10000, 100, 100);
   var planeMaterial = new THREE.MeshStandardMaterial();
   var ground = new THREE.Mesh(planeGeometry, planeMaterial);
   ground.rotation.x = -90 * (Math.PI / 180);
   ground.position.y = -100;
   scene.add(ground);


window.addEventListener( 'resize', onWindowResize, false );

animate();


}
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

function onWindowResize() {
  width = window.innerWidth,
    height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
