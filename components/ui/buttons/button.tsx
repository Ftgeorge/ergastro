import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success"
  | "warning"

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  // Workbench icon props
  hasIcon?: boolean
  iconPack?: string
  iconName?: string
  iconPosition?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 active:opacity-80 shadow-sm",
  secondary:
    "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 active:bg-zinc-700 shadow-sm",
  outline:
    "border border-zinc-800 bg-transparent text-zinc-200 hover:bg-zinc-900/40 active:bg-zinc-900/60",
  ghost:
    "bg-transparent text-zinc-200 hover:bg-zinc-900/40 active:bg-zinc-900/60",
  destructive:
    "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm",
  warning:
    "bg-amber-500 text-zinc-950 hover:bg-amber-600 active:bg-amber-700 shadow-sm",
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs rounded",
  sm: "px-3 py-2 text-sm rounded-md",
  md: "px-4 py-2.5 text-base rounded-md",
  lg: "px-6 py-3 text-lg rounded-lg",
  xl: "px-8 py-4 text-xl rounded-lg",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    // Destructure workbench props to avoid leaking to DOM
    hasIcon,
    iconPack,
    iconName,
    iconPosition,
    disabled,
    children,
    ...props
  }, ref) => {
    // Dynamically render workbench icon if provided
    const RenderedIcon = () => {
      if (!hasIcon || !iconName || iconName === "none") return null

      const IconComponent = (LucideIcons as any)[iconName]
      if (!IconComponent) return null

      return <IconComponent size={size === "xs" || size === "sm" ? 14 : 16} />
    }

    const finalLeftIcon = iconPosition === "left" ? <RenderedIcon /> : leftIcon
    const finalRightIcon = iconPosition === "right" ? <RenderedIcon /> : rightIcon

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60",
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          // Custom className
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <LucideIcons.Loader2 className="animate-spin h-4 w-4" />
        )}
        {!isLoading && finalLeftIcon && <span className="shrink-0">{finalLeftIcon}</span>}
        {children}
        {!isLoading && finalRightIcon && <span className="shrink-0">{finalRightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = "Button"

export type { ButtonVariant, ButtonSize }