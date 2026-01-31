"use client"

import { CompactDropdown } from "./compact-dropdown"
import { motion, AnimatePresence } from "framer-motion"

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
}

const animationOptions = [
    { value: 'none', label: 'None' },
    { value: 'fade-in', label: 'Fade In' },
    { value: 'slide-up', label: 'Slide Up' },
    { value: 'scale-in', label: 'Scale In' },
    { value: 'hover-lift', label: 'Hover Lift' },
    { value: 'stagger-children', label: 'Stagger Children' },
]

export function AnimationSelector({ animation, onAnimationChange, disabled }: AnimationSelectorProps) {
    return (
        <div className="px-4 py-3 space-y-3">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Preset
                </label>
                <CompactDropdown
                    value={animation?.id || 'none'}
                    onValueChange={onAnimationChange}
                    options={animationOptions}
                    width="auto"
                    disabled={disabled}
                    ariaLabel="Select animation"
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
