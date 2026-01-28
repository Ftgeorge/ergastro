export function SecondaryButton() {
    return (
        <button className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-100 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 active:bg-zinc-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">
            Secondary Button
        </button>
    )
}

export function OutlineButton() {
    return (
        <button className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-6 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-all hover:border-accent/50 hover:text-zinc-100 disabled:pointer-events-none disabled:opacity-50">
            Outline Button
        </button>
    )
}
