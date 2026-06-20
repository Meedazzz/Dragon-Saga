import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => {
      const widthMatch = window.innerWidth < MOBILE_BREAKPOINT;
      // Check if it's actually a touch/mobile device
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      
      // If it's a mobile UA or has touch capabilities, AND is under the breakpoint, it's mobile.
      // Otherwise, if it's desktop (no touch, desktop UA) but zoomed in, we do NOT switch to mobile.
      // To be safe, let's treat it as mobile if it meets BOTH width and touch/UA, 
      // or if it's a super small screen (like under 480px) regardless of touch.
      setIsMobile(widthMatch && (isTouch || isMobileUA || window.innerWidth < 480));
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkIsMobile()
    }
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
