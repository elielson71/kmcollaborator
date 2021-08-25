import { typeAvaliacao, typeItensAvaliacao, typeQuestions } from "../../components/Interface"
import { putAvaliacoes } from "../../service/AvaliacoesService"
import { postItensAvaliacao } from "../../service/ItensAvaliacaoService"

export async function useUpdateAvaliacoes(avaliacaoId: string, questions: typeQuestions[], avaliacao: typeAvaliacao, questionsSelecionadas: typeQuestions[]) {

    const id = parseInt(avaliacaoId);

    return false
}