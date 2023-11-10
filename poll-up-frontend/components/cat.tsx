'use client';
import React, { Suspense, useEffect } from 'react';
import { useAnimations, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Model() {
  const { scene, animations } = useLoader(GLTFLoader, '/cat_3d/scene.gltf');
  const { ref, actions, names } = useAnimations<any>(animations);

  useEffect(() => {
    actions[names[0]]?.reset().fadeIn(0.5).play();

    return () => {
      actions[names[0]]?.reset().fadeOut(0.5);
    };
  }, [actions, names]);

  return (
    <Suspense>
      <group
        position={[0, -1.5, 0]}
        scale={5}
        animations={[]}
        ref={ref as unknown as React.Ref<any>}
      >
        <primitive object={scene} />
      </group>
    </Suspense>
  );
}

export default function Cat3d() {
  return (
    <div
      className='w-[400px] h-[400px]'
      style={{ position: 'relative', background: '#07000D' }}
    >
      <Canvas className='w-[400px] h-[400px]' shadows>
        <OrbitControls />
        <directionalLight position={[10, 10, 0]} intensity={1.5} />
        <directionalLight position={[-10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 20, 0]} intensity={1.5} />
        <directionalLight position={[0, -10, 0]} intensity={0.25} />
        <Model />
      </Canvas>
    </div>
  );
}
