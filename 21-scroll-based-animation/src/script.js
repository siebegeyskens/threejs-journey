import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import gsap from "gsap";

/**
 * Page interaction
 */

// Scroll

let scrollY = window.scrollY;
let currentSection = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  console.log(scrollY);

  const section = Math.round(scrollY / window.innerHeight);
  if (currentSection != section) {
    currentSection = section;
    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=3",
    });
  }
});

// Mouse

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / window.innerWidth - 0.5;
  cursor.y = e.clientY / window.innerHeight - 0.5;
});

/**
 * Debug
 */
const gui = new dat.GUI();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

// Material
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});

/**
 * Objects
 */
const torus = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);

const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);

const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.35, 100, 16),
  material
);

torus.position.x = 2;
knot.position.x = 2;
cone.position.x = -2;

scene.add(torus, cone, knot);

const objectsDistance = 4;

cone.position.y = -objectsDistance;
knot.position.y = -objectsDistance * 2;

/**
 * Lights
 */

const directionalLight = new THREE.DirectionalLight("0xffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

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
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const sectionMeshes = [torus, cone, knot];

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate meshes
  sectionMeshes.forEach((mesh) => {
    mesh.rotation.y += deltaTime * 0.1;
    mesh.rotation.x += deltaTime * 0.1;
  });

  // Animate camera
  cameraGroup.position.y = (-objectsDistance * scrollY) / window.innerHeight;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  camera.position.x += deltaTime * 5 * (parallaxX - camera.position.x);
  camera.position.y += deltaTime * 5 * (parallaxY - camera.position.y);
  // alternative solution to camera group:
  // camera.position.y = camera.position.y -= cursor.y;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
