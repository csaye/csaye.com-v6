import { useScroll, useTransform } from 'framer-motion'
import { useSmartOpacity } from './useSmartOpacity'

const topInterval = ['50%', '0%', '0%', '-50%']
const opacityInterval = [0, 1, 1, 0]

export function useSectionStyle(
  interval: [a: number, b: number, c: number, d: number]
) {
  const { scrollYProgress } = useScroll()

  const top = useTransform(scrollYProgress, interval, topInterval)
  const opacity = useTransform(scrollYProgress, interval, opacityInterval)

  return { top, ...useSmartOpacity(opacity) }
}
