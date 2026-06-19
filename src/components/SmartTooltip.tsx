import * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SmartTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  disableHoverableContent?: boolean
}

export function SmartTooltip({ 
  content, 
  children, 
  side,
  align = "center",
  disableHoverableContent = true,
}: SmartTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const [calculatedSide, setCalculatedSide] = React.useState<"top" | "right" | "bottom" | "left">(side ?? "top")
  const [calculatedAlign, setCalculatedAlign] = React.useState<"start" | "center" | "end">(align)

  const updatePosition = React.useCallback(() => {
    if (side) {
      setCalculatedSide(side)
      setCalculatedAlign(align)
      return
    }
    const el = triggerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // Prefer opening toward center of screen
    if (cy > vh * 0.55) {
      setCalculatedSide("top")
    } else if (cy < vh * 0.38) {
      setCalculatedSide("bottom")
    } else if (cx > vw * 0.6) {
      setCalculatedSide("left")
    } else if (cx < vw * 0.4) {
      setCalculatedSide("right")
    } else {
      setCalculatedSide("top")
    }

    // Align toward center horizontally
    if (calculatedSide === "top" || calculatedSide === "bottom") {
      if (cx > vw - 140) setCalculatedAlign("end")
      else if (cx < 140) setCalculatedAlign("start")
      else setCalculatedAlign("center")
    }
  }, [side, align, calculatedSide])

  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={200}>
      <TooltipTrigger asChild>
        <div
          ref={triggerRef}
          onMouseEnter={updatePosition}
          onFocus={updatePosition}
          onPointerEnter={updatePosition}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent
        side={calculatedSide}
        align={calculatedAlign}
        sideOffset={10}
        collisionPadding={16}
        avoidCollisions={true}
        className="z-[900] max-w-[260px] rounded-lg border px-3 py-2 text-xs leading-relaxed shadow-2xl backdrop-blur-md"
        style={{
          background: 'rgba(14, 10, 14, 0.96)',
          borderColor: 'rgba(228, 74, 90, 0.55)',
          color: '#efe5d5',
          fontFamily: "'Cinzel', serif",
        }}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
