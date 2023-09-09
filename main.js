import * as THREE from 'three'
import { LoadGLTFByPath } from '/ModelHelper.js'

let x = 0;
let y = 0;

document.addEventListener("mousemove", function (event) { 
    x = ( event.clientX / window.innerWidth ) * 2 - 1;
    y = - ( event.clientY / window.innerHeight ) * 2 + 1;
   
});

function lerp(a, b, t){
  return a + t * (b - a);
}

//Renderer does the job of rendering the graphics
let renderer = new THREE.WebGLRenderer({
	//Defines the canvas component in the DOM that will be used
	canvas: document.querySelector('#background'),
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 

const scene = new THREE.Scene();

let cameraList = [];

let camera;

// Load the GLTF model
LoadGLTFByPath(scene)
  .then(() => {
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error('Error loading JSON scene:', error);
  });

//retrieve list of all cameras
function retrieveListOfCameras(scene){
  // Get a list of all cameras in the scene
  scene.traverse(function (object) {
    if (object.isCamera) {
      
      cameraList.push(object);
    }
  });

  //Set the camera to the first value in the list of cameras
  camera = cameraList[0];
  camera.fov = 25;
  updateCameraAspect(camera);
  camera.position.z = -10
  // Start the animation loop after the model and cameras are loaded
  animate();
}

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

let openedCredits = false;
let openCredits = -1000;
let goalCredits = -1000;
document.getElementById("hambagaButton").addEventListener('click', function func(){
  openedCredits = !openedCredits;


  if (openedCredits) {
    goalCredits = -1000;
  
  }else{
    goalCredits = 0;
    
  }

})

window.addEventListener('resize', function func(){
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//A method to be run each time a frame is generated
function animate() {
    requestAnimationFrame(animate)

    const d = new Date()
    //camera.position.x = x/2 
    //camera.rotation.z = x/100
    //camera.position.z = -7 + Math.sin(d.getTime()* 0.001) * .01 
    //camera.rotation.x = 300 + Math.sin(d.getTime()* 0.001) * .01  + y/50
    //renderer.render(scene, camera);
    openCredits =  lerp(openCredits,goalCredits,.1)
    document.getElementById("Credits").style.left = openCredits+"px";
    camera.position.x = 0 +  Math.sin(d.getTime()* 0.001) * 2 
    camera.rotation.y = Math.cos(d.getTime()* 0.002) * .003  
    camera.position.y = -6 + Math.cos(d.getTime()* 0.0005) * 2  
    camera.rotation.z = -x/50
    camera.rotation.x = 300 + Math.sin(d.getTime()* 0.001) * .01  + y/50;
   
    renderer.render(scene, camera);
   
};





    