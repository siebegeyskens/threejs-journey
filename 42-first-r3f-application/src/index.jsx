import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
  position: [0, 0, 8],
  near: 0.01,
  zoom: 100,
};

root.render(
  <>
    <Canvas
      dpr={1}
      flat
      gl={{ antialias: true, toneMaping: THREE.ACESFilmicToneMapping }}
      camera={cameraSettings}
      orthographic
    >
      <Experience></Experience>
    </Canvas>
  </>
);
