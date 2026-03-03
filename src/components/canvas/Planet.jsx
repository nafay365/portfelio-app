import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const PlanetModel = ({ modelPath }) => {
    const planet = useGLTF(modelPath);
    const planetRef = useRef();

    // Auto-rotate the planet continuously
    useFrame((state, delta) => {
        if (planetRef.current) {
            planetRef.current.rotation.y += delta * 1; // Adjust speed as needed
        }
    });

    return (
        <primitive
            ref={planetRef}
            object={planet.scene}
            scale={1.8}
            position={[0, -2, 0]}
            rotation={[0, 0, 0]}
        />
    );
};

const PlanetCanvas = () => {
    const [isDark, setIsDark] = useState(() => {
        return document.documentElement.classList.contains('dark');
    });

    useEffect(() => {
        // Listen for theme changes
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);

    // Use PLANET-dark for dark mode, PLANET2 for light mode
    const modelPath = isDark ? "./PLANET-dark/scene.gltf" : "./PLANET2/scene.gltf";

    return (
        <Canvas
            shadows
            frameloop='always'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 50,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <PlanetModel modelPath={modelPath} />

            {/* OrbitControls is disabled for mouse interaction */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                maxPolarAngle={Math.PI/2}
                minPolarAngle={Math.PI/2}
            />

            <Preload all />
        </Canvas>
    );
};

export default PlanetCanvas;
