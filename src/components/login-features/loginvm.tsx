"use client";

import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ModularModal } from "../features/ModularModal";
import { Label } from "@radix-ui/react-dropdown-menu";


export function LoginVmodel() {
  // Fonction minimale : affiche juste dans la console

  const handleAddOne = () => {
    // form.handleSubmit((values) => {
    //   console.log("💚 Form values:", values);
    //   form.reset();
    // })();
  };

  return (
    <Card className="">
      <div className="container mx-auto py-10 px-10">
        <ModularModal
          title="Login"
          description=" Ultra Modular modal"
          triggerLabel="Ajout Type"
          actionLabel="Login"
          activate={handleAddOne} // affiche juste dans la console
        >
          <>
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input id="email" placeholder="exemple@gmail.com"/>
            </div>

            <div className="grid gap-3">
              <Label>Description</Label>
              <Textarea id="desc" placeholder="Description"/>
            </div>
          </>
        </ModularModal>
      </div>
    </Card>
  );
}
