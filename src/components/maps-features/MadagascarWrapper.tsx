"use client"; // ⚠️ Obligatoire

import dynamic from "next/dynamic";
import { HeaderSidebar } from "../Layout/HeaderS";
import { ScrollAreaLarge } from "../features/ScrollAreaLg";
import { Toaster } from "sonner";

// Le composant Leaflet lui-même (Client) à charger dynamiquement
const MadagascarMapClient = dynamic(
  () => import("@/src/components/maps-features/MadaTuils"), 
  { ssr: false }
);

export default function MadagascarMapWrapper() {
    return (
        <div>
            <div className="sticky top-0 z-3">
                <HeaderSidebar title="Leaflet Map" />
            </div>
            <Toaster position="top-center"/>
            <div className="mx-4">
                <MadagascarMapClient />
            </div>
        </div>
    );
}
