import { useState } from 'react';
import './styles.scss'
import { Button } from '../../components/Button';
import { ListAnswer } from '../../components/ListAnswer';

interface List {
    id: number
    value: string
    type: string
}
type Answer = {
    idAnswer: number
    content: string
    id_question: number
    selectedType: string
}
let count = 1;
let countAnswer = 0;
export function RegisterQuestion() {
    const [listQuestions, setListCard] = useState<List[]>([{ id: 0, value: '', type: '' }])
    const [answers, setAnswers] = useState<Answer[]>([])

    let contentQuestionAnswer = listQuestions ;
    function handleAddListCard(index: List['id']) {
        const newItem = { id: count++, value: '', type: "" };
        setListCard(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1),])
    }
    function handleChangeListCard(value: string, id: List['id']) {
        setListCard(prev => prev.map(item => item.id === id ? { ...item, value } : item))

    }
    function handleChangeTypeListCard(type: string, id: List['id']) {
        setListCard(prev => prev.map(item => item.id === id ? { ...item, type } : item))
        const selectedType = type;
        if (answers.length == 0)
            setAnswers([{ idAnswer: countAnswer++, content: "", id_question: id, selectedType: type }])
        else {
            if (answers.filter(a => a.id_question === id)) {
                if (answers.filter(a => a.id_question === id).length == 0)
                    setAnswers([...answers, { idAnswer: countAnswer++, content: "", id_question: id, selectedType: type }])
                else
                    setAnswers(prev=>prev.map(item=> item.id_question===id ?{...item,selectedType:type}:item))
        }}

    }
    function handleDeleteListCard(id: List['id']) {
        setListCard(prev => prev.filter(item => item.id !== id))
    }



    function handleAddAnswer(index: Answer["idAnswer"],
        id_question: Answer["id_question"],
        content: Answer["content"],
        selectedType: string) {
        if ((selectedType === "Radio"
            || selectedType === "Check"
            || selectedType === "VF"
        ) && content !== "") {
            const newAnswer = { idAnswer: countAnswer++, content: "", id_question, selectedType };
            setAnswers(prev => [...prev.slice(0, index + 1), newAnswer, ...prev.slice(index + 1),])
        }

    }
    function handleDeleteAnswer(index: number) {
        setAnswers(prev=>prev.filter(item=>item.idAnswer!==index))
    }
    function handleChangeAnswer(idAnswer: number, idQuestion: number, content: string) {
        setAnswers(prev => prev.map(answer => answer.idAnswer === idAnswer && answer.id_question === idQuestion ?
            { ...answer, content } : answer))
    }

    return (
        <div id="register-question">
            <div className="container">
                <div className="row">
                    <div className="col-2" id="btn">

                    </div>
                    <h3 className="col-8">Cadastrar Novas Questions</h3>
                    <div className="col-2" id="btn">
                        <Button to='/avaliacao' >Finalizar "</Button>
                        <button onClick={()=>{
                            console.log(listQuestions.map(lq=>({"pergunta":lq,"resposta":answers.filter(ans=>ans.id_question===lq.id)}))
                            )
                            
                            }}></button>
                    </div>
                </div>
            </div>
            <div className="questions">

                {
                    listQuestions.map((item, index) => (
                        //questions.map((question, index) => (
                        <div id="Question" className="card shadow mb-6">
                            <div className="card-header py-3">
                                <div>
                                    <h6 className="m-0 font-weight-bold text-primary" >Questão</h6>
                                </div>

                                <div className="button">
                                    <button onClick={() => handleAddListCard(index)}><i className="fas fa-plus-circle"></i></button>
                                    <button ><i className="far fa-images"></i></button>
                                    <button onClick={() => handleDeleteListCard(item.id)}><i className="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                            <div>
                                <div className="card-body" >
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Digite sua pergunta aqui!" id="floatingTextarea2"
                                            onChange={event => {
                                                event.target.style.height = "auto"
                                                event.target.style.height = `${event.target.scrollHeight}px`
                                                //setContentQuestion(event.target.value)
                                                handleChangeListCard(event.currentTarget.value, item.id)
                                            }}
                                            value={item.value}
                                        />
                                        <div className="type-question">
                                            <div>
                                                <input defaultValue="" className="form-check-input" type="radio" id="Breve" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id,) } }} name={`radio${index}`} />
                                                <label className="form-check-label" htmlFor={`radio${index}`} >Breve</label>
                                            </div>
                                            <div>
                                                <input defaultValue="" className="form-check-input" type="radio" id="Longa" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id) } }} name={`radio${index}`} />
                                                <label className="form-check-label" htmlFor={`radio${index}`} >Longa</label>
                                            </div>
                                            <div>
                                                <input defaultValue="" className="form-check-input" type="radio" id="Radio" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id) } }} name={`radio${index}`} />
                                                <label className="form-check-label" htmlFor={`radio${index}`} >Multipla Escolha</label>
                                            </div>
                                            <div>
                                                <input defaultValue="" className="form-check-input" type="radio" id="Check" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id) } }} name={`radio${index}`} />
                                                <label className="form-check-label" htmlFor={`radio${index}`} >Caixa de seleção</label>
                                            </div>
                                        </div>

                                        <div id="answer">
                                            {
                                                answers.filter(filterAnswer => filterAnswer.id_question === item.id)
                                                    .map((answer, key) => (
                                                        <div className="add-answer">
                                                            <ListAnswer
                                                                key={answer.idAnswer }
                                                                idAnswer={answer.idAnswer}
                                                                idQuestion={item.id}
                                                                content={answer.content}
                                                                typeQuestions={answer.selectedType}
                                                                handleAddAnswer={handleAddAnswer}
                                                                handleDeleteAnswer={handleDeleteAnswer}
                                                                handleChangeAnswer={handleChangeAnswer}
                                                            />
                                                        </div>
                                                    ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
            </div>

        </div>


    )
}