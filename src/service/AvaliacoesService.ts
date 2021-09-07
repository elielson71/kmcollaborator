import {  typeAvaliacao, typeQuestions } from '../components/Interface'
import { api } from './Api'
export async function getAvaliacoes() {
    return await api.get<[]>('/avaliacoes')
}
export async function postAvaliacoes(avaliacoes: typeAvaliacao) {
    const resp = await api.post('/avaliacoes', avaliacoes)
    return resp.status === 200
}
type typeAvaliacoesQuestion={
    avaliacao:typeAvaliacao[]
    questions:typeQuestions[]
}
export async function getOneAvaliacoesQuestion(id_avaliacoes: number) {
    return await api.get<typeAvaliacoesQuestion>(`/avaliacoes/questions/${id_avaliacoes}`)
}

export async function putAvaliacoes(id_avaliacoes: number, avaliacoes: typeAvaliacao) {
    const resp = await api.put<typeAvaliacao>(`/avaliacoes/${id_avaliacoes}`, avaliacoes)
    return resp.status === 200
}
export async function deleteAvaliacoes(id_avaliacoes: number) {
    if (window.confirm('Deseja Realmente excluir Avaliacao?')) {
        const resp = (await api.delete(`/avaliacoes/${id_avaliacoes}`))
        return resp.status === 200
    }
    return 
}