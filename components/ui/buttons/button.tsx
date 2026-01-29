import { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "outline"

type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
}

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg disabled:pointer-events-none disabled:opacity-50",
                size === "sm" && "h-9 px-4 text-xs",
                size === "md" && "h-10 px-6 text-sm",
                size === "lg" && "h-12 px-8 text-base",
                variant === "primary" &&
                    "bg-accent font-black uppercase tracking-widest text-accent-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
                variant === "secondary" &&
                    "bg-zinc-100 font-medium text-zinc-900 transition-colors hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
                variant === "outline" &&
                    "border border-zinc-800 bg-transparent font-bold uppercase tracking-widest text-zinc-400 transition-all hover:border-accent/50 hover:text-zinc-100",
                className
            )}
            {...props}
        />
    )
}

export type { ButtonVariant, ButtonSize }
