import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '@/styles/pages/Index.module.scss'
import { Hero } from '@/components/Hero'
import { ReactNode } from 'react'
import { IconLink } from '@/components/IconLink'
import Github from '@/public/icons/Github'
import Linkedin from '@/public/icons/Linkedin'
import Twitter from '@/public/icons/Twitter'
import {
  contraryColor,
  emptyColor,
  michiganAltColor,
  michiganColor,
  rampColor,
} from '@/utils/colors'

const intervalA = [0.15, 0.25, 0.35, 0.45]
const intervalB = [0.35, 0.45, 0.55, 0.65]
const intervalC = [0.55, 0.65, 0.75, 0.85]

const topInterval = ['100lvh', '50lvh', '50lvh', '0lvh']
const opacityInterval = [0, 1, 1, 0]

const color = '#eeeeee'
const epsilon = 0.0001

export default function Index() {
  const { scrollYProgress } = useScroll()
  const background = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85],
    [
      emptyColor,
      rampColor,
      rampColor,
      contraryColor,
      contraryColor,
      michiganColor,
      michiganColor,
      emptyColor,
    ]
  )

  const topA = useTransform(scrollYProgress, intervalA, topInterval)
  const opacityA = useTransform(scrollYProgress, intervalA, opacityInterval)
  const topB = useTransform(scrollYProgress, intervalB, topInterval)
  const opacityB = useTransform(scrollYProgress, intervalB, opacityInterval)
  const topC = useTransform(scrollYProgress, intervalC, topInterval)
  const opacityC = useTransform(scrollYProgress, intervalC, opacityInterval)

  const scaleA = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const scaleB = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
  const scaleC = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])

  const footerOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])
  const footerZ = useTransform(
    scrollYProgress,
    [0, 0.85 - epsilon, 0.85],
    [-10, -10, 0]
  )
  const scaleFooter = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])

  const heroOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0])
  const heroZ = useTransform(
    scrollYProgress,
    [0.25, 0.25 + epsilon, 1],
    [0, -10, -10]
  )

  return (
    <div className={styles.container}>
      <motion.div className={styles.background} style={{ background }} />
      <motion.div
        className={styles.hero}
        style={{ opacity: heroOpacity, zIndex: heroZ }}
      >
        <Hero />
      </motion.div>
      <motion.div
        className={styles.rampSection}
        style={{ top: topA, opacity: opacityA }}
      >
        <h1>Software Engineer</h1>
        <motion.div className={styles.underline} style={{ scaleX: scaleA }} />
        <p>Ramp</p>
      </motion.div>
      <motion.div
        className={styles.contrarySection}
        style={{ top: topB, opacity: opacityB }}
      >
        <h1>Venture Partner</h1>
        <motion.div className={styles.underline} style={{ scaleX: scaleB }} />
        <p>Contrary</p>
      </motion.div>
      <motion.div
        className={styles.michiganSection}
        style={{ top: topC, opacity: opacityC }}
      >
        <h1>Computer Science</h1>
        <motion.div className={styles.underline} style={{ scaleX: scaleC }} />
        <p>University of Michigan</p>
      </motion.div>
      <motion.div
        className={styles.footer}
        style={{ opacity: footerOpacity, zIndex: footerZ }}
      >
        <div className={styles.footerCenter}>
          <h1>Hi, I’m Cooper!</h1>
          <motion.div
            className={styles.underlineA}
            style={{ scaleX: scaleFooter }}
          />
          <p>
            I’m passionate about crafting and discovering delightful products.
          </p>
          <p>
            I’m a software engineer at{' '}
            <LineLink href='https://ramp.com/' color={rampColor}>
              Ramp
            </LineLink>
            , the ultimate platform for modern finance teams, where I have
            contributed to{' '}
            <LineLink href='https://ramp.com/bill-pay' color={rampColor}>
              Bill Pay
            </LineLink>
            ,{' '}
            <LineLink
              href='https://ramp.com/vendor-management'
              color={rampColor}
            >
              Vendor Management
            </LineLink>
            ,{' '}
            <LineLink href='https://ramp.com/intelligence' color={rampColor}>
              Price Intelligence
            </LineLink>
            ,{' '}
            <LineLink href='https://ramp.com/procurement' color={rampColor}>
              Procurement
            </LineLink>
            , and more.
          </p>
          <p>
            I’m also a venture partner at{' '}
            <LineLink href='https://contrary.com/' color={contraryColor}>
              Contrary
            </LineLink>
            , the venture capital firm that{' '}
            <LineLink
              href='https://contrary.com/companies'
              color={contraryColor}
            >
              backs the bold
            </LineLink>
            , and a student at the{' '}
            <LineLink href='https://umich.edu/' color={michiganAltColor}>
              University of Michigan
            </LineLink>{' '}
            studying computer science & mathematics. Find me below!
          </p>
          <motion.div
            className={styles.underlineB}
            style={{ scaleX: scaleFooter }}
          />
          <div className={styles.links}>
            <IconLink href='https://github.com/csaye'>
              <Github fill={color} />
            </IconLink>
            <IconLink href='https://www.linkedin.com/in/coopersaye/'>
              <Linkedin fill={color} />
            </IconLink>
            <IconLink href='https://twitter.com/CooperComputer'>
              <Twitter fill={color} />
            </IconLink>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function LineLink({
  href,
  children,
  color,
}: {
  href: string
  children: ReactNode
  color: string
}) {
  return (
    <motion.a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      style={{
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
      }}
      whileHover={{ color }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.a>
  )
}
