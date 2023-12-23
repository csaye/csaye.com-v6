import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '@/styles/pages/Index.module.scss'
import { Globe } from '@/components/Globe'

export default function Index() {
  const { scrollYProgress } = useScroll()
  const background = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 1],
    ['#111111', '#e7f055', '#356bf6', '#0b2749', '#eeeeee']
  )

  return (
    <div className={styles.container}>
      <motion.div className={styles.background} style={{ background }} />
      <div className={styles.heroSection}>
        <Globe />
      </div>
      <div className={styles.rampSection}></div>
      <div className={styles.contrarySection}></div>
      <div className={styles.michiganSection}></div>
      <div className={styles.footerSection}></div>
    </div>
  )
}
