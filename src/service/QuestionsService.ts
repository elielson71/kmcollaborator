import { typeAnswer, typeQuestions } from '../components/Interface'
import { api } from './Api';
import { getToken } from './authService';
export async function getQuestions() {
    return await api.get<typeQuestions[]>('/api/questions')
}
export async function postQuestions(questions: typeQuestions) {
    const resp = await api.post('/api/questions', questions)
    return resp.status === 201
}
export async function getOneQuestions(id_perguntas: number) {
    return await api.get<typeQuestions[]>(`/api/questions/${id_perguntas}`)
}
export async function getQuestionsAnswer(id_perguntas: number) {
    return await api.get<typeAnswer[]>(`/api/questions/answer/${id_perguntas}`)
}
export async function putQuestionsAnswer(id_perguntas: number, questions: typeQuestions) {
    const resp = await api.put<typeQuestions>(`/api/questions/${id_perguntas}`, questions)
    return resp.status === 204
}
export async function deleteQuestionsAnswer(id_perguntas: number) {
    if (window.confirm('Deseja Realmente excluir essa pergunta?')) {
        const resp = (await api.delete(`/api/questions/${id_perguntas}`))
        return resp.status === 204
    }
    return 
}