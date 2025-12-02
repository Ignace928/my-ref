import { LoginForm } from "@/src/components/login-features/loginForm"
import { SignupForm } from "@/src/components/login-features/signUpForm";
import { CardContent } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Toaster } from "sonner";
export const metadata = {
  title: "Login | my-app",
  description: "Connectez-vous pour accéder au demo",
};

export default function LoginPage() {
  
  return (
        <ScrollArea className="p-6 space-y-4 z-10 h-1/2">
            <CardContent className="flex flex-col gap-3 items-center ">
              <Toaster position="top-center" />

              <Tabs defaultValue="login" className="m-4 md:w-1/3">
                <TabsList>
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-4">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="signup" className="mt-4">
                  <SignupForm />
                </TabsContent>
              </Tabs>

            </CardContent>
        </ScrollArea>
  )
}

// import Confetti from "react-confetti-boom"
      // <Confetti
      //   mode="boom"
      //   particleCount={50}
      //   colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0']}
      // />