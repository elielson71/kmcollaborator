import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { typeAvaliacao, typeCorrecao, typeItensCorrecao } from "../../components/Interface"
import { postCorrecao } from "../../service/CorrecaoService";

export function useFinalizarAvaliacao(dataQ: typeItensCorrecao[], id_profissional: number,
    avaliacao: typeAvaliacao) {
    const [statusAtividade, setStatusAtividade] = useState('N');
    async function finalizar() {
        setStatusAtividade('F')
        const dataCorrecao = {
            id_profissional:id_profissional,
            id_avaliacao:avaliacao.id_avaliacoes ? avaliacao.id_avaliacoes : 0,
            situacao:'A',
            data_correcao:'',
            itens_correcao:dataQ
        } as typeCorrecao



        if (dataQ.length !== 0)
            await postCorrecao(dataCorrecao)

        return true
    }

    return { finalizar, statusAtividade, setStatusAtividade }
}