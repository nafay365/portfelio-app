import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";

import CanvasLoader from "../Loader";
function generateThemeColors(startHex, endHex, steps) {
    const start = {
        r: parseInt(startHex.slice(1, 3), 16),
        g: parseInt(startHex.slice(3, 5), 16),
        b: parseInt(startHex.slice(5, 7), 16)
    };
    const end = {
        r: parseInt(endHex.slice(1, 3), 16),
        g: parseInt(endHex.slice(3, 5), 16),
        b: parseInt(endHex.slice(5, 7), 16)
    };

    const colors = [];
    for (let i = 0; i < steps; i++) {
        const r = Math.round(start.r + (end.r - start.r) * (i / (steps - 1)));
        const g = Math.round(start.g + (end.g - start.g) * (i / (steps - 1)));
        const b = Math.round(start.b + (end.b - start.b) * (i / (steps - 1)));

        // Properly format the hex calculation
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        colors.push(hex.toUpperCase());
    }
    return colors;
}

const Avatar = () => {
    // Ideally, you would load a GLTF model here.
    // const computer = useGLTF("./desktop_pc/scene.gltf");

    // State to track if the model is clicked (zoomed)
    const [active, setActive] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const meshRef = useRef();

    // Generate complex gradient with pauses at key colors
    const colors = useMemo(() => {
        const keyColors = ['#FFFFFF', '#000000', '#915EFF']; // White, Black, Blue, Purple
        const steps = 100; // Transition duration (approx 1s)
        const pauseFrames = 100; // Pause duration (approx 1s at 10ms interval)

        let fullGradient = [];

        for (let i = 0; i < keyColors.length; i++) {
            const startColor = keyColors[i];
            const endColor = keyColors[(i + 1) % keyColors.length]; // Loop back to start

            // 1. Add Pause at key color
            for (let p = 0; p < pauseFrames; p++) {
                fullGradient.push(startColor);
            }

            // 2. Generate Gradient to next color
            const gradient = generateThemeColors(startColor, endColor, steps);
            fullGradient.push(...gradient);
        }

        return fullGradient;
    }, []);

    useEffect(() => {
        // Cycle colors rapidly for smooth gradient effect
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
        }, 10);
        return () => clearInterval(interval);
    }, [colors]);

    useFrame((state, delta) => {
        // Smoothly animate the scale based on the active state
        const targetScale = active ? 1.5 : 1;
        easing.damp3(meshRef.current.scale, [targetScale, targetScale, targetScale], 0.25, delta);

        // Smoothly animate the color change
        easing.dampC(meshRef.current.material.color, colors[colorIndex], 0.25, delta);

        // Auto-rotate the model itself slowly
        meshRef.current.rotation.y += delta * 0.1;
    });

    return (
        <mesh
            ref={meshRef}
            onClick={() => setActive(!active)}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshStandardMaterial wireframe />
        </mesh>
    );
};

const AvatarCanvas = () => {
    return (
        <Canvas
            frameloop='always'
            shadows
            dpr={[1, 2]}
            camera={{ position: [20, 3, 5], fov: 5 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    autoRotate
                    enableRotate={true}
                />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Avatar />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default AvatarCanvas;
