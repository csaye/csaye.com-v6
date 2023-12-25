import { useScroll, useTransform } from 'framer-motion'
import { useSmartOpacity } from './useSmartOpacity'
import { useEffect, useState } from 'react'

const opacityInterval = [0, 1, 1, 0]

export function useSectionStyle(
  interval: [a: number, b: number, c: number, d: number]
) {
  const [topInterval, setTopInterval] = useState([
    '50lvh',
    '0lvh',
    '0lvh',
    '-50lvh',
  ])

  useEffect(() => {
    if (!supportsLVH()) setTopInterval(['50vh', '0vh', '0vh', '-50vh'])
  }, [])

  const { scrollYProgress } = useScroll()

  const top = useTransform(scrollYProgress, interval, topInterval)
  const opacity = useTransform(scrollYProgress, interval, opacityInterval)

  return { top, ...useSmartOpacity(opacity) }
}

function supportsLVH() {
  const testElement = document.createElement('div')
  try {
    testElement.style.height = '50lvh'
    return testElement.style.height === '50lvh'
  } catch (e) {
    return false
  }
}
