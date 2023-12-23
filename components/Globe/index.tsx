import styles from './styles.module.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useTransform,
  useScroll,
  motion,
  useAnimation,
  useAnimate,
} from 'framer-motion'
import { Center, Text3D } from '@react-three/drei'
import { useState } from 'react'
import { degreesToRadians } from '@/utils/degreesToRadians'
import ArrowDown from '@/public/icons/ArrowDown'
import ArrowUp from '@/public/icons/ArrowUp'

const color = '#eeeeee'

const scrollRange = [0, 0.2, 0.8, 1]

function Scene() {
  const [size] = useState(Math.min(1, window.innerWidth / 1000))

  const { scrollYProgress } = useScroll()
  const xAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(0),
    degreesToRadians(540),
    degreesToRadians(540),
    degreesToRadians(0),
  ])
  const yAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(90),
    degreesToRadians(0),
    degreesToRadians(0),
    degreesToRadians(90),
  ])
  const distance = useTransform(scrollYProgress, scrollRange, [5, 30, 30, 5])

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
  const opacity = useTransform(scrollYProgress, scrollRange, [1, 0, 0, 1])
  const upArrowOpacity = useTransform(
    scrollYProgress,
    scrollRange,
    [0, 0, 0, 1]
  )
  const downArrowOpacity = useTransform(
    scrollYProgress,
    scrollRange,
    [1, 0, 0, 0]
  )

  return (
    <motion.div className={styles.container} style={{ opacity }}>
      {renderUpArrow()}
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>
      {renderDownArrow()}
    </motion.div>
  )

  function renderUpArrow() {
    return (
      <motion.div
        className={styles.arrowUp}
        animate={{ translateY: ['25%', '0%', '25%'] }}
        transformTemplate={(_, transform) => `translateX(-50%) ${transform}`}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        style={{ opacity: upArrowOpacity }}
      >
        <ArrowUp fill={color} />
      </motion.div>
    )
  }

  function renderDownArrow() {
    return (
      <motion.div
        className={styles.arrowDown}
        animate={{ translateY: ['-125%', '-100%', '-125%'] }}
        transformTemplate={(_, transform) => `translateX(-50%) ${transform}`}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        style={{ opacity: downArrowOpacity }}
      >
        <ArrowDown fill={color} />
      </motion.div>
    )
  }
}
