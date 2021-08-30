import { typeQuestions} from '../components/Interface'
import axios from 'axios';

export async function postItensAvaliacao(itensAvaliacao: typeQuestions[]) {
     const resp = await axios.post('http://localhost:3001/avaliacoes/itensAvaliacoes', itensAvaliacao)
     return resp.status === 200
}

export async function deleteItensAvaliacao(id_itensAvaliacao: number) {
     if (window.confirm('Deseja Realmente excluir essa Resposta?\n A resposta será removida diretamente do banco de dados!')) {
          const resp = (await axios.delete(`http://localhost:3001/itensAvaliacao/${id_itensAvaliacao}`))
           return resp.status === 200;
     }
     return
}