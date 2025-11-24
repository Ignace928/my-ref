"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "../ui/button";


type modalsProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  triggerLabel?: string; // facultatif
  actionLabel: string;
  activate: () => void;
  children: ReactNode;
};

export function ModularModal({ open, onOpenChange, title, description, triggerLabel, actionLabel, activate, children } : modalsProps) {
    const dialogProps = (open !== undefined && onOpenChange !== undefined)
      ? { open, onOpenChange } // Mode contrôlé
      : {};

  return (
    <Dialog {...dialogProps}>
        {
            triggerLabel && (
                <DialogTrigger asChild>
                    <Button variant="outline">{triggerLabel}</Button>
                </DialogTrigger>
            )
        }

        <DialogContent className="sm:max-w-[425px]">
          <section>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </section>

          <form onSubmit={(e) => { e.preventDefault(); activate(); }}>
          <div className="grid gap-4">
            {
                children
            }
          </div>

          <footer className="py-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={activate}>{actionLabel}</Button>
          </footer>

          </form>
        </DialogContent>
    </Dialog>
  );
}
