
type propsNivel={
    nivel:string,
}

export function NivelMedioDificuldade(props:propsNivel) {
    return (
        <div>
            <span>{props.nivel}</span>
            <p>---------------------</p>
        </div>
    )
}