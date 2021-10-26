import { useState } from "react"
import { typeAnswer, typeItensCorrecao, typeQuestions } from "../../components/Interface"

export function useSaveCorrecao(handleDataQuestion: any) {
    const data = {} as typeItensCorrecao
    const [dataItensCorrecao, setDataItensCorrecao] = useState<typeItensCorrecao[]>([])
    function saveQuestions(itemQuestions: typeQuestions,
        answers: typeAnswer[], mostra: boolean) {
        if (!itemQuestions)
            return false

        data.id_perguntas = itemQuestions.id_perguntas ? itemQuestions.id_perguntas : 0
        if (itemQuestions.nota_pergunta === undefined || itemQuestions.nota_pergunta === null) {
            if (mostra)
                alert('Dê uma nota para resposta!')
            return
        } else {
            data.nota = itemQuestions.nota_pergunta
        }
        setDataItensCorrecao([...dataItensCorrecao, data])

        handleDataQuestion(itemQuestions.id_perguntas, { ...itemQuestions, answers })
        return true
    }
    function getDataQ() {
        return dataItensCorrecao
    }

    return { dataQ: dataItensCorrecao, saveQuestions, setDataQ: setDataItensCorrecao, getDataQ }

}