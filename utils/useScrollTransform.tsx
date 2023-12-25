import { useScroll, useTransform } from 'framer-motion'

export function useScrollTransform(
  scrollRange: number[],
  valueRange: number[] = [0, 1]
) {
  const { scrollYProgress } = useScroll()
  return useTransform(scrollYProgress, scrollRange, valueRange)
}
