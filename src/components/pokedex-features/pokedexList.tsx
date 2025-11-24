"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { usePokedex } from "@/src/hooks/use-pokedex";

export default function PokedexTable() {
  const { data: pokedex, isLoading, error } = usePokedex();

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Type 1</TableHead>
          <TableHead>Type 2</TableHead>
          <TableHead>HP</TableHead>
          <TableHead>Attaque</TableHead>
          <TableHead>Défense</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokedex?.map((p) => (
          <TableRow key={p.NUMERO}>
            <TableCell>{p.NUMERO}</TableCell>
            <TableCell>{p.NOM}</TableCell>
            <TableCell>{p.TYPE_1}</TableCell>
            <TableCell>{p.TYPE_2 ?? "-"}</TableCell>
            <TableCell>{p.POINTS_DE_VIE}</TableCell>
            <TableCell>{p.NIVEAU_ATTAQUE}</TableCell>
            <TableCell>{p.NIVEAU_DEFENSE}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  );
}
