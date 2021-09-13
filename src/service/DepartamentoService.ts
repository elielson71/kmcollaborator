import {  typeDepartamento } from '../components/Interface'
import { api } from './Api'
export async function getDepartamento() {
    return await api.get<typeDepartamento[]>('/departamento')
}
export async function postDepartamento(departamento:{}) {
    const resp = await api.post('/departamento', departamento)
    return resp
}

export async function getOneDepartamento(id_departamento: number) {
    return await api.get<typeDepartamento[]>(`/departamento/${id_departamento}`)
}

export async function putDepartamento(id_departamento: number, departamento: {}) {
    const resp = await api.put<typeDepartamento>(`/departamento/${id_departamento}`, departamento)
    return resp
}
export async function deleteDepartamento(id_departamento: number) {
    if (window.confirm('Deseja Realmente excluir Departamento?')) {
        const resp = (await api.delete(`/departamento/${id_departamento}`))
        return resp.status === 204
    }
    return 
}