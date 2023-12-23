import styles from './styles.module.scss'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useRef, useLayoutEffect, Fragment, RefObject } from 'react'
import {
  useTransform,
  useScroll,
  useTime,
  motion,
  easeIn,
  easeOut,
  easeInOut,
} from 'framer-motion'
import { degreesToRadians, progress, mix } from 'popmotion'
import { Mesh } from 'three'
import { useWindowResize } from '@/hooks/useWindowResize'
import { Text } from '@react-three/drei'

const color = '#eeeeee'

const scrollRange = [0, 0.5]

function HelloWorldText() {
  return (
    <Text
      color={color}
      position={[0, 0, 0]}
      fontSize={0.6}
      font='/fonts/Inter/Inter-Bold.ttf'
    >
      COOPER SAYE
    </Text>
  )
}

function Star({ p }: { p: number }) {
  const ref = useRef<Mesh>(null)

  useLayoutEffect(() => {
    const distance = mix(2.5, 3, Math.random())
    const yAngle = mix(
      degreesToRadians(15),
      degreesToRadians(165),
      Math.random()
    )
    const xAngle = degreesToRadians(360) * p
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle)
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial
        wireframe
        color={color}
        transparent={true}
        opacity={0.1}
      />
    </mesh>
  )
}

function Scene({ numStars = 200 }) {
  const gl = useThree((state) => state.gl)
  const { scrollYProgress } = useScroll()
  const yAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(90),
    degreesToRadians(180),
  ])
  const distance = useTransform(scrollYProgress, scrollRange, [5.5, 30], {
    ease: easeOut,
  })
  const time = useTime()

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0003
    )
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  useLayoutEffect(() => gl.setPixelRatio(0.3))
  useWindowResize(() => gl.setPixelRatio(0.3))

  const stars = []
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />)
  }

  return (
    <Fragment>
      {stars}
      <HelloWorldText />
    </Fragment>
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
