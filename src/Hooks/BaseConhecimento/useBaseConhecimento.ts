import { useEffect, useState } from "react"
import { typeBaseConhecimento } from "../../components/Interface"
import { getBaseConhecimento, getOneBaseConhecimento } from "../../service/BaseConhecimento"

export function useBaseConhecimento(id_baseconhecimento: string) {
    const [allBaseConhecimento, setAllBaseConhecimento] = useState<typeBaseConhecimento[]>([])
    const [baseconhecimento, setBaseConhecimento] = useState<typeBaseConhecimento>({ data_cadastro: '', nome: '', tipo: '' })
    async function recuperarOneBaseConhecimento(id: number) {
        const resp = await getOneBaseConhecimento(id)
        if (resp.status === 200) {
            setBaseConhecimento(resp.data[0])
        }
    }
    async function getDescricaoBC(id: number) {
        const resp = await getOneBaseConhecimento(id)
        if (resp.status === 200) {
            return resp.data[0].nome
        }
        return ''
    }
    async function getUrl(id: number) {
        const resp = await getOneBaseConhecimento(id)
        if (resp.status === 200) {
            if (resp.data[0])
                return resp.data[0].url
        }
        return ''
    }
    async function recuperarTodosBaseConhecimento() {
        const resp = await getBaseConhecimento()
        if (resp.status === 200) {
            setAllBaseConhecimento(resp.data)

        }
    }
    useEffect(() => {
        if (id_baseconhecimento === '') {
            recuperarTodosBaseConhecimento()
        } else if (id_baseconhecimento !== '') {
            recuperarOneBaseConhecimento(parseInt(id_baseconhecimento))
        }

    }, [id_baseconhecimento])
    return {
        recuperarOneBaseConhecimento,
        recuperarTodosBaseConhecimento,
        allBaseConhecimento, baseconhecimento,
        setBaseConhecimento,
        getDescricaoBC,
        getUrl
    }

}