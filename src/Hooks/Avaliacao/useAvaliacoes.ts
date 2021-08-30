import { FormEvent, useEffect, useState } from "react"
import { deleteQuestionsAnswer, getQuestions } from '../../service/QuestionsService';
import { typeAvaliacao, typeItensAvaliacao, typeQuestions } from '../../components/Interface';

import { getOneAvaliacoesQuestion, postAvaliacoes } from '../../service/AvaliacoesService';
import { useHistory } from "react-router-dom";
import { useUpdateAvaliacoes } from "./useUpdateAvaliacoes";
import { useValidarAvaliacao } from "./useValidarAvaliacao";

export function useAvaliacoes(avaliacaoId: string) {
    const [avaliacao, setAvaliacao] = useState<typeAvaliacao>({ id_usuario: 1, tempo: '00:00:00', titulo: '', itensAvaliacao: [] });
    const [Questions, setQuestion] = useState<typeQuestions[]>([]);
    const UpdateAvaliacoes = useUpdateAvaliacoes;
    const validarAvaliacao = useValidarAvaliacao;

    async function RecuperandoDadosQuestions(avaliacaoId: string) {
        if (avaliacaoId === 'new') {
            const data = (await getQuestions()).data
            setQuestion(data)
        } else if (avaliacaoId !== '') {
            const data = (await getOneAvaliacoesQuestion(parseInt(avaliacaoId))).data

            data['avaliacao'].map(v =>setAvaliacao(v))
            setQuestion(data['questions'].sort((a) => a.situacao ? -1 : 1))
        }
    }

    useEffect(() => {
        RecuperandoDadosQuestions(avaliacaoId)

        return
    }, [avaliacaoId])

    const history = useHistory();




    async function salvarAvaliacoes(questionsSelecionadas: typeQuestions[]) {

        avaliacao.itensAvaliacao = questionsSelecionadas

        if (validarAvaliacao(avaliacaoId, avaliacao.titulo, questionsSelecionadas)) {
            if (await postAvaliacoes(avaliacao)) {
                alert('Avaliação Registrada com Sucesso!')
                history.push('/avaliacao')
            } else {
                alert('Erro ao Registrar Avaliação!')
            }
        }
    }

    const enviarAvaliacao = async (e: FormEvent) => {
        const questionsSelecionadas = Questions.filter(value => value.situacao==='AB'||value.situacao==='AB+')
        if (validarAvaliacao(avaliacaoId, avaliacao.titulo, questionsSelecionadas)) {
            if (avaliacaoId === 'new') {
                salvarAvaliacoes(questionsSelecionadas)
            } else {
                if(await UpdateAvaliacoes(avaliacaoId, Questions, avaliacao)){
                    alert('Avaliação Atualizada com Sucesso!')
                    //history.push('/avaliacao')
                } else {
                    alert('Erro ao Registrar Avaliação!')
                }
            }
        }
    }
    const deletarQuestao = async (e: FormEvent, id_perguntas: number) => {
        e.preventDefault();
        if (await deleteQuestionsAnswer(id_perguntas))
            setQuestion(Questions.filter(item => item.id_perguntas !== id_perguntas))
    }
    return { avaliacao, setAvaliacao, enviarAvaliacao, Questions, setQuestion, deletarQuestao, }
}