import { typeBaseConhecimento } from '../components/Interface'
import { api } from './Api'
export async function getBaseConhecimento() {
    return await api.get<typeBaseConhecimento[]>('/api/baseconhecimento')
}
export async function postBaseConhecimento(baseconhecimento:typeBaseConhecimento) {
    return await api.post('/api/baseconhecimento', baseconhecimento)
}

export async function getOneBaseConhecimento(id_baseconhecimento: number) {
    return await api.get<typeBaseConhecimento[]>(`/api/baseconhecimento/${id_baseconhecimento}`)
}

export async function putBaseConhecimento(id_baseconhecimento: number, baseconhecimento: {}) {
    return await api.put<typeBaseConhecimento>(`/api/baseconhecimento/${id_baseconhecimento}`, baseconhecimento)
}
export async function deleteBaseConhecimento(id_baseconhecimento: number) {
    
        return (await api.delete(`/api/baseconhecimento/${id_baseconhecimento}`))
    
    return {'status':'', 'data':{'message':'sem comunicaçao'}}
}
export async function deleteBaseConhecimentoPro(id_baseconhecimento: number) {
        return (await api.delete(`/api/baseconhecimentopro/${id_baseconhecimento}`))
}