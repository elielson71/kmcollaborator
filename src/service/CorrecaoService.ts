import { typeAnswer, typeCorrecao, typeQuestions } from '../components/Interface'
import { api } from './Api'
import { getToken } from './authService'
export async function getCorrecao() {
    return await api.get<typeCorrecao[]>('/api/correcao')
}
export async function postCorrecao(correcao:typeCorrecao) {
    console.log(correcao)
    const resp = await api.post('/api/correcao', correcao)
    return resp
}

export async function getOneCorrecao(id_correcao: number) {
    return await api.get<typeCorrecao[]>(`/api/correcao/${id_correcao}`)
}
export async function getRelatorioProfissonal(id_profissional: number) {
    return await api.get(`/api/relatorioprofissonal/${id_profissional}`)
}
export async function getCorrecaoItensQuestions(id_correcao: number) {
    return await api.get<typeQuestions[]>(`/api/correcao/itensquestions/${id_correcao}`)
}

export async function getCorrecaoQuestionsAnswer(id_pergunta:number,id_correcao: number) {
    return await api.post(`/api/correcao/itensrespostas/}`,{'id_pergunta':id_pergunta,'id_correcao':id_correcao})
}

export async function putCorrecao(id_correcao: number, correcao: {}) {
    return await api.put<typeCorrecao>(`/api/correcao/${id_correcao}`, correcao)
}
export async function deleteCorrecao(id_correcao: number) {
    if (window.confirm('Deseja Realmente excluir Correcao?')) {
        return (await api.delete(`/api/correcao/${id_correcao}`))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}