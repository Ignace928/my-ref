"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/src/components/ui/card";
import TypingNoStep from "@/src/components/features/Typing";

export default function AnimatedProfile() {
  const { scrollY } = useScroll();

  const opacities = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleZoom = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
        <Card className="flex flex-col p-0 md:flex-row items-center justify-start gap-1 backdrop-blur-xl rounded-[0_0_80_2] text-sm shadow-[0_0_10px_var(--color-primary)]">

            <motion.section 
                style={{ opacity: opacities, scale: scaleZoom }} 
                className="border border-primary border-bl-0 border-t-0 border-l-0 border-r-0 p-2 rounded-r-full"
            >
                <Card 
                className="border border-primary rounded-full h-40 w-40 bg-cover bg-center"
                style={{ backgroundImage: "url(https://vqtoojvjnpjulqlrtlgd.supabase.co/storage/v1/object/public/me/profile/ssdfh65984324sqsdfizdopi9556.jpg)" }}
                />
            </motion.section>

            
            <motion.section 
                style={{ opacity: opacities, scale: scaleZoom }} 
                className="w-full"
                >
                <Card className="border border-primary border-b-0 border-r-0 border-l-0 h-40 font-bold text-2xl rounded-[80_0_80_2] justify-center">
                    <TypingNoStep 
                        message="RAHARIMALALA Santatry Ny Aina Edwardo Ignace" 
                        speed={100} 
                        startAt={0} 
                    /> 
                </Card>
            </motion.section>
        </Card>
  );
}


{/* <motion.section 
                transition={{ ease: "easeIn", duration: 0.5 }} 
                style={{ y: translateYText, opacity: opacities }} 
                
></motion.section> */}