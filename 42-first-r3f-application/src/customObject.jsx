import { DoubleSide } from "three";
import { useMemo, useRef, useEffect } from "react";

export default function CustomObject() {
  // get acces to the native bufferGeometry class
  const geometryRef = useRef();

  // 10 triangles (3 points)
  const verticesCount = 10 * 3;

  // useMemo, so that positions only needs to be calculated once
  const positions = useMemo(() => {
    // 3 values (x,y,z) per vertex
    const positions = new Float32Array(verticesCount * 3);

    // populate the positions array
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshBasicMaterial color="red" side={DoubleSide} />
    </mesh>
  );
}
