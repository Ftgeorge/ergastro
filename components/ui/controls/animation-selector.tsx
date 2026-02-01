"use client"

import { Dropdown } from "@/components/ui/dropdown"
import { motion, AnimatePresence } from "framer-motion"
import { useWorkbenchStore } from "@/lib/workbench-store"

interface AnimationSelectorProps {
    animation: {
        id: string
        trigger: string
        config: {
            duration?: number
            delay?: number
        }
    } | null
    onAnimationChange: (animationId: string) => void
    disabled?: boolean
    hasIcon?: boolean // New prop to check if button has an icon
}

export function AnimationSelector({ animation, onAnimationChange, disabled, hasIcon = false }: AnimationSelectorProps) {
    const { animationPresets } = useWorkbenchStore()
    
    // Create dynamic animation options from the store - only basic animations now
    const animationOptions = [
        { value: 'none', label: 'None' },
        // Basic animations only - icon animations removed
        ...Object.entries(animationPresets)
            .filter(([id]) => !id.startsWith('icon-'))
            .map(([id, preset]) => ({
                value: id,
                label: preset.preset.name
            }))
    ]
    return (
        <div className="px-4 py-3 space-y-3">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Preset
                </label>
                <Dropdown
                    value={animation?.id || 'none'}
                    onValueChange={onAnimationChange}
                    options={animationOptions}
                    variant="default"
                    disabled={disabled}
                    aria-label="Select animation"
                />
            </div>

            <AnimatePresence>
                {animation && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 pt-2 border-t border-zinc-900/50"
                    >
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-zinc-600">Trigger</span>
                            <span className="text-zinc-400 font-medium">{animation.trigger}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-zinc-600">Duration</span>
                            <span className="text-zinc-400 font-medium">
                                {animation.config.duration ? `${animation.config.duration}s` : 'N/A'}
                            </span>
                        </div>
                        {animation.config.delay !== undefined && (
                            <div className="flex items-center justify-between text-[10px]">
                                <span className="text-zinc-600">Delay</span>
                                <span className="text-zinc-400 font-medium">{animation.config.delay}s</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
