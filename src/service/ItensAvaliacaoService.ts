import { typeQuestions} from '../components/Interface'
import { api } from './Api';
import { getToken } from './authService';

export async function postItensAvaliacao(itensAvaliacao: typeQuestions[]) {
     const resp = await api.post('/api/avaliacoes/itensAvaliacoes', itensAvaliacao,{headers:{"Authorization": `Bearer ${getToken()}`}})
     return resp.status === 201
}

export async function deleteItensAvaliacao(id_itensAvaliacao: number) {
     if (window.confirm('Deseja Realmente excluir essa Resposta?\n A resposta será removida diretamente do banco de dados!')) {
          const resp = (await api.delete(`/api/itensAvaliacao/${id_itensAvaliacao}`,{headers:{"Authorization": `Bearer ${getToken()}`}}))
           return resp.status === 204;
     }
     return
}