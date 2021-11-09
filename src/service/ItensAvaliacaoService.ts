import { typeQuestions} from '../components/Interface'
import { api } from './Api';


export async function postItensAvaliacao(itensAvaliacao: typeQuestions[]) {
     const resp = await api.post('/api/avaliacoes/itensAvaliacoes', itensAvaliacao)
     return resp.status === 201
}

export async function deleteItensAvaliacao(id_itensAvaliacao: number) {
     if (window.confirm('Deseja Realmente excluir essa Resposta?\n A resposta será removida diretamente do banco de dados!')) {
          const resp = (await api.delete(`/api/itensAvaliacao/${id_itensAvaliacao}`))
           return resp.status === 204;
     }
     return
}