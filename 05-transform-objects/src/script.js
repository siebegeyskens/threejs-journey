import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "lightblue" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// position (vector3)
// mesh.position.x = 1;
// mesh.position.y = -0.5;
// mesh.position.z = -2;
mesh.position.set(0.7, 0.5, 0.2);

// scale (vector3)
mesh.scale.set(0.5, 0.5, 0.7);

// rotation (euler, full rotation is PIs)
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.4;

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: "purple",
  })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.3),
  new THREE.MeshBasicMaterial({
    color: "pink",
  })
);

cube2.position.set(1, 1, 1);

group.add(cube1, cube2);

group.rotation.x = Math.PI * 0.25;

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

camera.lookAt(mesh.position);
camera.lookAt(group.position);

/**
 * Axes helper
 */

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
