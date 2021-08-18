import { typeAnswer, typeQuestions } from '../components/Interface'
import axios from 'axios';
export async function getQuestions() {
    return await axios.get<typeQuestions[]>('http://localhost:3001/questions')
}
export async function postQuestions(questions: typeQuestions) {
    const resp = await axios.post('http://localhost:3001/questions', questions)
    return resp.status === 200
}
export async function getOneQuestions(id_perguntas: number) {
    return await axios.get<typeQuestions[]>(`http://localhost:3001/questions/${id_perguntas}`)
}
export async function getQuestionsAnswer(id_perguntas: number) {
    return await axios.get<typeAnswer[]>(`http://localhost:3001/questions/answer/${id_perguntas}`)
}
export async function putQuestionsAnswer(id_perguntas: number, questions: typeQuestions) {
    const resp = await axios.put<typeQuestions>(`http://localhost:3001/questions/${id_perguntas}`, questions)
    return resp.status === 200
}
export async function deleteQuestionsAnswer(id_perguntas: number) {
    if (window.confirm('Deseja Realmente excluir essa pergunta?')) {
        const resp = (await axios.delete(`http://localhost:3001/questions/${id_perguntas}`))
        return resp.status === 200
    }
    return 
}