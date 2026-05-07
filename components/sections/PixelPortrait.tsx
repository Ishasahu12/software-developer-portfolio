"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Distance from mouse (in UV space)
    float dist = distance(uv, uMouse);
    
    // Multiple wave layers for organic paper feel
    float wave1 = sin(pos.x * 3.0 + uTime * 1.2) * 0.03;
    float wave2 = sin(pos.y * 2.5 + uTime * 0.9) * 0.025;
    float wave3 = sin((pos.x + pos.y) * 4.0 + uTime * 1.5) * 0.015;
    
    // Mouse influence — stronger near cursor
    float mouseWave = sin(dist * 10.0 - uTime * 2.0) * 0.04 * uHover;
    mouseWave *= smoothstep(0.5, 0.0, dist);
    
    // Combine waves
    float elevation = wave1 + wave2 + wave3 + mouseWave;
    
    // Add hover ripple
    float hoverRipple = sin(dist * 15.0 - uTime * 3.0) * 0.02 * uHover;
    hoverRipple *= smoothstep(0.3, 0.0, dist);
    
    pos.z += elevation + hoverRipple;
    vElevation = elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform sampler2D uTexture;
  
  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = color;
  }
`;

function PaperImage({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, pointer } = useThree();
  
  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(imageUrl);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [imageUrl]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  const targetHover = useRef(0);

  useFrame((state) => {
    if (!materialRef.current) return;
    
    const time = state.clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;
    
    // Smooth mouse follow
    const mouseX = (pointer.x + 1) / 2;
    const mouseY = (pointer.y + 1) / 2;
    materialRef.current.uniforms.uMouse.value.x += (mouseX - materialRef.current.uniforms.uMouse.value.x) * 0.05;
    materialRef.current.uniforms.uMouse.value.y += (mouseY - materialRef.current.uniforms.uMouse.value.y) * 0.05;
    
    // Smooth hover transition
    materialRef.current.uniforms.uHover.value += (targetHover.current - materialRef.current.uniforms.uHover.value) * 0.08;
  });

  // Handle hover via raycaster or just use pointer position
  useEffect(() => {
    const handlePointerMove = () => {
      // If pointer is within viewport, consider it hovering
      targetHover.current = 1;
    };
    const handlePointerLeave = () => {
      targetHover.current = 0;
    };
    
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);
    
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  // Image aspect ratio
  const aspect = 0.75; // 3:4 portrait

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.2, 2.2 / aspect, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

export default function PixelPortrait() {
  return (
    <motion.div
      className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#12120F]">
        <div className="relative aspect-[3/4] w-full">
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
            flat
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.NoToneMapping;
              gl.toneMappingExposure = 1;
            }}
          >
            <PaperImage imageUrl="/about-portrait.png" />
          </Canvas>
        </div>
        
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/[0.06]" />
      </div>
    </motion.div>
  );
}
