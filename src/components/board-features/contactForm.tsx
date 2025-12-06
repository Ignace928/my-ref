"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { MessageSchema, MessageType } from "@/src/lib/Model/message";
import { useNodeMailer } from "./useMessage";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import { Field, FieldGroup, FieldSeparator, FieldSet } from "../ui/field";



export function ContactForm() {
  const { register, handleSubmit, formState, reset } = useForm<MessageType>({
    resolver: zodResolver(MessageSchema),
  });

  const { sendMessage, sending } = useNodeMailer();

  const onSubmit: SubmitHandler<MessageType> = (data) => {
    sendMessage({ nom: data.nom, mail: data.mail, phone: data.phone, object:data.object, message: data.message });
    sendMessage(data); // appelle ton mutation
    reset()
  };

  return (
        <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle><h1>Contactez-moi 👇</h1></CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FieldSet>
                <FieldGroup className="flex flex-row">
                    <Field>
                        <Label>Nom</Label>
                        <Input type="text" {...register("nom")} className="mt-2" placeholder="Nico ROBIN" />
                        {formState.errors.nom && (
                            <p className="text-destructive text-sm">{formState.errors.nom.message}</p>
                        )}
                    </Field>
                    <Field>
                        <Label>Gmail</Label>
                        <Input type="mail" {...register("mail")} className="mt-2" placeholder="nicorobin@gmail.com"/>
                        {formState.errors.mail && (
                            <p className="text-destructive text-sm">{formState.errors.mail.message}</p>
                        )}
                    </Field>
                    <Field>
                        <Label>Numero mobile</Label>
                        <Input type="text" {...register("phone")} className="mt-2" placeholder="+261 ..."/>
                        {formState.errors.phone && (
                            <p className="text-destructive text-sm">{formState.errors.phone.message}</p>
                        )}
                    </Field>
                </FieldGroup>

                <FieldSeparator/>

                <FieldGroup>
                    <Field>
                        <Label>Objet de votre mail:</Label>
                        <Input type="text" {...register("object")} className="mt-2" placeholder="L'objet de votre message" />
                        {formState.errors.object && (
                            <p className="text-destructive text-sm">{formState.errors.object.message} </p>
                        )}
                    </Field>
                    <Field>
                        <Label>Message</Label>
                        <Textarea {...register("message")} className="mt-2" placeholder="Salut, voici ce qu j'ai à vous dire.... " />
                        {formState.errors.message && (
                            <p className="text-destructive text-sm">{formState.errors.message.message}</p>
                        )}
                    </Field>
                </FieldGroup>
                


                <CardFooter className="flex gap-2">
                <Button type="submit" disabled={sending}>
                    Envoyer<Send/>
                </Button>
                </CardFooter>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
