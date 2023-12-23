import { useEffect } from 'react'

export function useWindowResize(listener: (ev: UIEvent) => any) {
  useEffect(() => {
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [listener])
}
