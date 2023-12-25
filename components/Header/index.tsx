import { useSmartOpacity } from '@/utils/useSmartOpacity'
import styles from './styles.module.scss'
import { motion, useCycle, useScroll, useTransform } from 'framer-motion'
import { smoothScrollTo } from '@/utils/smoothScrollTo'
import { useRef } from 'react'

const scrollTime = 2500

export function Header() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.85, 0.95],
    [1, 0, 0, 1]
  )

  const bottomDisplay = useTransform(scrollYProgress, (val) =>
    val > 0.25 ? 'none' : ''
  )
  const topDisplay = useTransform(scrollYProgress, (val) =>
    val < 0.85 ? 'none' : ''
  )

  const scrollingRef = useRef(false)

  const [logoText, toggleLogoText] = useCycle(
    'CS',
    'Cooper Saye',
    'CS',
    'Computer Science',
    'CS',
    'College Student'
  )

  return (
    <motion.div className={styles.container} style={useSmartOpacity(opacity)}>
      <h1
        onMouseEnter={() => toggleLogoText()}
        onMouseLeave={() => toggleLogoText()}
        className={styles.bigLogo}
      >
        {logoText}
      </h1>
      <h1 className={styles.smallLogo}>CS</h1>
      <div className={styles.links}>
        <motion.p
          style={{ display: bottomDisplay }}
          onClick={() => scrollToBottom()}
        >
          To Bottom &darr;
        </motion.p>
        <motion.p style={{ display: topDisplay }} onClick={() => scrollToTop()}>
          To Top &uarr;
        </motion.p>
      </div>
    </motion.div>
  )

  function scrollToTop() {
    if (scrollingRef.current) return
    smoothScrollTo(0, scrollTime)
    scrollingRef.current = true
    setTimeout(() => (scrollingRef.current = false), scrollTime)
  }

  function scrollToBottom() {
    if (scrollingRef.current) return
    smoothScrollTo(document.body.scrollHeight - window.innerHeight, scrollTime)
    scrollingRef.current = true
    setTimeout(() => (scrollingRef.current = false), scrollTime)
  }
}
