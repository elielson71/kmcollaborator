import {  useHistory } from "react-router-dom";
import { typeAnswer, typeQuestions } from "../../components/Interface";
import { getOneQuestions, getQuestionsAnswer, postQuestions, putQuestionsAnswer } from "../../service/QuestionsService";
import { ValidQuestion } from "./ValidQuestion";
import { deleteAnswer, postAnswer } from "../../service/AnswerService";
import { FormEvent, useState, useEffect } from "react";
import { useDepartamento } from "../Departamento/useDepartamento";

let countAnswer = 1;

export function useQuestion(questionId: string) {
    const [Questions, setQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_departamento: 0, senioridade: '', nivel: 'F', id_responsavel: 0 })
    const [answers, setAnswers] = useState<typeAnswer[]>([])
    const [hiddenInfo, setHiddenInfo] = useState<boolean>(false)
    const history = useHistory()
    const {departamentos} =useDepartamento('')


    if (!(Questions.tipo_resposta === 'B' || Questions.tipo_resposta === 'L')) {
        const resp = {} as any
        answers.forEach(function (ans, index) {
            resp[index] = ans as any
        })
        Questions['answers'] = resp
    }

    async function saveQuestion() {
        if (ValidQuestion(Questions, answers)) {
            const resp = postQuestions(Questions)
            if (await resp) {
                alert("Questões Salvas com Sucesso!")
                history.push('/avaliacao/new')
            } else {
                alert("Erro ao Salvar Questões!")
                console.error(resp)
            }
        }
    }
    async function updateQuestion() {
        if (ValidQuestion(Questions, answers)) {
            const answerNew = answers.filter(answer => answer.status === 'AB')
            if (answerNew.length !== 0)
                postAnswer(answerNew)
            const resp = putQuestionsAnswer(parseInt(questionId), Questions)
            if (await resp) {
                alert("Questões atualizadas com Sucesso!")
                history.push('/avaliacao/new')
            } else {
                alert("Erro ao atualizar Questões!")
                console.error(resp)

            }

        }

    }


    async function RecuperarQuestao(id: string) {
        const dataQuestion: typeQuestions[] = (await getOneQuestions(parseInt(id))).data
        const dataAnswer: typeAnswer[] = (await getQuestionsAnswer(parseInt(id))).data
        dataQuestion.map(value => {
            setQuestions(value)
            return null
        })
        setAnswers(dataAnswer)
    }
    useEffect(() => {
        if (questionId)
            RecuperarQuestao(questionId)
    }
        , [questionId])

    function handleChangeTypeListCard(tipo_resposta: string) {
        setQuestions({ ...Questions, tipo_resposta })
        if ((tipo_resposta === 'B' || tipo_resposta === 'L') && answers.length !== 0)
            setAnswers([])
        else
            setAnswers(prev => prev.map(item => ({ ...item, correta: 'N' })))
    }

    const [descriptionAnswer, setDescriptionAnswer] = useState<string>('')

    function handleAddAnswer(e: FormEvent, descriptionAnswer: string, selectedType: string, id_perguntas?: number) {
        e.preventDefault();
        if ((selectedType === "R" || selectedType === "C") && descriptionAnswer !== "") {
            const newAnswer: typeAnswer = { correta: 'N', descricao: descriptionAnswer, id_respostas: countAnswer++, id_perguntas, status: 'AB' }
            setAnswers([...answers, newAnswer])
        }else if((selectedType === "B" || selectedType === "L") && descriptionAnswer !== ""){
            const newAnswer: typeAnswer = { correta: 'S', descricao: descriptionAnswer, id_respostas: countAnswer++, id_perguntas, status: 'AB' }
            setAnswers([...answers, newAnswer])
        }
        setDescriptionAnswer('')
    }

    async function handleDeleteAnswer(index: number, id_resposta: number) {
        if (index !== undefined) {
            if (id_resposta !== undefined) {
                if (await deleteAnswer(id_resposta))
                    setAnswers(prev => prev.filter(item => item.id_respostas !== index))
            } else {
                setAnswers(prev => prev.filter(item => item.id_respostas !== index))
            }
        }
    }
    function handleIsTrue(id_respostas: number) {
        setAnswers(prev => prev.map(item => item.id_respostas === id_respostas ? { ...item, correta: 'S' } : item))
        setAnswers(prev => prev.map(item => item.id_respostas !== id_respostas ? { ...item, correta: 'N' } : item))
    }
    function sendQuestion() {
        if (questionId === 'new')
            saveQuestion()
        else if (questionId !== '')
            updateQuestion()
    }
    return {
        sendQuestion, handleAddAnswer, handleDeleteAnswer, handleIsTrue,
        descriptionAnswer, setDescriptionAnswer, handleChangeTypeListCard,
        Questions, setQuestions, answers, setAnswers, hiddenInfo, setHiddenInfo,
         RecuperarQuestao,departamentos
    }
}