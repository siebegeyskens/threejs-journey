import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import CustomObject from "./customObject.jsx";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();
  const groupRef = useRef();

  // use delta (time between frames)
  // so that the speed is the same for everyone (it won't be relative to the framerate)
  useFrame((state, delta) => {
    /* use sine and cosine to circle around center: 
    const angle = state.clock.elapsedTime;
    cubeRef.current.rotation.y += delta;
    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;
    state.camera.lookAt(0, 0, 0);
    */
    //  groupRef.current.  rotation.y += delta * 0.5;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]}></orbitControls>

      <directionalLight position={[1, 2, 3]} intensity={1.2}></directionalLight>
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry args={[0.75, 32, 16]}></sphereGeometry>
          <meshStandardMaterial color="orange"></meshStandardMaterial>
        </mesh>
        <mesh ref={cubeRef} position-x={2}>
          <boxGeometry></boxGeometry>
          <meshStandardMaterial color="purple"></meshStandardMaterial>
        </mesh>
      </group>
      <mesh rotation-x={-Math.PI / 2} position-y={-1} scale={10}>
        <planeGeometry></planeGeometry>
        <meshStandardMaterial color="green" />
      </mesh>

      <CustomObject />
    </>
  );
}
