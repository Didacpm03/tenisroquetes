// components/Pista.tsx
import { useGLTF } from '@react-three/drei';

export function Pista(props: any) {
  const { scene } = useGLTF('/models/red_clay_tennis_court.glb');
  return <primitive object={scene} {...props} />;
}

// Precarga el modelo para evitar carga lenta
useGLTF.preload('/models/red_clay_tennis_court.glb');