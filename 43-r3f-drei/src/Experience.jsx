import {
  MeshReflectorMaterial,
  Float,
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        // scale={2}
        lineWidth={1.5}
        depthTest={false}
        anchor={[-1, 0, 0]}
      >
        <mesh ref={sphere} scale={1} position-x={-2}>
          <Html
            center
            wrapperClass="label"
            position={[0, 1.1, 0]}
            distanceFactor={8}
            occlude={[cube]}
          >
            Hello Drei!
          </Html>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </PivotControls>

      <Float speed={3} floatIntensity={1} rotationIntensity={2}>
        <mesh ref={cube} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} mode="translate" />
      </Float>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          mixBlur={0.2}
          resolution={1080}
          blur={[1000, 1000]}
          mirror={0.75}
          color="skyblue"
        />
      </mesh>

      <Text maxWidth={2} font="./bangers-v20-latin-regular.woff" position-z={2}>
        Hello R3F!
        <meshNormalMaterial />
      </Text>
    </>
  );
}
