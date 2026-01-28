import Link from "next/link"
import { Construction, Lightbulb, ListTodo, GitBranch, FlaskConical, Gauge, Activity, Timer } from "lucide-react"
import { components } from "@/lib/component-registry"

export default function WorkbenchPage() {
    const inProgressCount = components.filter(c => c.status === "in-progress").length;
    const experimentalCount = components.filter(c => c.status === "experimental").length;

    return (
        <div className="min-h-screen bg-zinc-950 py-16 text-zinc-100 font-sans selection:bg-accent selection:text-accent-foreground">
            <div className="container mx-auto max-w-5xl px-4">
                <header className="mb-16">
                    <Link
                        href="/workshop/components"
                        className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
                    >
                        <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
                        Workshop Inventory
                    </Link>
                    <div className="flex flex-col gap-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            Active Working Space
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter sm:text-6xl">
                            Workbench
                        </h1>
                        <p className="max-w-2xl text-lg text-zinc-500 leading-relaxed font-medium">
                            A less-polished area for active experiments, raw ideas, and engineering refactors. Process is the priority here.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Working Columns */}
                    <div className="lg:col-span-2 flex flex-col gap-8">

                        {/* 🧪 In Progress Section */}
                        <section className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8">
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-blue-500">
                                    <FlaskConical size={20} />
                                    <h2 className="text-xs font-black uppercase tracking-[0.2em]">🧪 In Progress</h2>
                                </div>
                                <span className="text-[10px] font-bold text-zinc-600">{inProgressCount} Active Tickets</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {components.filter(c => c.status === "in-progress").map(c => (
                                    <Link
                                        key={c.slug}
                                        href={`/workshop/components/${c.slug}`}
                                        className="group flex flex-col gap-2 rounded-xl border border-zinc-900 bg-zinc-950 p-6 transition-all hover:border-blue-500/30"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-black text-zinc-200 group-hover:text-blue-400 transition-colors">{c.name}</span>
                                            <Timer size={14} className="text-zinc-800" />
                                        </div>
                                        <p className="text-xs text-zinc-500 font-medium italic">Current state: Alpha testing for Ergastro layout constraints.</p>
                                    </Link>
                                ))}
                                {inProgressCount === 0 && <p className="text-xs text-zinc-700 italic">No components currently in the active build phase.</p>}
                            </div>
                        </section>

                        {/* 🧠 Ideas & Concepts */}
                        <section className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8">
                            <div className="mb-8 flex items-center gap-3 text-amber-500">
                                <Lightbulb size={20} />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em]">🧠 Ideas & Concepts</h2>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex flex-col gap-2">
                                    <span className="text-sm font-black text-zinc-200">Variable Typography Scaling</span>
                                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                                        Moving from viewport-based scaling to container-query-based fluid type. Essential for highly nested dashboard layouts.
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="rounded bg-zinc-900 px-2 py-0.5 text-[9px] font-bold text-zinc-600 uppercase">Architecture</span>
                                        <span className="rounded bg-zinc-900 px-2 py-0.5 text-[9px] font-bold text-zinc-600 uppercase">Optimization</span>
                                    </div>
                                </li>
                                <li className="border-t border-zinc-900/50 pt-6 flex flex-col gap-2 opacity-50">
                                    <span className="text-sm font-black text-zinc-200">System-wide Glassmorphism Refactor</span>
                                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                                        Standardizing refraction and saturation values across all interactive overlays.
                                    </p>
                                </li>
                            </ul>
                        </section>

                        {/* 🔧 System Refactors */}
                        <section className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8">
                            <div className="mb-8 flex items-center gap-3 text-emerald-500">
                                <GitBranch size={20} />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em]">🔧 System Refactors</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-6 flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Priority: High</span>
                                        <div className="h-px flex-1 bg-zinc-900" />
                                    </div>
                                    <h4 className="text-sm font-black text-zinc-300">Tailwind v4 Variable Migration</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                                        Reason: Legacy color assignments in early components cause theme drift. Standardizing on CSS variables for accent colors.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Metrics & Tools */}
                    <aside className="flex flex-col gap-8">
                        <section className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8">
                            <div className="mb-6 flex items-center gap-3 text-zinc-400">
                                <Gauge size={18} />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">System State</h2>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-black">{experimentalCount}</span>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Experimental Patterns</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-black">40%</span>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Average Reuse Rate</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-black">2.4s</span>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Mean Time to Build</span>
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-900 p-8 text-zinc-700">
                            <Construction size={40} className="mb-4 opacity-10" />
                            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                                Reserved Space for Active Development
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
