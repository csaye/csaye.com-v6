import styles from './styles.module.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTransform, useScroll, motion } from 'framer-motion'
import { Center, Text3D } from '@react-three/drei'
import { ReactNode, useState } from 'react'
import { degreesToRadians } from '@/utils/degreesToRadians'
import ArrowDown from '@/public/icons/ArrowDown'

import Github from '@/public/icons/Github'
import Linkedin from '@/public/icons/Linkedin'
import Twitter from '@/public/icons/Twitter'

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
  const scale = useTransform(scrollYProgress, scrollRange, [1, 0])

  return (
    <motion.div className={styles.container} style={{ opacity }}>
      {renderLinks()}
      {renderDownArrow()}
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>
    </motion.div>
  )

  function renderLinks() {
    return (
      <motion.div
        className={styles.links}
        style={{ scale }}
        transformTemplate={(_, transform) =>
          `translate(-50%, -50%) ${transform}`
        }
      >
        <PopLink href='https://github.com/csaye'>
          <Github fill={color} />
        </PopLink>
        <PopLink href='https://www.linkedin.com/in/coopersaye/'>
          <Linkedin fill={color} />
        </PopLink>
        <PopLink href='https://twitter.com/CooperComputer'>
          <Twitter fill={color} />
        </PopLink>
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
      >
        <ArrowDown fill={color} />
      </motion.div>
    )
  }
}

function PopLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </motion.a>
  )
}
