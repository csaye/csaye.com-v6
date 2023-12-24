import { useEffect } from 'react'

export function useWindowScroll(listener: (ev: Event) => any) {
  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [listener])
}
