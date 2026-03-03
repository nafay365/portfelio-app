import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  Billboard,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={0} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
      </mesh>
      <Billboard>
        <mesh scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            transparent
            opacity={0}
            polygonOffset
            polygonOffsetFactor={-10}
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={0.5}
            map={decal}
            flatShading
          />
        </mesh>
      </Billboard>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const { shouldUse2D } = useDeviceDetect();

  // For mobile/low-end devices, show 2D flat version with theme support
  if (shouldUse2D) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 dark:bg-white/10 bg-white/80 backdrop-blur-sm dark:border-white/20 border-gray-200 flex items-center justify-center p-2 rounded-lg">
          <img
            src={icon}
            alt="tech icon"
            className="w-full h-full object-contain"
            style={{ imageRendering: 'auto' }}
          />
        </div>
      </div>
    );
  }

  return (
    <Canvas
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball icon={icon} imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
