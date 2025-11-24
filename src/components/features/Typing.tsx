"use client"
import { useState, useEffect } from "react";

interface TypingNoStepProps {
  message: string,
  speed: number,
    startAt: number
}
export default function TypingNoStep({message, speed, startAt}:TypingNoStepProps){
  const [displayed, setDisplayed] = useState<string>("");
  const [caractere, setCaractere] = useState<number>(0)
  const [cursor, setCursor] = useState<boolean>(true)
    const [showEm, setShowEm] = useState<boolean>(false)
  
   useEffect(() => {
      setTimeout(()=>setShowEm(true), startAt)
      function type() {
        if(caractere > message.length){
          return setTimeout(()=>setCursor(false), 1500)
        }
          setDisplayed(message.slice(0, caractere+1))
          setCaractere(caractere + 1)
      }
      
      setTimeout(type, speed) 
   },[caractere, displayed, cursor, message, speed, startAt])
  return showEm && (
      <p>
          {displayed}
          {cursor && <span className="inline-block w-2 h-2 rounded-full bg-primary ml-1 animate-ping"></span>}
      </p>
  )
}