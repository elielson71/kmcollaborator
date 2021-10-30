import { useCallback, useEffect, useState } from "react";
import { clearInterval } from "timers";
export default function useTemporizador(hora: number, minuto: number, segundo: number,quandoStop:()=>void) {
    const [secondsLeft, setSecondsLeft] = useState(segundo === 0 ? 0 : segundo);
    const [minutoLeft, setMinutoLeft] = useState(minuto);
    const [hoursLeft, setHoursLeft] = useState(hora);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const start = useCallback(() => {
        const timer2 = setInterval(() => {
            setSecondsLeft((secondsLeft) => {

                if (secondsLeft ===1)
                    clearTimeout(timer2)
                return secondsLeft - 1
            });

        }, 1000);
        setTimer(timer);
        //return timer2
    }, []);

    useEffect(() => {
        setSecondsLeft(segundo)
        setMinutoLeft(minuto)
        setHoursLeft(hora)
    }, [minuto, hora, segundo])
    useEffect(() => {
        start()
    }, [])
    useEffect(() => {
        if (secondsLeft === 0) {
            setSecondsLeft(59)
            if (minutoLeft !== 0)
                setMinutoLeft(pre => pre - 1)
            if (minutoLeft === 0) {
                if (hoursLeft !== 0) {
                    setHoursLeft(pre => pre - 1)
                    setMinutoLeft(59)
                }
            }
            if (hoursLeft === 0 && minutoLeft === 0 && secondsLeft === 0) {
                clearInterval(timer as NodeJS.Timeout);
                quandoStop()
                setSecondsLeft(0)
            }

        }

    }, [secondsLeft, timer]);
    useEffect(() => {
        return () => clearInterval(timer as NodeJS.Timeout);
    }, [timer]);
    const finalizouContagem = () => hoursLeft === 0 && minutoLeft === 0 && secondsLeft === -1

    return { secondsLeft, minutoLeft, hoursLeft, finalizouContagem }

}
