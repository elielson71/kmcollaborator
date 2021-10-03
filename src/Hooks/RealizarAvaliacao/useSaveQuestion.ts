import { useState } from "react"
import { typeAnswer, typeAvaliacao, typeCorrecao, typeQuestions } from "../../components/Interface"

export function useSaveQuestion(itemQuestions: typeQuestions,
    answers: typeAnswer[],
    id_profissional: number,
    avaliacao: typeAvaliacao,handleDataQuestion:any) {
    const data = {} as typeCorrecao
    const [dataQ, setDataQ] = useState<typeCorrecao[]>([])
    function saveQuestions() {
        if (!itemQuestions)
            return false
            
        data.id_perguntas = itemQuestions.id_perguntas ? itemQuestions.id_perguntas : 0

        if (itemQuestions.tipo_resposta === 'L' || itemQuestions.tipo_resposta === 'B') {
            const resposta = answers.filter(item => item.id_perguntas === itemQuestions.id_perguntas)
            if (resposta.length !== 0) {
                if (resposta[0].descricao === '') {
                    alert("Digite sua resposta!")
                    return false
                }
                data.resposta = resposta[0].descricao
            }
        } else {
            const resposta = answers.filter(ans => ans.correta === 'S' && ans.id_perguntas === itemQuestions.id_perguntas)
            if (resposta.length === 0) {
                alert('Responda para prosseguir!')
                return false
            }
            data.id_resposta = resposta[0].id_respostas ? resposta[0].id_respostas : 0
            data.resposta = resposta[0].descricao

        }
        const existemQuestion = dataQ.filter(
            item => item.id_perguntas === itemQuestions.id_perguntas)
        data.id_profissional = id_profissional
        data.id_avaliacao = avaliacao.id_avaliacoes ? avaliacao.id_avaliacoes : 0

        if (existemQuestion.length === 0) {
            setDataQ([...dataQ, data])
        } else {
            setDataQ(prev => prev.map
                (item => item.id_perguntas === itemQuestions.id_perguntas ?
                    {
                        ...item, id_perguntas: data.id_perguntas, resposta:
                            data.resposta, id_resposta: data.id_resposta
                    } : item))
        }
        handleDataQuestion(itemQuestions.id_perguntas,{...itemQuestions,answers})
        return true
    }
    return { dataQ, saveQuestions }
}