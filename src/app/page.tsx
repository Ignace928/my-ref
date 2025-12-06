
import { HeaderBar } from "../components/features/barHead";
import TypingStep from "@/src/components/features/TypingStep";
import SectionProfile from "../components/features/SectionProfile";
import { ScrollArea } from "../components/ui/scroll-area";
import TypingNoStep from "../components/features/Typing";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";

export default function MyHome() {
  return (
    <ScrollArea className="w-full h-screen flex flex-col gap-4 text-center">
        <div className="sticky top-0 z-3">
          <HeaderBar />
        </div>

        {/* Lien sticky en dessous du header */}
        <div className="sticky top-12 z-20 flex justify-center py-2 ">
          <Link
            href="/tasks"
            className={`${buttonVariants({ variant: "outline" })} w-auto`}
          >
            <TypingNoStep message="Made with " speed={100} startAt={0} />
            <TypingStep
              text={["❤ TypeScript", "🧡 Next", "💚 Supabase", "💙 Prisma"]}
              speed={90}
              pause={1000}
              startAt={3000}
            />
          </Link>
        </div>



          

        {/* Section texte important */}
        <div className="h-200">
          <SectionProfile/>
        </div>
        <div className="">
          <SectionProfile/>
        </div>
    </ScrollArea>
  );
}
