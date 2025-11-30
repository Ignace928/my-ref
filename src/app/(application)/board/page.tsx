import { HeaderSidebar } from "@/src/components/Layout/HeaderS"

// import { buttonVariants } from "@/src/components/ui/button"
// import Link from "next/link"

export default function Page () {
    return(
        <div>
            <div className="sticky top-0 z-50">
              <HeaderSidebar title="Dashboard"></HeaderSidebar>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted aspect-video rounded-xl" />
                    <div className="bg-muted aspect-video rounded-xl" />
                    <div className="bg-muted aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </div>
    )
}