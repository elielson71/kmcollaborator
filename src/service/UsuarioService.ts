import { typeUsuario } from '../components/Interface'
import { api } from './Api'
import { getToken } from './authService'
export async function getUsuario() {
    return await api.get<typeUsuario[]>('/api/usuario')
}
export async function postUsuario(usuario: {}) {
    const resp = await api.post('/api/usuario', usuario)
    return resp
}

export async function getOneUsuario(id_usuario: number) {
    return await api.get<typeUsuario[]>(`/api/usuario/${id_usuario}`)
}

export async function putUsuario(id_usuario: number, usuario: {}) {
    return await api.put<typeUsuario>(`/api/usuario/${id_usuario}`, usuario)
}
export async function deleteUsuario(id_usuario: number) {
    if (window.confirm('Deseja Realmente excluir Usuario?')) {
        return (await api.delete(`/api/usuario/${id_usuario}`))
    }
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}