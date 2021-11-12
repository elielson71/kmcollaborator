import { typeAvaliacao, typeLinksAvaliacoes, typeQuestions } from '../components/Interface'
import { api } from './Api'

export async function getAvaliacoes() {
    return await api.get<[]>('/api/avaliacoes')
}
export async function postAvaliacoes(avaliacoes: typeAvaliacao) {
    const resp = await api.post('/api/avaliacoes', avaliacoes)
    return resp.status === 201
}
type typeAvaliacoesQuestion = {
    avaliacao: typeAvaliacao[]
    questions: typeQuestions[]
}
export async function getOneAvaliacoesQuestion(id_avaliacoes: number) {
    return await api.get<typeAvaliacoesQuestion>(`/api/avaliacoes/questions/${id_avaliacoes}`)
}

export async function getLinksAvaliacoes(id_avaliacoes: number) {
    return await api.get<typeLinksAvaliacoes[]>(`/api/avaliacoes/links/${id_avaliacoes}`)
}
export async function getAvaliacoesItenQuestions(id_avaliacoes: number) {
    return await api.get<typeQuestions[]>(`/api/avaliacoes/itensquestions/${id_avaliacoes}`)
}

export async function putAvaliacoes(id_avaliacoes: number, avaliacoes: typeAvaliacao) {

    const resp = await api.put<typeAvaliacao>(`/api/avaliacoes/${id_avaliacoes}`, avaliacoes)
    return resp.status === 204
}
export async function deleteAvaliacoes(id_avaliacoes: number) {
    if (window.confirm('Deseja Realmente excluir Avaliacao?')) {
        const resp = (await api.delete(`/api/avaliacoes/${id_avaliacoes}`))
        return resp.status === 204
    }
    return
}