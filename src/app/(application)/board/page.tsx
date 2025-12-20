import { ContactForm } from "@/src/components/board-features/contactForm"
import { HeaderSidebar } from "@/src/components/Layout/HeaderS"

// import { buttonVariants } from "@/src/components/ui/button"
// import Link from "next/link"

export default function Page () {
    return(
        <div>
            <div className="sticky top-0 z-50">
              <HeaderSidebar title="Playground"></HeaderSidebar>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <ContactForm/>
            </div>
        </div>
    )
}