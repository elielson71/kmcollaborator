import { typeAnswer, typeAvaliacao, typeQuestions } from '../components/Interface'
import axios from 'axios';
export async function getAvaliacoes() {
    return await axios.get<[]>('http://localhost:3001/avaliacoes')
}
export async function postAvaliacoes(avaliacoes: typeAvaliacao) {
    const resp = await axios.post('http://localhost:3001/avaliacoes', avaliacoes)
    return resp.status === 200
}
type typeAvaliacoesQuestion={
    avaliacao:typeAvaliacao[]
    questions:typeQuestions[]
}
export async function getOneAvaliacoesQuestion(id_avaliacoes: number) {
    return await axios.get<typeAvaliacoesQuestion>(`http://localhost:3001/avaliacoes/questions/${id_avaliacoes}`)
}

export async function putAvaliacoes(id_avaliacoes: number, avaliacoes: typeAvaliacao) {
    const resp = await axios.put<typeAvaliacao>(`http://localhost:3001/avaliacoes/${id_avaliacoes}`, avaliacoes)
    return resp.status === 200
}
export async function deleteAvaliacoes(id_avaliacoes: number) {
    if (window.confirm('Deseja Realmente excluir Avaliacao?')) {
        const resp = (await axios.delete(`http://localhost:3001/avaliacoes/${id_avaliacoes}`))
        return resp.status === 200
    }
    return 
}