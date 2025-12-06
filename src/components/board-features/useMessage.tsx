import { sendMessage } from "@/src/app/(application)/board/action_contact";
import { MessageType } from "@/src/lib/Model/message";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useNodeMailer() {
  const sendMail = useMutation({
    mutationFn: async (data: MessageType) => sendMessage(data),
    onSuccess: () => {
      toast.success("Message envoyé ");
    },
    onError: (error) => {
      toast.error(error.message || "Message Error.");
    },
  });

  return {
    sendMessage: sendMail.mutate,
    sending: sendMail.isPending,
  };
}