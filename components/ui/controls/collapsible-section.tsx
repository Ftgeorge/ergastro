"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { ReactNode } from "react"

interface CollapsibleSectionProps {
    id: string
    title: string
    isExpanded: boolean
    onToggle: () => void
    count?: number
    children: ReactNode
    className?: string
}

export function CollapsibleSection({ 
    id, 
    title, 
    isExpanded, 
    onToggle, 
    count, 
    children,
    className 
}: CollapsibleSectionProps) {
    return (
        <div className={cn("border-b border-zinc-900/50", className)}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-900/30 transition-colors group"
                aria-expanded={isExpanded}
                aria-controls={`section-${id}`}
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-500 transition-colors">
                        {title}
                    </h3>
                    {count !== undefined && (
                        <span className="text-[9px] font-bold text-zinc-700 bg-zinc-900/50 px-1.5 py-0.5 rounded">
                            {count}
                        </span>
                    )}
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} className="text-zinc-700 group-hover:text-zinc-600 transition-colors" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        id={`section-${id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
