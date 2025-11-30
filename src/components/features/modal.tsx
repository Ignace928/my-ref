


import { ReactNode } from "react";
import { Button } from "../ui/button";
import { 
  Dialog,
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

export function DialogDemo({children}:{children:ReactNode}) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
  )
}
