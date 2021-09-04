import { Button } from "../../components/Button";
import { NivelMedioDificuldade } from "../../components/NivelMedioDificuldade";

import './style.scss'
type propsAvaliacao={
    id_avaliacoes?: number
    titulo: string
    id_usuario: number
    id_departamento?: number
    deleteAvaliacao:any
    editAvaliacao:any
}
export function Avaliacao({id_usuario,titulo,id_avaliacoes,id_departamento,editAvaliacao,deleteAvaliacao}: propsAvaliacao) {
    
    return (
        <section id="avaliacao">
            <div className='info'>
                <h5>DEPARTAMENTO</h5>
                <span>{id_departamento}</span>
                <h5>Nível médio de Dificuldade </h5>
                <NivelMedioDificuldade nivel={'F'}></NivelMedioDificuldade>
            </div>

            <div className="contex">
                <Button  >RESPONDER AVALIAÇÃO </Button>
                <h2>{titulo}</h2>
                <span>Responsavel: {id_usuario}</span>
            </div>
            <div className="info-user">
                <button><div><i className="fas fa-user-tie"></i></div></button>
            </div>
            <div className="button">
                <button className="btn btn-info" onClick={()=>editAvaliacao(id_avaliacoes)}>Editar</button>
                <button className="btn btn-danger" onClick={()=>deleteAvaliacao(id_avaliacoes)}>Excluir</button>

            </div>
        </section>
    )
}