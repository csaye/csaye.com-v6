import styles from './styles.module.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTransform, useScroll, motion, easeOut } from 'framer-motion'
import { degreesToRadians } from 'popmotion'
import { Center, Text3D } from '@react-three/drei'

const color = '#eeeeee'

const scrollRange = [0, 0.2]

function HelloWorldText() {
  return (
    <Center>
      <Text3D font='/fonts/Inter/Inter_Bold.json' position={[0, 0, 0]}>
        Cooper Saye
        <meshBasicMaterial wireframe color={color} />
      </Text3D>
    </Center>
  )
}

function Scene() {
  const { scrollYProgress } = useScroll()
  const xAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(0),
    degreesToRadians(540),
  ])
  const yAngle = useTransform(scrollYProgress, scrollRange, [
    degreesToRadians(90),
    degreesToRadians(0),
  ])
  const distance = useTransform(scrollYProgress, scrollRange, [5, 30], {
    ease: easeOut,
  })

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      xAngle.get()
    )
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  return <HelloWorldText />
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
