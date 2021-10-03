import { typeGrupo } from '../components/Interface'
import { api } from './Api'
export async function getGrupo() {
    return await api.get<typeGrupo[]>('/api/grupo')
}
export async function postGrupo(grupo: {}) {
    const resp = await api.post('/api/grupo', grupo)
    return resp
}

export async function getOneGrupo(id_grupo: number) {
    return await api.get<typeGrupo[]>(`/api/grupo/${id_grupo}`)
}

export async function putGrupo(id_grupo: number, grupo: {}) {
    return await api.put<typeGrupo>(`/api/grupo/${id_grupo}`, grupo)
}
export async function deleteGrupo(id_grupo: number) {
    if (window.confirm('Deseja Realmente excluir Grupo?')) {
        return (await api.delete(`/api/grupo/${id_grupo}`))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao com servidor'}}
}