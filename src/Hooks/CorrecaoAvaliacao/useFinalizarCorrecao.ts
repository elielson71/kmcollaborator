import { useHistory } from "react-router";
import {  typeCorrecao, typeItensCorrecao } from "../../components/Interface"
import {  putCorrecao } from "../../service/CorrecaoService";

export function useFinalizarCorrecao(id_correcao:number,dataQ: typeItensCorrecao[]// CallsaveQuestions:(arg:boolean)=>void
    ) {
        const history = useHistory()
    async function finalizar() {
        //CallsaveQuestions(true)
        
        
        const dataCorrecao = {
            situacao: 'C',
            itens_correcao: dataQ
        } as typeCorrecao

//console.log(dataCorrecao)

        if (dataQ.length !== 0){
            const resp = await putCorrecao(id_correcao,dataCorrecao)
            if(resp.status===204)
                history.push('/correcao')
        }else{
            alert('Não possível Salvar correção!')
        }

        return true
    }
    
    return { finalizar }
}