import { MotionValue, useTransform } from 'framer-motion'

export function useSmartOpacity(opacity: MotionValue<number>) {
  const display = useTransform(opacity, (val) => (val ? '' : 'none'))
  return { opacity, display }
}
