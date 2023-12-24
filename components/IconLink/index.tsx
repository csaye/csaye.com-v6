import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function IconLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </motion.a>
  )
}
