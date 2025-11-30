
import { HeaderBar } from "../components/features/barHead";
import TypingStep from "@/src/components/features/TypingStep";
import AnimatedProfile from "../components/features/AnimatedProfile";
import SectionProfile from "../components/features/SectionProfile";
import { ScrollArea } from "../components/ui/scroll-area";

export default function MyHome() {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex flex-col gap-4 text-center">
        
        {/* Section profil avec animation */}
          <AnimatedProfile />
        {/* Header sticky */}
        <div className="sticky top-0 z-3">
          <HeaderBar />
        </div>

        {/* Section TypingStep */}
        <section className="flex items-center justify-center h-200">
          <TypingStep 
            text={["J'❤ React", "J'🧡 Next", "J'💚 JavaScript", "J'💙 Python"]} 
            speed={90} 
            pause={1000} 
            startAt={5000}
          />
        </section>

        {/* Section texte important */}
        <SectionProfile/>
      </div>
    </ScrollArea>
  );
}
