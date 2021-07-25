
import { useState } from 'react';
import './styles.scss'

type typeResposta = {
    children: string,
    tipo: string

}
export function Resposta(props: typeResposta) {

    const tipoResposta = () => {
        switch (props.tipo) {
            case "U": return (
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                </div>);
            case "M": return (
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                </div>)
            default: return (<i className="fas fa-align-justify"></i>)
        }
    }

    return (
        <div id="resposta">
            <div>
                {tipoResposta()}
            </div>
            <input type="text" placeholder="Digite a resposta" />
            <div className="button">
                <button ><i className="far fa-images"></i></button>
                <button >ADICIONAR</button>
            </div>
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
                {props?.children}
            </label>
        </div>

    )

}