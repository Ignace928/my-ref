import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const FlyToPosition = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 16); // recentre la carte en douceur
  }, [position, map]);
  return null;
};
