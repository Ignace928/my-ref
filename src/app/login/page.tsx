
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import ThemeSwitcher from "@/src/components/Theme/themeChoose"
import { LoginVmodel } from "@/src/components/login-features/loginvm"


export default function LoginPage() {
  
  return (
    
    <div className="p-4 relative">
      <Card className="p-6 space-y-4 relative z-10">
        <h1 className="text-xl font-bold">Login page</h1>
        <LoginVmodel/>
      </Card>

      {/* Confetti overlay */}
      
      <ThemeSwitcher/>
    </div>
  )
}

// import Confetti from "react-confetti-boom"
      // <Confetti
      //   mode="boom"
      //   particleCount={50}
      //   colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0']}
      // />