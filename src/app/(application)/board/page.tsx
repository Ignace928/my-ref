import { HeaderSidebar } from "@/src/components/Layout/HeaderS"

import { buttonVariants } from "@/src/components/ui/button"
import Link from "next/link"

export default function Page () {
    return(
        <div>
            <div className="sticky top-0 z-50">
              <HeaderSidebar title="Dashboard"></HeaderSidebar>
            </div>
            <div className="flex flex-col gap-4">
                <Link href="/board/citations/2" className={buttonVariants({size:'lg', variant:"outline"})}>citation 2</Link>
                <Link href="/board/citations/qsdjfhzsmj" className={buttonVariants({size:'lg', variant:"outline"})}>citation qsdjfhz smj </Link>
                <Link href="/board/citations/Melvin" className={buttonVariants({size:'lg', variant:"outline"})}>citation Melvin</Link>
                <Link href="/board/citations/Blabla" className={buttonVariants({size:'lg', variant:"outline"})}>citation Blabla</Link>
                <Link href="/board/citations/Blabla" className={buttonVariants({size:'lg', variant:"outline"})}>citation Blabla</Link>
                <Link href="/board/citations/Blabla" className={buttonVariants({size:'lg', variant:"outline"})}>citation Blabla</Link>
            </div>
        </div>
    )
}