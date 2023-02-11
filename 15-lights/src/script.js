import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

// AmbientLight
/*
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
*/

// DirectionalLight
/*
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
directionalLight.position.set(1, 0.5, 2);
*/

// HemisphereLight

const skyColor = new THREE.Color("rgb(153,50,204)");
const groundColor = new THREE.Color("rgb(0,191,255)");

const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, 0.7);
scene.add(hemisphereLight);
// with helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLightHelper);
hemisphereLight.rotation.z = Math.PI * 0.6;
hemisphereLight.position.x = 2;
hemisphereLight.position.y = 0;

// PointLight
/*
const pointLight = new THREE.PointLight(
  new THREE.Color("rgb(255,200,200)"),
  0.5
);
scene.add(pointLight);
pointLight.position.set(2, 1, 2);
pointLight.distance = 10;
gui.add(pointLight, "distance").min(0).max(100);
gui.add(pointLight, "decay").min(0).max(100);
*/

// RectAreaLight
/*
const rectAreaLight = new THREE.RectAreaLight();
rectAreaLight.color = new THREE.Color("rgb(50,150,255)");
rectAreaLight.intensity = 2;
rectAreaLight.width = 10;
rectAreaLight.height = 2;
scene.add(rectAreaLight);
rectAreaLight.position.set(0, 2, 0);
rectAreaLight.lookAt(new THREE.Vector3());
*/

// SpotLight
/*
const spotLight = new THREE.SpotLight(
  new THREE.Color("rgb(0,190,255)"),
  1,
  10,
  Math.PI * 0.2,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
spotLight.target.position.x = 0.5;
scene.add(spotLight.target);
*/

//
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
