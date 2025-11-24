"use client";

import {useState, useEffect} from 'react'

interface TypingStepProps {
    text: string[],
    speed: number,
    startAt: number,
    pause: number
}

export default function TypingStep({text, speed, pause, startAt}:TypingStepProps){
    const [displayed, setDisplayed] = useState<string>("");
    const [indexMessage, setIndexMessage] = useState<number>(0)
    const [deleter, setDeleter] = useState<boolean>(false);
    const [caractere, setCaractere] = useState<number>(0)
    const [showEm, setShowEm] = useState<boolean>(false)
    
    useEffect(() => {
        setTimeout(()=>setShowEm(true), startAt)
        const message = text[indexMessage]
        
        function type() {
            setDisplayed(message.slice(0, caractere+1))
            if(caractere+1 === message.length){
                setTimeout(()=>{
                    setDeleter(true)
                },pause)
            }
            else setCaractere(caractere + 1)
        }
        function deleteType() {
            if(caractere === 0){
                setDeleter(false)
                setIndexMessage((indexMessage+1)  % text.length)
            }
            else{
                setDisplayed(message.slice(0, caractere -1))
                setCaractere(caractere - 1)
            }
        }
        
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !deleter ? setTimeout(type, speed) : setTimeout(deleteType, speed/3)
     },[caractere, deleter, indexMessage, text, speed, pause, startAt])
    return showEm &&(
        <span className="font-bold text-2xl">
            {displayed}
            <span className="inline-block w-1 h-6 bg-primary ml-1 animate-[blink_2s_step-start_infinite]"></span>
        </span>
    )
}

