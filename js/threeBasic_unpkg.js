// let camera, scene, renderer, cube;

// function init() {
// 	// Init scene
// 	scene = new THREE.Scene();

// 	// Init camera (PerspectiveCamera)
// 	camera = new THREE.PerspectiveCamera(
// 		75,
// 		window.innerWidth / window.innerHeight,
// 		0.1,
// 		1000
// 	);

// 	// Init renderer
// 	renderer = new THREE.WebGLRenderer({ antialias: true });

// 	// Set size (whole window)
// 	renderer.setSize(window.innerWidth, window.innerHeight);

// 	// Render to canvas element
// 	document.body.appendChild(renderer.domElement);

// 	// Init BoxGeometry object (rectangular cuboid)
// 	const geometry = new THREE.BoxGeometry(3, 3, 3);

// 	// Create material with color
// 	const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

// 	// Add texture -
// 	// const texture = new THREE.TextureLoader().load('textures/crate.gif');

// 	// Create material with texture
// 	// const material = new THREE.MeshBasicMaterial({ map: texture });

// 	// Create mesh with geo and material
// 	cube = new THREE.Mesh(geometry, material);
// 	// Add to scene
// 	scene.add(cube);

// 	// Position camera
// 	camera.position.z = 9;
// }

// // Draw the scene every time the screen is refreshed
// function animate() {
// 	requestAnimationFrame(animate);

// 	// Rotate cube (Change values to change speed)
// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render(scene, camera);
// }

// function onWindowResize() {
// 	// Camera frustum aspect ratio
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	// After making changes to aspect
// 	camera.updateProjectionMatrix();
// 	// Reset size
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false);

// init();
// animate();

import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";


  let scene, renderer, camera, controls, cube, sprite1;
 
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
    camera.position.set( 15, 15, 15 );
		camera.lookAt( scene.position );


  //controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; 
  controls.minDistance = 5;
  controls.maxDistance = 500;


    //LIGHTS
   //ENVIRON LIGHT
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
 
  
 

//texture loader
const map = new THREE.TextureLoader().load('/media/solo_map.png' );  
const cloud = new THREE.TextureLoader().load('/media/cloud.png' );  


     //SPRITE
     sprite1 = new THREE.Sprite( new THREE.SpriteMaterial( { map:cloud} ) );
			sprite1.position.set( -20, 4, 5 );
      sprite1.scale.set( 20, 15, 1 );
      sprite1.rotation.x = -90 * (Math.PI / 180);
			scene.add( sprite1 );


    //GROUND PLANE 
     var planeGeometry = new THREE.PlaneGeometry(200,200, 100, 100);
     var planeMaterial = new THREE.MeshStandardMaterial({map: map});
     var ground = new THREE.Mesh(planeGeometry, planeMaterial);
     ground.rotation.x = -90 * (Math.PI / 180);
     ground.position.y = -50;
     scene.add(ground);
  
  
  window.addEventListener( 'resize', onWindowResize, false );
  
  animate();
  
  
  }
  function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update(); 
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }
  
  function onWindowResize() {
    const width = window.innerWidth,
      height = window.innerHeight;
  
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  