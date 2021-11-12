import { typeLinks } from '../components/Interface'
import {api} from './Api';


export async function postLinks(links: typeLinks[]) {
     const resp = await api.post('/api/baseconhecimento/links', links)
     return resp.status === 201
}

export async function deleteLinks(id_links: number) {
     if (window.confirm('Deseja Realmente excluir essa Links?\n A links será removida diretamente do banco de dados!')) {
          const resp = (await api.delete(`api/links/${id_links}`))
          return resp.status === 204
     }
     return
}