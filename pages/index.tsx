import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '@/styles/pages/Index.module.scss'
import { Globe } from '@/components/Globe'

const scrollRange = [0.4, 0.8]

export default function Index() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, scrollRange, [0, 1])
  const scale = useTransform(scrollYProgress, scrollRange, [1, 3])

  return (
    <div className={styles.container}>
      <div className={styles.globeContainer}>
        <Globe />
      </div>
      <div className={styles.bodyContainer}>
        <motion.div
          className={styles.circle}
          style={{ opacity, scale }}
        ></motion.div>
      </div>
    </div>
  )
}
