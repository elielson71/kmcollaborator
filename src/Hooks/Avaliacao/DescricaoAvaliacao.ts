import { useAvaliacoes } from "./useAvaliacoes";
export function avaliacaoDesc(id_avaliacao:number){
    const { allAvaliacao } = useAvaliacoes('')
    const avaliacao = allAvaliacao.filter(item=>item.id_avaliacoes===id_avaliacao)[0]
    const aval = avaliacao?avaliacao.titulo:''
    return aval
  }