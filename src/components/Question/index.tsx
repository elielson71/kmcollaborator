import { useState } from 'react'
import { Resposta } from '../Resposta'
import './styles.scss'
export function Question({ onSubmit, onExcluir }: any) {

    const [resposta, setResposta] = useState<string>("")
    return (
        <div id="Question" className="card shadow mb-6">
            <div className="card-header py-3">
                <div>
                    <h6 className="m-0 font-weight-bold text-primary" >Pergunta </h6>
                </div>
                <div className="button">
                    <button onClick={onSubmit}><i className="fas fa-plus-circle"></i></button>
                    <button ><i className="far fa-images"></i></button>
                    <button onClick={onExcluir}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div>
                <div className="card-body" >
                    <div className="form-floating">
                        <div className="pergunta">
                            <textarea className="form-control" placeholder="Digite sua Pergunta aqui" id="floatingTextarea2"
                                onChange={event => {
                                    event.target.style.height = "auto"
                                    event.target.style.height = `${event.target.scrollHeight}px`
                                }}
                            />
                        </div>
                        <div>
                            <div className="tipo-resposta">
                                <select onChange={event => setResposta(event.target.value)} className="form-select" aria-label="Default select example" defaultValue="0">
                                    <option value="0" selected >Tipo da Resposta</option>
                                    <option value="A" >Aberta</option>
                                    <option value="U">Alternativa</option>
                                    <option value="M">MultiEscolha</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <Resposta
                                tipo={resposta}
                                children={"Primeira respostas"}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
