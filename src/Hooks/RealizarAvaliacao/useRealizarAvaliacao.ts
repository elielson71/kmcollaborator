import { useAvaliacoes } from "../../Hooks/Avaliacao/useAvaliacoes";
import { typeAnswer, typeCorrecao, typeQuestions } from "../../components/Interface";
import { useCallback, useEffect, useState } from "react";
import { getAvaliacoesItenQuestions } from "../../service/AvaliacoesService";
import useTemporizador from "./useTemporizador";
import { getQuestionsAnswer } from "../../service/QuestionsService";
import { useSaveQuestion } from "./useSaveQuestion";
import { useNavegacao } from "./useNavegacao";
import { useFinalizarAvaliacao } from "./useFinalizarAvaliacao";


export function useRealizarAvaliacao(avaliacaoId: number) {

    const [itemQuestions, setItemQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_responsavel: 0, senioridade: '', id_departamento: 0, nivel: '' });
    const [answers, setAnswers] = useState<typeAnswer[]>([])

    const [dataQuestions, setDataQuestions] = useState<typeQuestions[]>([])
    const { avaliacao } = useAvaliacoes(avaliacaoId as unknown as string)
    const tempo = avaliacao.tempo
    const id_profissional = 4

    const { dataQ, saveQuestions } = useSaveQuestion(itemQuestions, answers, handleDataQuestion)

    //const {  finalizouContagem} = useTemporizador(parseInt(tempo[0]), parseInt(tempo[1]), parseInt(tempo[2]))
    const { backQuestion, nextQuestion, setPaginacao, paginacao } = useNavegacao(dataQuestions,
        setItemQuestions, setAnswers, saveQuestions)

    const { finalizar, statusAtividade, setStatusAtividade } =
        useFinalizarAvaliacao(dataQ,id_profissional, avaliacao);

    function handleDataQuestion(id_perguntas: number, questions: typeQuestions) {
        setDataQuestions(prev => prev.map
            (item => item.id_perguntas === id_perguntas ?
                { ...item, answers: questions.answers } : item))

    }
    const podeFinalizar = useCallback(()=>dataQ.every(item=>item.resposta===null || item.resposta===undefined),[dataQ])

    useEffect(() => {
        setPaginacao(1)
        async function getQuestion(avaliacaoId: number) {
            const data = (await getAvaliacoesItenQuestions(avaliacaoId)).data
            const ans = data.map(async function (value) {
                const dataAnswer: typeAnswer[] = (await getQuestionsAnswer(value.id_perguntas as unknown as number)).data
                if (dataAnswer.length !== 0) {
                    dataAnswer.map(item => item.correta = 'N')
                    value.answers = dataAnswer
                } else {
                    value.answers = [{ descricao: '', correta: '', id_perguntas: value.id_perguntas, id_respostas: 1 }]
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
                } else {
                    setAnswers([{ descricao: '', correta: '', id_perguntas: data[0].id_perguntas, id_respostas: 1 }])
                }

            }
        }

        getQuestion(avaliacaoId)
        return () => { getQuestion(avaliacaoId) }
    }, [avaliacaoId])






    function handleIsTrue(id_respostas: number) {
        setAnswers(prev => prev.map(item => item.id_respostas === id_respostas ? { ...item, correta: 'S' } : item))
        setAnswers(prev => prev.map(item => item.id_respostas !== id_respostas ? { ...item, correta: 'N' } : item))
    }

    const respostaAberta = answers.filter(item => item.id_perguntas === itemQuestions.id_perguntas)
    return {
        backQuestion, nextQuestion, paginacao, itemQuestions,
        dataQuestions, answers, setAnswers, handleIsTrue,
        statusAtividade, setStatusAtividade, avaliacao,
        tempo, finalizar, respostaAberta,podeFinalizar
    }
}