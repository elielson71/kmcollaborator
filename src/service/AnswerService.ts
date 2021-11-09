import { typeAnswer } from '../components/Interface'
import {api} from './Api';


export async function postAnswer(answer: typeAnswer[]) {
     const resp = await api.post('api/questions/answer', answer)
     return resp.status === 201
}

export async function deleteAnswer(id_resposta: number) {
     if (window.confirm('Deseja Realmente excluir essa Resposta?\n A resposta será removida diretamente do banco de dados!')) {
          const resp = (await api.delete(`api/answer/${id_resposta}`))
          return resp.status === 204
     }
     return
}