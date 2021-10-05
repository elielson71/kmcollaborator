import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { typeCorrecao } from "../../components/Interface"
import { postCorrecao } from "../../service/CorrecaoService";
import { useNavegacao } from "./useNavegacao";

export function useFinalizarAvaliacao(dataQ: typeCorrecao[]) {
    const [statusAtividade, setStatusAtividade] = useState('N');
    async function finalizar() {
        setStatusAtividade('F')
        if (dataQ.length !== 0)
            await postCorrecao(dataQ)

        return true
    }

    return { finalizar, statusAtividade, setStatusAtividade }
}