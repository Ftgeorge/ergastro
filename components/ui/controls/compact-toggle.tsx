"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CompactToggleProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    className?: string
    disabled?: boolean
    size?: "sm" | "md"
    color?: "accent" | "emerald" | "blue" | "rose"
    ariaLabel?: string
}

const sizeClasses = {
    sm: {
        track: "h-4 w-7",
        thumb: "h-2.5 w-2.5",
        thumbTranslate: {
            true: "translate-x-3.5",
            false: "translate-x-0.5"
        }
    },
    md: {
        track: "h-5 w-9", 
        thumb: "h-3 w-3",
        thumbTranslate: {
            true: "translate-x-5",
            false: "translate-x-0.5"
        }
    }
}

const colorClasses = {
    accent: {
        checked: "bg-accent/80",
        unchecked: "bg-zinc-700"
    },
    emerald: {
        checked: "bg-emerald-500/80",
        unchecked: "bg-zinc-700"
    },
    blue: {
        checked: "bg-blue-500/80", 
        unchecked: "bg-zinc-700"
    },
    rose: {
        checked: "bg-rose-500/80",
        unchecked: "bg-zinc-700"
    }
}

export const CompactToggle = forwardRef<HTMLButtonElement, CompactToggleProps>(
    ({ 
        checked, 
        onCheckedChange, 
        className, 
        disabled = false, 
        size = "md",
        color = "accent",
        ariaLabel
    }, ref) => {
        const sizeConfig = sizeClasses[size]
        const colorConfig = colorClasses[color]

        return (
            <button
                ref={ref}
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onCheckedChange(!checked)}
                className={cn(
                    "relative inline-flex items-center rounded-full transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-zinc-950",
                    sizeConfig.track,
                    checked ? colorConfig.checked : colorConfig.unchecked,
                    disabled && "opacity-40 cursor-not-allowed",
                    className
                )}
                aria-label={ariaLabel}
            >
                <span
                    className={cn(
                        "inline-block transform rounded-full bg-white transition-transform duration-200 shadow-sm",
                        sizeConfig.thumb,
                        checked ? sizeConfig.thumbTranslate.true : sizeConfig.thumbTranslate.false
                    )}
                />
            </button>
        )
    }
)

CompactToggle.displayName = "CompactToggle"
