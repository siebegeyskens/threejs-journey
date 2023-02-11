const canvas = document.getElementById("webgl");

// 1. scene
const scene = new THREE.Scene();

// 2. mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const mesh = new THREE.Mesh(geometry, material);

// add mesh to scene
scene.add(mesh);

// 3. camera
const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// add camera to scene
camera.position.z = 3;
scene.add(camera);

// 4. renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // if property name is same name as variable
});
renderer.setSize(sizes.width, sizes.height); // renderer sets the size of the canvas

renderer.render(scene, camera);
