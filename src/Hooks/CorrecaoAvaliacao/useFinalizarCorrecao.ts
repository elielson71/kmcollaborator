import { useHistory } from "react-router";
import {  typeCorrecao, typeItensCorrecao } from "../../components/Interface"
import {  putCorrecao } from "../../service/CorrecaoService";

export function useFinalizarCorrecao(dataQ: typeItensCorrecao[],
    id_correcao:number,
    ) {
        const history = useHistory()
    
    async function finalizar() {

        const date = new Date()
        
        const dataCorrecao = {
            situacao: 'C',
            data_correcao: date as unknown as string,
            itens_correcao: dataQ
        } as typeCorrecao



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