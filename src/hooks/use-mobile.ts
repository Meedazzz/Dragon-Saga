import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => {
      const widthMatch = window.innerWidth < MOBILE_BREAKPOINT;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      setIsMobile(widthMatch && (isTouch || isMobileUA || window.innerWidth < 480));
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => checkIsMobile()
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", checkIsMobile)

    checkIsMobile()

    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return !!isMobile
}
