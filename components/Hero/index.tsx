import styles from './styles.module.scss'
import {
  useTransform,
  useScroll,
  motion,
  useMotionValueEvent,
} from 'framer-motion'
import { Fragment, useState } from 'react'
import ArrowDown from '@/public/icons/ArrowDown'

import Github from '@/public/icons/Github'
import Linkedin from '@/public/icons/Linkedin'
import Twitter from '@/public/icons/Twitter'
import { IconLink } from '../IconLink'

const color = '#eeeeee'

function NameText() {
  const epsilon = 0.025

  const { scrollYProgress } = useScroll()

  const wipeA = useTransform(scrollYProgress, [0, 0.05], [0, 1 + epsilon])
  const wipeB = useTransform(scrollYProgress, [0.05, 0.1], [0, 1 + epsilon])
  const wipeC = useTransform(scrollYProgress, [0.1, 0.15], [0, 1 + epsilon])

  const [backgrounds, setBackgrounds] = useState(getBackgrounds())

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest) setBackgrounds(getBackgrounds())
    else setTimeout(() => setBackgrounds(getBackgrounds()))
  })

  console.log(backgrounds)

  return (
    <Fragment>
      <motion.h1 style={{ background: backgrounds[0] }}>Cooper Saye</motion.h1>
      <motion.h1 style={{ background: backgrounds[1] }}>
        Software Engineer
      </motion.h1>
      <motion.h1 style={{ background: backgrounds[2] }}>
        Venture Partner
      </motion.h1>
      <motion.h1 style={{ background: backgrounds[3] }}>
        College Student
      </motion.h1>
      <motion.h1 style={{ background: backgrounds[4] }}>Cooper Saye</motion.h1>
    </Fragment>
  )

  function getBackgrounds() {
    const a = wipeA.get()
    const b = wipeB.get()
    const c = wipeC.get()

    return [
      colorGradient(a, 1),
      colorGradient(b, a - epsilon),
      colorGradient(c, b - epsilon),
      colorGradient(0, c - epsilon),
      `linear-gradient(to right,
        transparent,

        transparent ${(c - epsilon) * 100}%,
        ${color} ${(c - epsilon) * 100}%,
        ${color} ${c * 100}%,
        transparent ${c * 100}%,

        transparent ${(b - epsilon) * 100}%,
        ${color} ${(b - epsilon) * 100}%,
        ${color} ${b * 100}%,
        transparent ${b * 100}%,

        transparent ${(a - epsilon) * 100}%,
        ${color} ${(a - epsilon) * 100}%,
        ${color} ${a * 100}%,
        transparent ${a * 100}%,
        
        transparent
)`,
    ]

    function colorGradient(start: number, end: number) {
      const pa = `${start * 100}%`
      const pb = `${end * 100}%`

      return `linear-gradient(to right, transparent, transparent ${pa}, ${color} ${pa}, ${color} ${pb}, transparent ${pb}, transparent) text`
    }
  }
}

export function Hero() {
  return (
    <motion.div className={styles.container}>
      {renderLinks()}
      {renderDownArrow()}
      <NameText />
    </motion.div>
  )

  function renderLinks() {
    return (
      <motion.div className={styles.links}>
        <IconLink href='https://github.com/csaye'>
          <Github fill={color} />
        </IconLink>
        <IconLink href='https://www.linkedin.com/in/coopersaye/'>
          <Linkedin fill={color} />
        </IconLink>
        <IconLink href='https://twitter.com/CooperComputer'>
          <Twitter fill={color} />
        </IconLink>
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
