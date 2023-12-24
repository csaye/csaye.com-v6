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
  michiganColor,
  rampColor,
} from '@/utils/colors'
import { useSectionStyle } from '@/utils/useSectionStyle'
import { useSmartOpacity } from '@/utils/useSmartOpacity'

const color = '#eeeeee'

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

  const scaleA = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])
  const scaleB = useTransform(scrollYProgress, [0.45, 0.55], [0, 1])
  const scaleC = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])

  const heroOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0])
  const footerOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])
  const scaleFooter = useTransform(scrollYProgress, [0.85, 0.95], [0, 1])

  return (
    <div className={styles.container}>
      <motion.div className={styles.background} style={{ background }} />
      <motion.div className={styles.hero} style={useSmartOpacity(heroOpacity)}>
        <Hero />
      </motion.div>
      <motion.div
        className={styles.outerSection}
        style={useSectionStyle([0.15, 0.25, 0.35, 0.45])}
      >
        <motion.div className={styles.rampSection}>
          <h1>Software Engineer, Ramp</h1>
          <motion.div className={styles.underline} style={{ scaleX: scaleA }} />
          <p>
            <LineLink href='https://ramp.com/'>Ramp</LineLink> is the ultimate
            platform for modern finance teams. Founded in 2019, Ramp powers the
            fastest-growing corporate card and bill payment platform in America,
            enabling tens of billions of dollars in purchases each year.
          </p>
          <p>
            I’m a software engineer at Ramp, where I’ve contributed to{' '}
            <LineLink href='https://ramp.com/bill-pay'>Bill Pay</LineLink>,{' '}
            <LineLink href='https://ramp.com/vendor-management'>
              Vendor Management
            </LineLink>
            ,{' '}
            <LineLink href='https://ramp.com/intelligence'>
              Price Intelligence
            </LineLink>
            ,{' '}
            <LineLink href='https://ramp.com/procurement'>Procurement</LineLink>
            , and more.
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.outerSection}
        style={useSectionStyle([0.35, 0.45, 0.55, 0.65])}
      >
        <motion.div className={styles.contrarySection}>
          <h1>Venture Partner, Contrary</h1>
          <motion.div className={styles.underline} style={{ scaleX: scaleB }} />
          <p>
            I’m a{' '}
            <LineLink href='https://contrary.com/blog/class-of-2024'>
              venture partner
            </LineLink>{' '}
            at <LineLink href='https://contrary.com/'>Contrary</LineLink>, the
            venture capital firm that backs the bold. The firm has helped create
            more than $10 billion in value through investments in companies
            including Ramp, Anduril, Zepto, and{' '}
            <LineLink href='https://contrary.com/companies'>others</LineLink>.
          </p>
          <p>
            As a venture partner for the University of Michigan, I host events,
            meet with founders, and help source the next generation of
            exceptional companies.
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.outerSection}
        style={useSectionStyle([0.55, 0.65, 0.75, 0.85])}
      >
        <motion.div className={styles.michiganSection}>
          <h1>Computer Science, Michigan</h1>
          <motion.div className={styles.underline} style={{ scaleX: scaleC }} />
          <p>
            I’m currently studying computer science with a minor in mathematics
            at the{' '}
            <LineLink href='https://umich.edu/'>
              University of Michigan
            </LineLink>
            . On campus, you can find me helping out at{' '}
            <LineLink href='https://michhackers.com/'>
              Michigan Hackers
            </LineLink>
            , Michigan’s largest tech club, or{' '}
            <LineLink href='https://v1michigan.com/'>V1 Michigan</LineLink>, our
            premier community for student builders.
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.footer}
        style={useSmartOpacity(footerOpacity)}
      >
        <div className={styles.footerCenter}>
          <h1>Hi, I’m Cooper!</h1>
          <motion.div
            className={styles.underlineA}
            style={{ scaleX: scaleFooter }}
          />
          <p>
            I’m passionate about creating & discovering delightful products.
          </p>
          <p>Follow me below!</p>
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

function LineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      style={{
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
      }}
      whileHover={{ textDecorationStyle: 'dashed' }}
      transition={{ duration: 0 }}
    >
      {children}
    </motion.a>
  )
}
