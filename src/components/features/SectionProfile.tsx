"use client";

import { motion } from "framer-motion";
export default function SectionProfile() {
//   const { scrollY } = useScroll();

//   const translateY = useTransform(scrollY, [0, 300], [4, -50]);
//   const translateYText = useTransform(scrollY, [0, 300], [0, 50]);
//   const opacities = useTransform(scrollY, [0, 300], [1, 0]);
//   const scaleZoom = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
        <motion.section 
            className="font-bold text-2xl h-200"
            initial={{opacity:0 , y:40}}
            whileInView={{opacity:1, y:0}}
            viewport={{once: false, amount:0.6}}
            transition={{duration: 1}}
        >
            RAHARIMALALA SANTATRY NY AINA       
        </motion.section>
  );
}
