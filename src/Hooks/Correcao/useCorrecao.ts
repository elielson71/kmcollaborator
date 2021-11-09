import { useHistory } from "react-router"
import { typeCorrecao } from "../../components/Interface"
import { useEffect, useMemo, useState } from "react"

import { deleteCorrecao, getCorrecao, getOneCorrecao} from "../../service/CorrecaoService"
import { useProfissional } from "../Profissional/useProfissional";
import { useAvaliacoes } from "../Avaliacao/useAvaliacoes"


export function useCorrecao(id_correcao: string) {

  const [correcao] = useState<typeCorrecao>({
    id_profissional: 0,
    id_avaliacao: 0,
    situacao: 'A',
    //data_correcao: new Date(),
    itens_correcao: [],
  })

  const { allProfissionais } = useProfissional('')
  const { allAvaliacao } = useAvaliacoes('')

  useEffect(() => {
    if (id_correcao === '') {
      recuperarTodosCorrecao()
    } else if (id_correcao !== '') {
      RecuperarOneCorrecao(parseInt(id_correcao))
    }


  }, [id_correcao])



  async function RecuperarOneCorrecao(id: number) {
    const resp = await getOneCorrecao(id)
    if (resp.status === 200) {

    }
  }
  const [allCorrecao, setAllCorrecao] = useState<typeCorrecao[]>([])
  async function recuperarTodosCorrecao() {
    const resp = await getCorrecao()
    if (resp.status === 200) {
      //setCorrecao(resp.data[])
      setAllCorrecao(resp.data)
    }
  }
  async function excluirCorrecao(id: number) {
    const resp = await deleteCorrecao(id)
    if (resp.status === 204)
      window.location.reload()
    else if (resp.status >= 400) {
      alert(`Erro ao excluir!${resp.status}\n ${resp.data.message}`)
    }
    else {
    }
  }
  const nome_profissional = (id_profissional: number) => {
    const prof = allProfissionais.filter(item => item.id_profissional === id_profissional)[0]
    const nome_profissional =prof ? prof.nome_completo : 'Sem nome'
    return nome_profissional
  }
   function avaliacaoDesc(id_avaliacao:number){
    const avaliacao = allAvaliacao.filter(item=>item.id_avaliacoes===id_avaliacao)[0]
    const aval = avaliacao?avaliacao.titulo:''
    return aval
  }

  const [busca,setBusca]=useState('')
  const filterBusca = useMemo(()=>{
    if(busca){
      const lowerBusca = busca.toLocaleLowerCase();
      return allCorrecao.filter(item=>
          avaliacaoDesc(item.id_avaliacao).toLocaleLowerCase().includes(lowerBusca)
          )
      }
      return allCorrecao
  },[allCorrecao,busca])


  const history = useHistory()
  return { allCorrecao, correcao, history, excluirCorrecao, nome_profissional,setBusca,filterBusca,avaliacaoDesc}
}
