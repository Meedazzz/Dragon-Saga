import * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SmartTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export function SmartTooltip({
  content,
  children,
  side,
  align = "center",
}: SmartTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const [calculatedSide, setCalculatedSide] = React.useState<"top" | "right" | "bottom" | "left">(side ?? "top")
  const [calculatedAlign, setCalculatedAlign] = React.useState<"start" | "center" | "end">(align)

  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={120}>
      <TooltipTrigger asChild onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={calculatedSide}
        align={calculatedAlign}
        sideOffset={10}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
