import * as THREE from "three";
import WebGLExperience from "../WebGLExperience";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
  constructor() {
    this.webGLExperience = new WebGLExperience();
    this.scene = this.webGLExperience.scene;
    this.resources = this.webGLExperience.resources;

    this.resources.on("ready", () => {
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment(); // environment map should load after objects
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
