


import { forwardRef, useCallback, useImperativeHandle } from "react"
import useTemporizador from "../../Hooks/RealizarAvaliacao/useTemporizador"
interface typeProps {
    tempo: string
    quandoStop:()=>void
}
export interface FormRef {
    start2(): void
}
const Temporarizador = (props:typeProps) => {

    const temp = props.tempo.split(':')
    const { hoursLeft, minutoLeft, secondsLeft } = useTemporizador(
        parseInt(temp[0]), parseInt(temp[1]),
         parseInt(temp[2]),props.quandoStop)
    const exbihora = hoursLeft === 0


    return <>
        <h4>{exbihora ? '' : hoursLeft + ':'}{minutoLeft}:{secondsLeft}</h4>
    </>

}
export default Temporarizador