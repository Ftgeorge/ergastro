"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface CompactInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    width?: "auto" | "xs" | "sm" | "md" | "lg" | "xl"
    type?: "text" | "number"
    ariaLabel?: string
}

const widthClasses = {
    auto: "w-auto",
    xs: "w-16",
    sm: "w-20", 
    md: "w-24",
    lg: "w-28",
    xl: "w-32"
}

export const CompactInput = forwardRef<HTMLInputElement, CompactInputProps>(
    ({ 
        value, 
        onChange, 
        placeholder, 
        className, 
        disabled = false, 
        width = "auto",
        type = "text",
        ariaLabel
    }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className={cn(
                    "rounded-sm border border-zinc-800 bg-zinc-900/30",
                    "px-2 py-1.5 text-xs text-zinc-200 placeholder-zinc-600",
                    "focus:outline-none focus:ring-accent/10 focus:border-accent/40",
                    "transition-all",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                    widthClasses[width],
                    className
                )}
                aria-label={ariaLabel}
            />
        )
    }
)

CompactInput.displayName = "CompactInput"
