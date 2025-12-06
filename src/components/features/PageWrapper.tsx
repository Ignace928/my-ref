// components/page-wrapper.tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  // La classe 'h-dvh' (dynamic viewport height) assure que le composant prend
  // toute la hauteur disponible de l'écran, en s'adaptant dynamiquement
  // aux interfaces des navigateurs mobiles (barres d'adresse, etc.).
  return (
    <ScrollArea className="h-dvh w-full">
      {/* Le contenu principal de la page */}
      <div className="p-4 md:p-8">
        {children}
      </div>
      
      {/* Optionnel: ajoute une barre de défilement horizontale si nécessaire */}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default PageWrapper;
