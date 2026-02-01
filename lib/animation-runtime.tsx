import { AnimationNode } from './workbench-store'

export class AnimationRuntime {
    static generateAnimationCode(animation: AnimationNode) {
        console.log('AnimationRuntime.generateAnimationCode called with:', animation)
        const { preset, config } = animation
        
        // Convert easing names to Framer Motion format
        const getEasing = (easing?: string) => {
            switch (easing) {
                case 'ease-out': return 'easeOut'
                case 'ease-in': return 'easeIn'
                case 'ease-in-out': return 'easeInOut'
                case 'linear': return 'linear'
                default: return 'easeOut'
            }
        }
        
        let result
        
        switch (preset.type) {
            case 'fade':
                result = {
                    framerMotion: {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: {
                            duration: config.duration || 0.25,
                            ease: getEasing(config.easing)
                        }
                    }
                }
                break
            
            case 'slide':
                result = {
                    framerMotion: {
                        initial: { y: 20, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        transition: {
                            duration: config.duration || 0.35,
                            ease: getEasing(config.easing),
                            delay: config.delay || 0
                        }
                    }
                }
                break
            
            case 'scale':
                result = {
                    framerMotion: {
                        initial: { scale: 0.8, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        transition: {
                            duration: config.duration || 0.2,
                            ease: getEasing(config.easing)
                        }
                    }
                }
                break
            
            case 'bounce':
                result = {
                    framerMotion: {
                        whileHover: {
                            scale: [1, 1.3, 0.9, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                            transition: {
                                duration: config.duration || 0.6,
                                ease: getEasing(config.easing),
                                delay: config.delay || 0.1,
                                repeat: config.repeat || 0,
                                repeatType: config.repeat === 'infinite' ? 'loop' : 'reverse'
                            }
                        }
                    }
                }
                break
            
            case 'rotate':
                result = {
                    framerMotion: {
                        whileHover: {
                            rotate: [0, 360],
                            transition: {
                                duration: config.duration || 0.5,
                                ease: getEasing(config.easing),
                                delay: config.delay || 0,
                                repeat: config.repeat === 'infinite' ? 'loop' : 0
                            }
                        }
                    }
                }
                break
            
            case 'stagger':
                result = {
                    framerMotion: {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: {
                            duration: config.duration || 0.3,
                            ease: getEasing(config.easing),
                            delay: config.delay || 0.05,
                            staggerChildren: 0.1
                        }
                    }
                }
                break
            
            default:
                result = {
                    framerMotion: {
                        initial: {},
                        animate: {},
                        transition: {}
                    }
                }
        }
        
        console.log('AnimationRuntime result for', preset.type, ':', result)
        return result
    }
    
    static generateComponentAnimationCode(targetId: string, animations: AnimationNode[], library: string = 'framer-motion') {
        return animations.map(anim => {
            const code = this.generateAnimationCode(anim)
            
            switch (library) {
                case 'framer-motion':
                    return `motion.div ${Object.entries(code.framerMotion)
                        .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
                        .join(' ')}`
                
                default:
                    return `// Animation for ${anim.preset.name}: ${JSON.stringify(code)}`
            }
        }).join('\n\n')
    }
}
