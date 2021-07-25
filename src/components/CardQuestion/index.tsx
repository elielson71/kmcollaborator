import './styles.scss'
type propsQuestion = {
    title:string,
    departamento:string,
    nivel:string

}
export function CardQuestion(props:propsQuestion) {
    return (
        <div id="card-questao">
            <div className="card ">
                <div className="card-title">
                    <input type="checkbox" />
                </div>
                <div className="card-bory">

                    <div className="titulo-pergunta">
                        <h3>{props.title}</h3>
                    </div>
                    <div className="info-pergunta">
                        <span>Departamento: {props.departamento}</span>
                        <span>nivel: {props.nivel}</span>
                    </div>
                    <div >
                        <button className="btn btn-secondary">Visualizar Pergunta</button>
                    </div>
                </div>
            </div>
        </div>
    )
}