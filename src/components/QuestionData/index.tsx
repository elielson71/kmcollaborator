import React, { useState} from 'react';


import './styles.scss';

type typeData = {
    status?:string,
    nota?:number,
    responsavel?:number,
    senioridade?:string,
    departamento?:string,
    nivel?:string,


}
//var refInputNote:React.createRef();
export function QuestionData  (){
        const [data,setData] = useState<typeData>({})

       function validateNote(event:React.ChangeEvent<HTMLInputElement>){
           const note:number = parseInt(event.target.value)
            if(note<=0 || note>10){
                alert(`Nota ${note} inválida!\n Digite uma nota entre 0 e 10!`)
                setData({nota:1});
                //refInputNote?.current.focus()
            }
            return note;
       }

return(
    <div id="question-data" className="card shadow mb-4">
        <div className="card-header py-3 ">
            <h6 className="m-0 font-weight-bold text-primary" >Informações
            </h6>

        </div>
        <div className="card-body">
            <div className="row">
                <div className="col-8">
                    <label htmlFor="status">Status</label>
                    <select className="form-select" aria-label="Default select example" defaultValue="1">
                        <option selected >Aberto</option>
                        <option value="2">Concluída</option>
                        <option value="3">Cancelada</option>
                    </select>
                </div>
                <div className="col-4">
                    <label htmlFor="status">Nota</label>
                    <input type="number" className="form-control" 
                        onChange={event=>setData({nota:parseInt(event.target.value)})}
                        value={data.nota}
                        onBlur={validateNote}
                       
                        />
                </div>
            </div>
            <label htmlFor="responsavel">Responsável</label>
            <select className="form-select" aria-label="Default select example">
                <option selected>Selecione o Responsável</option>
                <option value="1">Elielson da Silva Santos</option>
                <option value="2">Junior</option>
            </select>
            <label htmlFor="status">Senioridade</label>
            <select className="form-select" aria-label="Default select example">
                <option selected>Selecione uma Senioridade</option>
                <option value="J">Junior</option>
                <option value="P">Pleno</option>
                <option value="S">Senior</option>
            </select>

            <label htmlFor="responsavel">Departamento</label>
            <select className="form-select" aria-label="Default select example">
                <option selected>Selecione o Departamento</option>
                <option value="1">Suporte</option>
                <option value="2">Administrativo</option>
            </select>
            <label htmlFor="responsavel">Nível de Question</label>
            <select className="form-select" aria-label="Default select example" defaultValue="F">
                <option selected >Facil</option>
                <option value="M">Médio</option>
                <option value="D">Díficil</option>
            </select>
        </div>
    </div>
)};

