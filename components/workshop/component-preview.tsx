import { ReactNode } from "react"

interface ComponentPreviewProps {
    children: ReactNode
}

export function ComponentPreview({ children }: ComponentPreviewProps) {
    return (
        <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/50">
            {children}
        </div>
    )
}
