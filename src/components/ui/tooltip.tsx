"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 150,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/* TooltipContent — fully rounded corners (req #5.3) and slow, elegant motion. */
function TooltipContent({
  className,
  sideOffset = 8,
  children,
  collisionPadding = 14,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance",
          /* Fully rounded corners per req #5.3 */
          "rounded-full",
          /* Long, smooth fade transition (req #5.4 mobile & #5.3 rounded) */
          
          "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "bg-[rgba(11,8,14,0.96)] text-[#efe5d5]",
          "border border-[rgba(228,74,90,0.62)]",
          "px-4 py-2 text-[11.5px]",
          "font-['Cinzel',serif] tracking-[0.4px]",
          "shadow-[0_10px_28px_rgba(0,0,0,0.72),0_0_18px_rgba(228,74,90,0.18)]",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
