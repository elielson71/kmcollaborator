import { typeProfissional } from '../components/Interface'
import { api } from './Api'
import { getToken } from './authService'
export async function getProfissional() {
    return await api.get<typeProfissional[]>('/api/profissional', { headers: { "Authorization": `Bearer ${getToken()}` } })
}
export async function postProfissional(profissional:typeProfissional) {
    const resp = await api.post('/api/profissional', profissional, { headers: { "Authorization": `Bearer ${getToken()}` } })
    return resp
}

export async function getOneProfissional(id_profissional: number) {
    return await api.get<typeProfissional[]>(`/api/profissional/${id_profissional}`, { headers: { "Authorization": `Bearer ${getToken()}` } })
}

export async function putProfissional(id_profissional: number, profissional: {}) {
    return await api.put<typeProfissional>(`/api/profissional/${id_profissional}`, profissional, { headers: { "Authorization": `Bearer ${getToken()}` } })
}
export async function deleteProfissional(id_profissional: number) {
    if (window.confirm('Deseja Realmente excluir Profissional?')) {
        return (await api.delete(`/api/profissional/${id_profissional}`, { headers: { "Authorization": `Bearer ${getToken()}` } }))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}