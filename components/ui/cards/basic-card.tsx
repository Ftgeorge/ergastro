export function BasicCard() {
    return (
        <div className="w-full max-w-xs overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-900" />
            <div className="p-4">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Card Title</h4>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    This is a simple card component used for displaying content in a grid.
                </p>
            </div>
        </div>
    )
}
