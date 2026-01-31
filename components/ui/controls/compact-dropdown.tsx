"use client"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { forwardRef } from "react"

interface CompactDropdownProps {
    value: string
    onValueChange: (value: string) => void
    options: { value: string; label: string }[]
    className?: string
    disabled?: boolean
    width?: "auto" | "xs" | "sm" | "md" | "lg" | "xl"
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

export const CompactDropdown = forwardRef<HTMLSelectElement, CompactDropdownProps>(
    ({ 
        value, 
        onValueChange, 
        options, 
        className, 
        disabled = false, 
        width = "auto",
        ariaLabel
    }, ref) => {
        return (
            <div className="relative">
                <select
                    ref={ref}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    disabled={disabled}
                    className={cn(
                        "appearance-none rounded-sm border border-zinc-800 bg-zinc-900/30",
                        "px-2 py-1.5 text-xs font-medium text-zinc-200",
                        "focus:outline-none focus:ring-accent/10 focus:border-accent/40",
                        "transition-all",
                        "cursor-pointer hover:bg-zinc-900/50",
                        "disabled:opacity-40 disabled:cursor-not-allowed",
                        widthClasses[width],
                        className
                    )}
                    aria-label={ariaLabel}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown 
                    size={10} 
                    className={cn(
                        "absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none",
                        "transition-transform duration-200",
                        disabled && "opacity-40"
                    )} 
                />
            </div>
        )
    }
)

CompactDropdown.displayName = "CompactDropdown"
