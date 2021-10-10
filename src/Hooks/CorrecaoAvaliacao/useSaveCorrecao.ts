import { useState, useCallback, useEffect } from "react"
import { typeAnswer, typeAvaliacao, typeCorrecao, typeItensCorrecao, typeQuestions } from "../../components/Interface"

export function useSaveCorrecao(itemQuestions: typeQuestions,
    answers: typeAnswer[], handleDataQuestion: any) {
    const data = {} as typeItensCorrecao
    const [dataItensCorrecao, setDataItensCorrecao] = useState<typeItensCorrecao[]>([])
    function saveQuestions() {
            if (!itemQuestions)
                return false
                
                data.id_perguntas = itemQuestions.id_perguntas ? itemQuestions.id_perguntas : 0
            if (itemQuestions.nota_pergunta === undefined || itemQuestions.nota_pergunta === null) {
                alert('Dê uma nota para resposta!')
                return
            } else {
                data.nota = itemQuestions.nota_pergunta
            }
            setDataItensCorrecao([...dataItensCorrecao, data])

            handleDataQuestion(itemQuestions.id_perguntas, { ...itemQuestions, answers })
            return true
        }

        useEffect(()=>{
            saveQuestions()
        },[])
        return { dataQ: dataItensCorrecao, saveQuestions, setDataQ:setDataItensCorrecao}
    
}