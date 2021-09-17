import {  typeDepartamento } from '../components/Interface'
import { api } from './Api'
import { getToken } from './authService'
export async function getDepartamento() {
    return await api.get<typeDepartamento[]>('/api/departamento',{headers:{"Authorization": `Bearer ${getToken()}`}})
}
export async function postDepartamento(departamento:{}) {
    const resp = await api.post('/api/departamento', departamento,{headers:{"Authorization": `Bearer ${getToken()}`}})
    return resp
}

export async function getOneDepartamento(id_departamento: number) {
    return await api.get<typeDepartamento[]>(`/api/departamento/${id_departamento}`,{headers:{"Authorization": `Bearer ${getToken()}`}})
}

export async function putDepartamento(id_departamento: number, departamento: {}) {
    const resp = await api.put<typeDepartamento>(`/api/departamento/${id_departamento}`, departamento,{headers:{"Authorization": `Bearer ${getToken()}`}})
    return resp
}
export async function deleteDepartamento(id_departamento: number) {
    if (window.confirm('Deseja Realmente excluir Departamento?')) {
        const resp = (await api.delete(`/api/departamento/${id_departamento}`,{headers:{"Authorization": `Bearer ${getToken()}`}}))
        return resp.status === 204
    }
    return 
}