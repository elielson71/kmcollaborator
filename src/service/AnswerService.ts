import { typeAnswer } from '../components/Interface'
import {api} from './Api';
import { getToken } from './authService';

export async function postAnswer(answer: typeAnswer[]) {
     const resp = await api.post('/questions/answer', answer)
     return resp.status === 201
}

export async function deleteAnswer(id_resposta: number) {
     if (window.confirm('Deseja Realmente excluir essa Resposta?\n A resposta será removida diretamente do banco de dados!')) {
          const resp = (await api.delete(`http://localhost:3001/answer/${id_resposta}`))
          return resp.status === 201
     }
     return
}