import styles from './styles.module.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTransform, useScroll, motion } from 'framer-motion'
import { Center, Text3D } from '@react-three/drei'
import { useState } from 'react'
import { degreesToRadians } from '@/utils/degreesToRadians'

const color = '#eeeeee'

const scrollRange = [0, 0.2]

function Scene() {
  const [size] = useState(Math.min(1, window.innerWidth / 1000))

  const { scrollYProgress } = useScroll()
  const xAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(0),
    degreesToRadians(540),
  ])
  const yAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(90),
    degreesToRadians(0),
  ])
  const distance = useTransform(scrollYProgress, scrollRange, [5, 30])

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      xAngle.get()
    )
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  return (
    <Center>
      <Text3D font='/fonts/Inter_Bold.json' position={[0, 0, 0]} size={size}>
        Cooper Saye
        <meshBasicMaterial wireframe color={color} />
      </Text3D>
    </Center>
  )
}

export function Globe() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, scrollRange, [1, 0])

  return (
    <motion.div className={styles.container} style={{ opacity }}>
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>
    </motion.div>
  )
}
