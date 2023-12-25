export function smoothScrollTo(endY: number, duration: number): void {
  const startY = window.scrollY || window.pageYOffset
  const distanceY = endY - startY
  const startTime = Date.now()

  const timer = setInterval(() => {
    const time = Date.now() - startTime
    const newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      clearInterval(timer)
      window.scrollTo(0, endY)
    } else {
      window.scrollTo(0, newY)
    }
  }, 1000 / 60)
}

function easeInOutQuart(
  time: number,
  from: number,
  distance: number,
  duration: number
) {
  if ((time /= duration / 2) < 1)
    return (distance / 2) * time * time * time * time + from
  return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
}
