import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animations (different options)

// 1. Time
let time = Date.now();

// 2. Clock
const clock = new THREE.Clock();

// 3. Gsap (does animationframerequest on itself)
gsap.to(mesh.position, {
  duration: 1,
  delay: 2,
  x: 2,
});

const tick = () => {
  // every computer has a different framerate soo we use time in order to do animations the same speed regardless of the framerate
  // Time
  /*
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;
  mesh.rotation.x += 0.001 * deltaTime;
  */

  // Clock
  /*
  const elapsedTime = clock.getElapsedTime();
  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);
  */

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
