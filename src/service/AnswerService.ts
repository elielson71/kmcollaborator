import { typeAnswer, typeQuestions } from '../components/Interface'
import axios from 'axios';

export async function postAnswer(answer: typeAnswer[]) {
     const resp = await axios.post('http://localhost:3001/questions/answer', answer)
     return resp.status === 200
}

export async function deleteAnswer(id_resposta: number) {
     if (window.confirm('Deseja Realmente excluir essa Resposta?\n A resposta será removida diretamente do banco de dados!')) {
          const resp = (await axios.delete(`http://localhost:3001/answer/${id_resposta}`))
          return resp.status === 200
     }
     return
}