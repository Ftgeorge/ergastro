import { WorkshopSidebar } from "@/components/workshop/workshop-sidebar"

export default function WorkshopComponentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-zinc-950">
            {/* Sidebar - Fixed width, scrollable */}
            <WorkshopSidebar className="w-80 flex-shrink-0" />

            {/* Main Pane - Flexible, scrollable */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
