import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WebGLExperience from "./WebGLExperience";

export default class Camera {
  constructor() {
    this.webGLExperience = new WebGLExperience(); // Singleton
    this.sizes = this.webGLExperience.sizes;
    this.scene = this.webGLExperience.scene;
    this.canvas = this.webGLExperience.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(10, 5, 10);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  // update aspect ration on resize
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  // update controls for damping
  update() {
    this.controls.update();
  }
}
