import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '@/styles/pages/Index.module.scss'
import { Globe } from '@/components/Globe'

const intervalA = [0.15, 0.25, 0.35, 0.45]
const intervalB = [0.35, 0.45, 0.55, 0.65]
const intervalC = [0.55, 0.65, 0.75, 0.85]

const topInterval = ['100%', '50%', '50%', '0%']
const opacityInterval = [0, 1, 1, 0]

export default function Index() {
  const { scrollYProgress } = useScroll()
  const background = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.5, 0.7, 0.9],
    ['#111111', '#e7f055', '#356bf6', '#0b2749', '#111111']
  )

  const topA = useTransform(scrollYProgress, intervalA, topInterval)
  const opacityA = useTransform(scrollYProgress, intervalA, opacityInterval)
  const topB = useTransform(scrollYProgress, intervalB, topInterval)
  const opacityB = useTransform(scrollYProgress, intervalB, opacityInterval)
  const topC = useTransform(scrollYProgress, intervalC, topInterval)
  const opacityC = useTransform(scrollYProgress, intervalC, opacityInterval)

  const footerOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  return (
    <div className={styles.container}>
      <motion.div className={styles.background} style={{ background }} />
      <div className={styles.hero}>
        <Globe />
      </div>
      <div className={styles.section}>
        <motion.h1 style={{ top: topA, opacity: opacityA }}>
          Software Engineer
        </motion.h1>
      </div>
      <div className={styles.section}>
        <motion.h1 style={{ top: topB, opacity: opacityB }}>
          Venture Partner
        </motion.h1>
      </div>
      <div className={styles.section}>
        <motion.h1 style={{ top: topC, opacity: opacityC }}>
          Computer Science Student
        </motion.h1>
      </div>
      <motion.div style={{ opacity: footerOpacity }} className={styles.footer}>
        <h1>Cooper Saye</h1>
      </motion.div>
    </div>
  )
}
