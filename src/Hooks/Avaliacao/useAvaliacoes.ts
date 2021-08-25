import { FormEvent, useEffect, useState } from "react"
import { deleteQuestionsAnswer, getQuestions } from '../../service/QuestionsService';
import { typeAvaliacao, typeItensAvaliacao, typeQuestions } from '../../components/Interface';

import { getOneAvaliacoesQuestion, postAvaliacoes } from '../../service/AvaliacoesService';
import { useHistory } from "react-router-dom";
import { useUpdateAvaliacoes } from "./useUpdateAvaliacoes";
import { useValidarAvaliacao } from "./useValidarAvaliacao";

export function useAvaliacoes(avaliacaoId: string) {
    const [avaliacao, setAvaliacao] = useState<typeAvaliacao>({ id_usuario: 1, tempo: '00:00:00', titulo: '' });
    const [Questions, setQuestion] = useState<typeQuestions[]>([{ conteudo: '', id_departamento: 0, id_responsavel: 0, nivel: '', senioridade: '', tipo_resposta: '', nota_pergunta: 0 }]);
    const UpdateAvaliacoes = useUpdateAvaliacoes;
    const validarAvaliacao = useValidarAvaliacao;

    async function RecuperandoDadosQuestions(avaliacaoId: string) {
        if (avaliacaoId === 'new') {
            const data = (await getQuestions()).data
            setQuestion(data)
        } else if (avaliacaoId !== '') {
            const data = (await getOneAvaliacoesQuestion(parseInt(avaliacaoId))).data

            let itensA = [] as typeItensAvaliacao[]
            data['questions'].map(value => {
                if (value.selecionado)
                    itensA = [...itensA, {
                        id_avaliacoes: parseInt(avaliacaoId),
                        id_perguntas: value.id_perguntas ? value.id_perguntas : 0,
                        nota_pergunta: value.nota_pergunta ? value.nota_pergunta : 0,
                        situacao: 'CO'
                    }]
            })
            data['avaliacao'].map(v =>
                // setAvaliacao(v)
                 setAvaliacao({...v,itensAvaliacao:itensA})
             )
            
            setQuestion(data['questions'].sort((a) => a.selecionado ? -1 : 1))
        }
    }

    useEffect(() => {
        RecuperandoDadosQuestions(avaliacaoId)

        return
    }, [avaliacaoId])

    const history = useHistory();




    async function salvarAvaliacoes(questionsSelecionadas: typeQuestions[]) {
        let item = [] as typeItensAvaliacao[]
        questionsSelecionadas.map((questions) => {
            item = [...item, { id_avaliacoes: parseInt(avaliacaoId), id_perguntas: questions.id_perguntas ? questions.id_perguntas : 0, nota_pergunta: questions.nota_pergunta === 0 ? questions.nota_pergunta : 0, situacao: questions.selecionado ? 'AB' : 'CA' }]
        })
        avaliacao.itensAvaliacao = item

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
        const questionsSelecionadas = Questions.filter(value => value.selecionado)
        if (validarAvaliacao(avaliacaoId, avaliacao.titulo, questionsSelecionadas)) {
            if (avaliacaoId === 'new')
                salvarAvaliacoes(questionsSelecionadas)
            else if (avaliacaoId !== '')
                if (avaliacaoId === '' || (avaliacaoId === 'new')) {
                    alert('não foi possível atualizar!\n Atualize a pagina!')
                    return
                }
            if (await UpdateAvaliacoes(avaliacaoId,Questions, avaliacao, questionsSelecionadas)) {
                alert('Avaliação Atualizada com Sucesso!')
                history.push('/avaliacao')
            }
            else {
                alert('Erro ao Registrar Avaliação!')
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