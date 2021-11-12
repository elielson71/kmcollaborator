import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { typeLinks } from "../../components/Interface";
import { deleteLinks } from "../../service/LinkService";
import { useBaseConhecimento } from "../BaseConhecimento/useBaseConhecimento";

let countLinks = 0
export type typePropsLinks ={
    id_perguntas?: number
    links:typeLinks[]
    setLinks:Dispatch<SetStateAction<typeLinks[]>>
}
export function useLinks({id_perguntas,links,setLinks}:typePropsLinks) {
    

    const [id_midia, setId_midia] = useState('')
    const { allBaseConhecimento, getDescricaoBC } = useBaseConhecimento('');


    async function handleAddLinks(e: FormEvent, id_midias: string) {
        e.preventDefault();
        if (id_midias !== "") {
            const dados = await getDescricaoBC(parseInt(id_midias))
            const newLinks: typeLinks = { id_midias: parseInt(id_midias), dados, id_links: countLinks++,status:'AB' }
            setLinks([...links, newLinks])
        }
        setId_midia('')
    }

    async function handleDeleteLinks(index: number, id_links: number) {
        if (index !== undefined) {
            if (id_perguntas!==undefined) {
                if (await deleteLinks(id_links))
                setLinks(prev => prev.filter(item => item.id_links!==id_links))
            } else {
                setLinks(prev => prev.filter(item => item.id_links!==id_links))
            }
        }
    }

    return { links, setLinks, id_midia, setId_midia, handleAddLinks, allBaseConhecimento, handleDeleteLinks }
}