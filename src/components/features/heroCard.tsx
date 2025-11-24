import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import TypingNoStep from "./Typing";

export default function HeroCard(){
    return(
        <Card className="w-full h-50 p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex justify-center md:justify-start w-full md:w-auto">
                <Image
                    src="http://127.0.0.1:9000/mock-pokemon/image/6.png"
                    alt="photo de profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                />
                <CardContent className="p-0 text-center md:text-left">
                    <section className="font-bold text-2xl bg-amber-500">
                        <TypingNoStep message="RAHARIMALALA Santatry Ny Aina Edwardo Ignace" speed={100} startAt={0}/>            
                    </section>
                </CardContent>
            </div>
        </Card>
    )
}