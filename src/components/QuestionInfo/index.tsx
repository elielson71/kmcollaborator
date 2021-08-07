import React from 'react';


import './styles.scss';
import {typeInfo} from '../Interface'


type props = {
    idQuestion: number
    hiddenInfo: boolean
    info: typeInfo
    setInfo: React.Dispatch<React.SetStateAction<typeInfo[]>>
}

export function QuestionInfo({ idQuestion, info, setInfo, hiddenInfo }: props) {



    return (
        <div id="question-data" hidden={hiddenInfo} className="card shadow mb-4">
            <div className="card-header py-3 ">
                <h6 className="m-0 font-weight-bold text-primary" >Informações
                </h6>

            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <label htmlFor="status">Senioridade</label>
                        <select className="form-select" value={info.senioridade}
                            onChange={event => setInfo(prev=> prev.map(item => item.id_question===idQuestion?{...item,senioridade:event.target.value}:item))}
                            aria-label="Default select example" >
                            <option value="">Selecione uma Senioridade</option>
                            <option value="J">Junior</option>
                            <option value="P">Pleno</option>
                            <option value="S">Senior</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <label htmlFor="nivel">Nível</label>
                        <select className="form-select" value={info.nivel} 
                             onChange={event => setInfo(prev=> prev.map(item => item.id_question===idQuestion?{...item,nivel:event.target.value}:item))}
                             aria-label="Default select example" >
                            <option value="F" >Facil</option>
                            <option value="M">Médio</option>
                            <option value="D">Díficil</option>
                        </select>
                    </div>
                </div>
                <label htmlFor="Departamento">Departamento</label>
                <select  value={info.departamento} 
                    onChange={event => setInfo(prev=> prev.map(item => item.id_question===idQuestion?{...item,departamento:parseInt(event.target.value)}:item))}
                    className="form-select" aria-label="Default select example">
                    <option value={0}>Selecione o Departamento</option>
                    <option value={1}>Suporte</option>
                    <option value={2}>Administrativo</option>
                </select>
            </div>
        </div>
    )
};

