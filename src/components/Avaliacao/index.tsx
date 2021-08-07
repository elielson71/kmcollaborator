import { Button } from "../../components/Button";
import { NivelMedioDificuldade } from "../../components/NivelMedioDificuldade";

import './style.scss'
type propsAssessments = {
    idAssessments: number
    departamento: string,
    nivel: string,
    titulo: string,
    responsavel: string,
    //avatar:string,
}

export function Avaliacao(props: propsAssessments) {
    return (
        <section id="avaliacao">
            <div className='info'>
                <h5>DEPARTAMENTO</h5>
                <span>{props.departamento}</span>
                <h5>Nível médio de Dificuldade </h5>
                <NivelMedioDificuldade nivel={props.nivel}></NivelMedioDificuldade>
            </div>

            <div className="contex">
                <Button  >RESPONDER AVALIAÇÃO </Button>
                <h2>{props.titulo}</h2>
                <span>Responsavel: {props.responsavel}</span>
            </div>
            <div className="info-user">
                <button><div><i className="fas fa-user-tie"></i></div></button>
            </div>
            <div className="button">
                <button className="btn btn-info">Editar</button>
                <button className="btn btn-danger">Excluir</button>

            </div>
        </section>
    )
}