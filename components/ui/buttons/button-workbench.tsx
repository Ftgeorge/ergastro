"use client"

import { Button } from "@/components/ui/buttons/button"
import { useState } from "react"

interface ButtonWorkbenchProps {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning"
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    isLoading?: boolean
    fullWidth?: boolean
    children?: React.ReactNode
    hasIcon?: boolean
    iconPosition?: "left" | "right"
    iconPack?: "lucide" | "fontawesome" | "heroicons" | "feather"
    iconName?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

export function ButtonWorkbench({ 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    fullWidth = false,
    children = "Button",
    hasIcon = false,
    iconPosition = "left",
    iconPack = "lucide",
    iconName = "none",
    leftIcon,
    rightIcon
}: ButtonWorkbenchProps) {
    // For demo purposes, we'll use a simple icon implementation
    // In a real app, you'd have proper icon pack integration
    const getDemoIcon = () => {
        if (!hasIcon || iconName === "none") return null
        
        // Simple placeholder icon - in production you'd use actual icon packs
        return (
            <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
            </svg>
        )
    }

    const icon = getDemoIcon()
    const finalLeftIcon = iconPosition === "left" ? icon : leftIcon
    const finalRightIcon = iconPosition === "right" ? icon : rightIcon

    return (
        <Button 
            variant={variant}
            size={size}
            isLoading={isLoading}
            fullWidth={fullWidth}
            leftIcon={finalLeftIcon}
            rightIcon={finalRightIcon}
        >
            {children}
        </Button>
    )
}
