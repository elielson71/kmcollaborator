import { useAvaliacoes } from "../Avaliacao/useAvaliacoes";
import { typeAnswer, typeCorrecao, typeQuestions } from "../../components/Interface";
import { useEffect, useState,useCallback } from "react";
import { useSaveCorrecao } from "./useSaveCorrecao";
import { useNavegacao } from "./useNavegacaoCorrecao";
import { getCorrecaoItensQuestions, getCorrecaoQuestionsAnswer } from "../../service/CorrecaoService";
import { useHistory } from "react-router";
import { useFinalizarCorrecao } from "./useFinalizarCorrecao";

export function useCorrecaoAvaliacao(correcaoId: number) {

    const [itemQuestions, setItemQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_responsavel: 0, senioridade: '', id_departamento: 0, nivel: '' });
    const [answers, setAnswers] = useState<typeAnswer[]>([])
    const [dataQuestions, setDataQuestions] = useState<typeQuestions[]>([])
    const { avaliacao } = useAvaliacoes(correcaoId as unknown as string)
    const { dataQ, saveQuestions } = useSaveCorrecao(itemQuestions, answers, handleDataQuestion)

    const { backQuestion, nextQuestion, setPaginacao, paginacao } = useNavegacao(dataQuestions,
        setItemQuestions, setAnswers, saveQuestions)

    const { finalizar } = useFinalizarCorrecao(dataQ, correcaoId)
    const history = useHistory()

    function handleDataQuestion(id_perguntas: number, questions: typeQuestions) {
        setDataQuestions(prev => prev.map
            (item => item.id_perguntas === id_perguntas ?
                { ...item, nota_pergunta: questions.nota_pergunta } : item))

    }
    const podeFinalizar = useCallback(()=>{
        return dataQ.every(item=>item.nota===null || item.nota===undefined)
    },[dataQ])

    useEffect(() => {
        
        setPaginacao(1)
        async function getQuestion(correcaoId: number) {
            const data = (await getCorrecaoItensQuestions(correcaoId)).data
            const ans = data.map(async function (value) {
                const dataAnswer: typeAnswer[] = (await getCorrecaoQuestionsAnswer(value.id_perguntas as unknown as number, correcaoId)).data
                if (dataAnswer.length !== 0) {
                    value.answers = dataAnswer
                }
                return value
            })
            if (data.length !== 0) {
                setDataQuestions(data)
                setItemQuestions(data[0])
                if (data[0].tipo_resposta === 'C' || data[0].tipo_resposta === 'R') {
                    const answers = (await ans[0]).answers
                    if (answers)
                        setAnswers(answers.filter(item => item.id_perguntas === data[0].id_perguntas))
                }

            }
        }

        getQuestion(correcaoId)
        return () => { getQuestion(correcaoId) }
    }, [correcaoId])



    const respostaAberta = answers.filter(item => item.id_perguntas === itemQuestions.id_perguntas)
    return {
        backQuestion, nextQuestion, paginacao, itemQuestions,
        dataQuestions, answers, setAnswers,
        avaliacao, respostaAberta, history, setItemQuestions,
        finalizar, podeFinalizar
    }
}


