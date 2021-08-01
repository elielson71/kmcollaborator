import { useState } from 'react'
//import { Answer } from '../Answer'
import './styles.scss'

type PropsQuestion={
    idQuestion:number
    contentQuestion?:string
    handleSubmitQuestion?:any
    handleDeleteQuestion?:any
    handleAddListCard:any
    handleDeleteListCard:any
}



export function Question({idQuestion,handleAddListCard,handleDeleteListCard, handleSubmitQuestion, handleDeleteQuestion}: PropsQuestion) {
    const [selectedType, setSelectType] = useState<string>("")
    const [contentQuestion, setContentQuestion] = useState<string>("")

    return (
        <div id="Question" className="card shadow mb-6">
            <div className="card-header py-3">
                <div>
                    <h6 className="m-0 font-weight-bold text-primary" >Pergunta{idQuestion} </h6>
                </div>

                <div className="button">
                    <button onClick={handleAddListCard}><i className="fas fa-plus-circle"></i></button>
                    <button ><i className="far fa-images"></i></button>
                    <button onClick={handleDeleteListCard}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div>
                <div className="card-body" >
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Digite sua Pergunta aqui" id="floatingTextarea2"
                            onChange={event => {
                                event.target.style.height = "auto"
                                event.target.style.height = `${event.target.scrollHeight}px`
                                setContentQuestion(event.target.value)
                            }}
                            value={contentQuestion}
                        />
                        <div className="type-question">
                            <div>
                                <input defaultValue="" className="form-check-input" type="radio" id="Breve" onChange={e => { if (e.target.checked) { setSelectType(e.target.id) } }} name={`radio${idQuestion}`} />
                                <label className="form-check-label" htmlFor={`radio${idQuestion}`} >Breve</label>
                            </div>
                            <div>
                                <input defaultValue="" className="form-check-input" type="radio" id="Longa" onChange={e => { if (e.target.checked) { setSelectType(e.target.id) } }} name={`radio${idQuestion}`} />
                                <label className="form-check-label" htmlFor={`radio${idQuestion}`} >Longa</label>
                            </div>
                            <div>
                                <input defaultValue="" className="form-check-input" type="radio" id="Radio" onChange={e => { if (e.target.checked) { setSelectType(e.target.id) } }} name={`radio${idQuestion}`} />
                                <label className="form-check-label" htmlFor={`radio${idQuestion}`} >Multipla Escolha</label>
                            </div>
                            <div>
                                <input defaultValue="" className="form-check-input" type="radio" id="Check" onChange={e => { if (e.target.checked) { setSelectType(e.target.id) } }} name={`radio${idQuestion}`} />
                                <label className="form-check-label" htmlFor={`radio${idQuestion}`} >Caixa de seleção</label>
                            </div>
                        </div>

                        {//<Answer key={idQuestion} typeQuestions={selectedType} />
}
                    </div>
                </div>
            </div>

        </div>

    )
}
