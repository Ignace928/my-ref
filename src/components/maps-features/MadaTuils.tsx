"use client";


import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FlyToPosition } from "./Flying";
import { LoaderIcon } from "lucide-react";

// Fix icônes Leaflet
interface IconDefaultWithFix extends L.Icon.Default { _getIconUrl?: () => string; }
delete (L.Icon.Default.prototype as IconDefaultWithFix)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export default function MadagascarMapCard() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [follow, setFollow] = useState(false); // pour activer le recentrage
  const [watcherId, setWatcherId] = useState<number | null>(null); // id du watchPosition
  const zoom = 16;

  // Démarrer le suivi quand "Me" est cliqué
  const startGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error("Géolocalisation non supportée par le navigateur");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => toast.error(err.message),
      { enableHighAccuracy: true }
    );
    setWatcherId(id);
    setFollow(true);
  };

  // Nettoyage quand le composant se démonte
  useEffect(() => {
    return () => {
      if (watcherId !== null) navigator.geolocation.clearWatch(watcherId);
    };
  }, [watcherId]);

  if (!userPosition)
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center">
          <LoaderIcon className="animate-spin mb-2" />
          <Button onClick={startGeolocation}>Activer ma position</Button>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle>Votre position en temps réel</CardTitle>
      </CardHeader>

      <CardContent className="p-0 relative">
        <div className="w-full h-[50vh] sm:h-[60vh] md:h-[60vh] relative">
          <MapContainer center={userPosition} zoom={zoom} className="w-full h-full z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker position={userPosition}>
              <Popup>Moi</Popup>
            </Marker>

            {follow && <FlyToPosition position={userPosition} />}
          </MapContainer>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => {
            setFollow(true);
            toast.success(`Lat: ${userPosition[0]}, Lon: ${userPosition[1]}`);
          }}
        >
          Me
        </Button>
      </CardFooter>
    </Card>
  );
}
