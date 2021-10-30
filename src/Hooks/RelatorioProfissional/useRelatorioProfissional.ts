import { useHistory } from "react-router"
import { useEffect, useMemo, useState } from "react"
import { getRelatorioProfissonal} from "../../service/CorrecaoService"
import { useProfissional } from "../Profissional/useProfissional"
import { useDepartamento } from "../Departamento/useDepartamento"

type typeRelatorioProfissonal ={
  titulo:string,
  nome_completo:string,
  desc_partamento?:string,
  nota:string,
  data_correcao:string,
  id_profissional:number,
  id_departamento?:number
}

export function useRelatorioProfissional() {
  
  const [allRelatorio,setAllrelatorio] = useState<typeRelatorioProfissonal[]>([])

  const [correcao] = useState<typeRelatorioProfissonal>({
    titulo: '',
    nome_completo:'',
    nota:'',
    data_correcao:'',
    id_profissional:0
  })

  const [id_profissional,setId_profissional]=useState(0)
  const [id_departamento,setId_departamento]=useState(0)
  useEffect(() => {
      recuperarTodosCorrecao(id_profissional)
  }, [id_profissional])

  async function recuperarTodosCorrecao(id_profissional:number) {
    const resp = await getRelatorioProfissonal(id_profissional)
    if (resp.status === 200) {
      setAllrelatorio(resp.data)
    }
  }
  const [busca,setBusca]=useState(0)
  const [buscaD,setBuscaD]=useState(0)
  
  const filterBusca = useMemo(()=>{
    const lowerBusca = busca
    if(busca){
      return allRelatorio.filter(item=>
          item.id_profissional===lowerBusca 
          )
      }

      return allRelatorio
  },[allRelatorio,busca])
  const filterBuscaD = useMemo(()=>{
    const lowerBusca = buscaD
    if(buscaD){
      console.log(lowerBusca)
      return allRelatorio.filter(item=>item.id_departamento).filter(item=>
        item.id_departamento===lowerBusca
        )
    }
      return allRelatorio
  },[allRelatorio,buscaD])
 
  
  const {allProfissionais} = useProfissional('')
  const {departamentos} = useDepartamento('')

  const media=()=>{
    let i=0
    const soma = filterBusca.reduce((media,item)=>{
      media+=parseInt(item.nota)
      i++
      return media
    },0)

    return (soma/i).toFixed(2)

  }  
  const mediaD=()=>{
    let i=0
    const soma = filterBuscaD.reduce((media,item)=>{
      media+=parseInt(item.nota)
      i++
      return media
    },0)

    return (soma/i).toFixed(2)

  } 
  return { allRelatorio, correcao, filterBusca, 
    setBusca,profissional:allProfissionais,id_profissional,setId_profissional,
    id_departamento,setId_departamento, departamentos,
    setBuscaD,filterBuscaD,media,mediaD}
}
