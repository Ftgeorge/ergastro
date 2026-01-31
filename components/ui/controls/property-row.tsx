"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PropertyRowProps {
    name: string
    type: string
    children: ReactNode
    className?: string
}

export function PropertyRow({ name, type, children, className }: PropertyRowProps) {
    return (
        <div className={cn(
            "group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20",
            className
        )}>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {name}
                </div>
                <div className="text-[9px] font-medium text-zinc-600 truncate">
                    {type}
                </div>
            </div>
            <div className="shrink-0">
                {children}
            </div>
        </div>
    )
}
