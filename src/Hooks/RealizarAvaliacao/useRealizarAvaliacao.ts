import { useAvaliacoes } from "../../Hooks/Avaliacao/useAvaliacoes";
import { typeAnswer, typeLinksAvaliacoes, typeQuestions } from "../../components/Interface";
import { useCallback, useEffect, useState } from "react";
import { getAvaliacoesItenQuestions, getLinksAvaliacoes } from "../../service/AvaliacoesService";
import { getQuestionsAnswer } from "../../service/QuestionsService";
import { useSaveQuestion } from "./useSaveQuestion";
import { useNavegacao } from "./useNavegacao";
import { useFinalizarAvaliacao } from "./useFinalizarAvaliacao";
import { useAuth } from "../../conext/authContext";
import { embarrarArray } from "../../functions/embarralharArray";


export function useRealizarAvaliacao(avaliacaoId: number) {

    const [itemQuestions, setItemQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_responsavel: 0, senioridade: '', id_departamento: 0, nivel: '' });
    const [answers, setAnswers] = useState<typeAnswer[]>([])

    const [dataQuestions, setDataQuestions] = useState<typeQuestions[]>([])
    const { avaliacao } = useAvaliacoes(avaliacaoId as unknown as string)
    const tempo = avaliacao.tempo
    const { idProfissionalLogado } = useAuth()
    const id_profissional = idProfissionalLogado

    const { dataQ, saveQuestions } = useSaveQuestion(itemQuestions, answers, handleDataQuestion)

    //const {  finalizouContagem} = useTemporizador(parseInt(tempo[0]), parseInt(tempo[1]), parseInt(tempo[2]))
    const { backQuestion, nextQuestion, setPaginacao, paginacao } = useNavegacao(dataQuestions,
        setItemQuestions, setAnswers, saveQuestions)

    const { finalizar, statusAtividade, setStatusAtividade } =
        useFinalizarAvaliacao(dataQ, id_profissional, avaliacao);

    function handleDataQuestion(id_perguntas: number, questions: typeQuestions) {
        setDataQuestions(prev => prev.map
            (item => item.id_perguntas === id_perguntas ?
                { ...item, answers: questions.answers } : item))

    }
    const podeFinalizar = useCallback(
        () => {
            if (itemQuestions.tipo_resposta === 'B' || itemQuestions.tipo_resposta === 'L') {
                return dataQ.length !== dataQuestions.length
            }
            return dataQ.every(item => item.resposta === null || item.resposta === undefined || verificaRespostaMarcada(item.id_perguntas))
        }, [dataQ])

    function verificaRespostaMarcada(id_perguntas: number) {
        const correta = answers.filter(item => item.id_perguntas === id_perguntas && item.correta === 'S')

        return correta.length === 0

    }
    useEffect(() => {
        setPaginacao(1)
        async function getQuestion(avaliacaoId: number) {
            const data = (await getAvaliacoesItenQuestions(avaliacaoId)).data
            const resp:typeQuestions[] = embarrarArray(data)
            const ans = resp.map(async function (value) {
                const respAnswer: typeAnswer[] = (await getQuestionsAnswer(value.id_perguntas as unknown as number)).data
                const dataAnswer: typeAnswer[] = embarrarArray(respAnswer)
                if (dataAnswer.length !== 0) {
                    dataAnswer.map(item => item.correta = 'N')
                    value.answers = dataAnswer
                } else {
                    value.answers = [{ descricao: '', correta: '', id_perguntas: value.id_perguntas, id_respostas: 1 }]
                }
                return value
            })
            if (resp.length !== 0) {
                setDataQuestions(resp)
                setItemQuestions(resp[0])
                if (resp[0].tipo_resposta === 'C' || resp[0].tipo_resposta === 'R') {
                    const answers = (await ans[0]).answers
                    if (answers)
                        setAnswers(answers.filter(item => item.id_perguntas === resp[0].id_perguntas))
                } else {
                    setAnswers([{ descricao: '', correta: '', id_perguntas: resp[0].id_perguntas, id_respostas: 1 }])
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
        tempo, finalizar, respostaAberta, podeFinalizar
    }
}