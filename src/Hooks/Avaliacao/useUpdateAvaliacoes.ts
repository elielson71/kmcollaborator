import { typeAvaliacao, typeQuestions } from "../../components/Interface"
import { putAvaliacoes } from "../../service/AvaliacoesService"
import { postItensAvaliacao } from "../../service/ItensAvaliacaoService"

export async function useUpdateAvaliacoes(avaliacaoId: string, Questions: typeQuestions[], avaliacao: typeAvaliacao) {
    const id = parseInt(avaliacaoId);
    const upAvaliacao = avaliacao
    upAvaliacao.itensAvaliacao = Questions.filter(value => value.situacao === 'AB' || value.situacao === 'CA')
    let newItens:any= Questions.filter(value=>{
        return value.situacao === 'AB+'
    })
    if(newItens){
        newItens = newItens.map((value:any)=>{value.situacao='AB';value['id_avaliacoes']=avaliacaoId;return value})
        await postItensAvaliacao(newItens)
    }
    if (await putAvaliacoes(id, upAvaliacao))
        return true

    return false
}