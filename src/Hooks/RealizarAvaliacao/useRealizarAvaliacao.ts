import { useQuestion } from "../Question/useQuestion";
import { useAvaliacoes } from "../../Hooks/Avaliacao/useAvaliacoes";
import { typeQuestions } from "../../components/Interface";
import { useEffect, useState } from "react";
import { getAvaliacoesItenQuestions } from "../../service/AvaliacoesService";

export function useRealizarAvaliacao(avaliacaoId: number) {
    const [paginacao, setPaginacao] = useState(1)
    const { handleIsTrue, answers, setAnswers, RecuperarQuestao, handleAddAnswer } = useQuestion('')
    const [itemQuestions, setItemQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_responsavel: 0, senioridade: '', id_departamento: 0, nivel: '' });
    const [dataQuestions, setAdataQuestions] = useState<typeQuestions[]>([])
    const [statusAtividade, setStatusAtividade] = useState('N');
    const { avaliacao } = useAvaliacoes(avaliacaoId as unknown as string)
    

    function carregarOneQuestion(p: number) {
        if (dataQuestions[p]) {
            setItemQuestions(dataQuestions[p])
            RecuperarQuestao(dataQuestions[p].id_perguntas as unknown as string)
        }
    }
    useEffect(() => {
        setPaginacao(1)
        async function getQuestion(avaliacaoId: number) {
            const data = (await getAvaliacoesItenQuestions(avaliacaoId)).data
            if (data.length !== 0) {
                setAdataQuestions(data)
                setItemQuestions(data[0])
                RecuperarQuestao(data[0].id_perguntas as unknown as string)
            }
        }
        getQuestion(avaliacaoId)
    }, [avaliacaoId,RecuperarQuestao])

    let dataQ:any
    async function nextQuestion() {

        if (!(answers.filter(ans => ans.correta === 'S'))) {
            alert('Responda para prosseguir!')
            return
        }
        dataQ = {
            'question': itemQuestions,
            'answers': answers
        }
        console.log(dataQ)
        if (paginacao < dataQuestions.length) {
            setPaginacao(pre => pre + 1)
            carregarOneQuestion(paginacao)
        }
    }
    async function backQuestion(pag: number) {
        if (pag >= 0) {
            const p = pag - 1
            setPaginacao(p)
            carregarOneQuestion(p - 1)
        }

    }
    return {
        backQuestion, nextQuestion, paginacao, itemQuestions,
        dataQuestions, handleIsTrue, answers, setAnswers, handleAddAnswer,
        statusAtividade, setStatusAtividade,avaliacao
    }
}