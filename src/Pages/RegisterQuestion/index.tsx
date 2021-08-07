import { useState } from 'react';
import './styles.scss'
import { Button } from '../../components/Button';
import { ListAnswer } from '../../components/ListAnswer';
import { QuestionInfo } from '../../components/QuestionInfo';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import { typeAnswer, typeInfo, typeQuestion } from '../../components/Interface'
let count = 1;
let countAnswer = 0;
export function RegisterQuestion() {
    const [listQuestions, setListQuestions] = useState<typeQuestion[]>([{ id: 0, conteudo: '', tipo_resposta: '', hiddenInfo: false }])
    const [answers, setAnswers] = useState<typeAnswer[]>([])
    const [infoQuestions, setInfoQuestions] = useState<typeInfo[]>([{ departamento: 0, senioridade: '', nivel: 'F', responsavel: 0, id_question: 0, }])

    const history = useHistory();

    async function saveQuestion() {
        const DataQuestions = {} as any;
        const r = {} as any

        listQuestions.map(function (lq, key) {
            DataQuestions["perg" + key] = lq
            answers.filter(function (ans, index) {
                    r['rs' + index] = ans as any
                return ans.id_question === lq.id
            })
            lq.answersQuestion = r
            infoQuestions.filter(function (dq) {
                lq['info'] = dq
                return dq.id_question === lq.id
            })
            return null
        })
        function ValidadeDataQuestions(DataQuestion: Object) {
            let erro = false
             Object.values(DataQuestion).forEach(element => {
                //validar pergunta
                if (element.conteudo === "") {
                    alert("Não é possível salvar Questions sem conteudo!")
                    erro=true
                } else if (erro&&element.tipo_resposta === "") {
                    alert("Não é possível salvar Questions sem tipo de resposta! \nSelecione um tipo de resposta para Salvar!")
                    erro=true
                }
            })
            return erro
        }
        //console.log(DataQuestions)
        if (!(ValidadeDataQuestions(DataQuestions))) {
            const question = await axios.post('http://localhost:3001/questions', DataQuestions)
            if (question) {
                alert("Questões Salvas com Sucesso!")
                history.push('/avaliacao/new')
            } else {
                alert("Erro ao Salvar Questões!")
                console.log(question)

            }
        }
    }

    function handleAddListCard(index: typeQuestion['id']) {
        const newItem = { id: count++, conteudo: '', tipo_resposta: "", hiddenInfo: true };
        setListQuestions(prev => [...prev.slice(0, index + 1), newItem, ...prev.slice(index + 1),])
        const newItemIfo = { departamento: 0, senioridade: '', nivel: 'F', responsavel: 0, id_question: newItem.id }
        setInfoQuestions(prev => [...prev.slice(0, index + 1), newItemIfo, ...prev.slice(index + 1),])
    }
    function handleChangeListCard(value: string, id: typeQuestion['id']) {
        setListQuestions(prev => prev.map(item => item.id === id ? { ...item, conteudo: value } : item))

    }
    function handleChangeTypeListCard(type: string, id: typeQuestion['id']) {
        setListQuestions(prev => prev.map(item => item.id === id ? { ...item, tipo_resposta: type } : item))
        if (answers.length === 0)
            setAnswers([{ idAnswer: countAnswer++, content: type === "B" ? "Breve" : type === "L" ? "Longa" : "", id_question: id, selectedType: type, isTrue: false }])
        else {
            if (answers.filter(a => a.id_question === id)) {
                if (answers.filter(a => a.id_question === id).length === 0)
                    setAnswers([...answers, { idAnswer: countAnswer++, content: type === "B" ? "Breve" : type === "L" ? "Longa" : "", id_question: id, selectedType: type, isTrue: false }])
                else
                    setAnswers(prev => prev.map(item => item.id_question === id ? { ...item, selectedType: type } : item))
            }
        }

    }
    function handleDeleteListCard(id: typeQuestion['id']) {
        if (listQuestions.length !== 1) {
            setListQuestions(prev => prev.filter(item => item.id !== id))
            setInfoQuestions(prev => prev.filter(item => item.id_question !== id))
        }
    }



    function handleAddAnswer(index: typeAnswer["idAnswer"],
        id_question: typeAnswer["id_question"],
        content: typeAnswer["content"],
        selectedType: string) {
        if ((selectedType === "R"
            || selectedType === "C"
        ) && content !== "") {
            const newAnswer = { idAnswer: countAnswer++, content: "", id_question, selectedType, isTrue: false };
            setAnswers(prev => [...prev.slice(0, index + 1), newAnswer, ...prev.slice(index + 1),])
        }

    }
    function handleDeleteAnswer(index: number) {
        setAnswers(prev => prev.filter(item => item.idAnswer !== index))
    }
    function handleChangeAnswer(idAnswer: number, idQuestion: number, content: string) {
        setAnswers(prev => prev.map(answer => answer.idAnswer === idAnswer && answer.id_question === idQuestion ?
            { ...answer, content } : answer))
    }
    function handleChangeTrueAnswer(idAnswer: number, idQuestion: number, isTrue: boolean,) {
        setAnswers(prev => prev.map(answer => answer.idAnswer === idAnswer && answer.id_question === idQuestion ?
            { ...answer, isTrue } : answer))
    }


    return (
        <div id="register-question">
            <div className="container">
                <div className="row">
                    <div className="col-2" id="btn">

                    </div>
                    <h3 className="col-6">Cadastrar Novas Questions</h3>
                    <div className="col-4" id="btn">
                        <Link to='/avaliacao/new'><button className='btn btn-seccundary' >Voltar</button></Link>
                        <Button onClick={saveQuestion} >Salvar {listQuestions.length === 1 ? "Questão" : "Questões"}</Button>
                    </div>
                </div>
            </div>
            {listQuestions.map((item, index) => (
                <div className="questions" key={index}>

                    <div id="Question" className="card shadow mb-6">
                        <div className="card-header py-3">
                            <div>
                                <h6 className="m-0 font-weight-bold text-primary" >Questão</h6>
                            </div>

                            <div className="button">
                                <button onClick={() => handleAddListCard(index)}><i className="fas fa-plus-circle"></i></button>
                                <button ><i className="far fa-images"></i></button>
                                <button onClick={() => handleDeleteListCard(item.id)}><i className="fas fa-trash-alt"></i></button>
                                <button onClick={() => { setListQuestions(prev => prev.map(i => i.id === item.id ? { ...i, hiddenInfo: (!i.hiddenInfo) } : i)) }}><i className="fas fa-info"></i></button>
                            </div >

                        </div>
                        <div>
                            <div className="card-body" >
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Digite sua pergunta aqui!" id="floatingTextarea2"
                                        onChange={event => {
                                            event.target.style.height = "auto"
                                            event.target.style.height = `${event.target.scrollHeight}px`
                                            handleChangeListCard(event.currentTarget.value, item.id)
                                        }}
                                        value={item.conteudo}
                                    />
                                    <div className="type-question">
                                        <div>
                                            <input defaultValue="" className="form-check-input" type="radio" id="B" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id,) } }} name={`radio${index}`} />
                                            <label className="form-check-label" htmlFor={`radio${index}`} >Breve</label>
                                        </div>
                                        <div>
                                            <input defaultValue="" className="form-check-input" type="radio" id="L" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id) } }} name={`radio${index}`} />
                                            <label className="form-check-label" htmlFor={`radio${index}`} >Longa</label>
                                        </div>
                                        <div>
                                            <input defaultValue="" className="form-check-input" type="radio" id="R" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id) } }} name={`radio${index}`} />
                                            <label className="form-check-label" htmlFor={`radio${index}`}  >Multipla Escolha</label>
                                        </div>
                                        <div>
                                            <input defaultValue="" className="form-check-input" type="radio" id="C" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id, item.id) } }} name={`radio${index}`} />
                                            <label className="form-check-label" htmlFor={`radio${index}`} >Caixa de seleção</label>
                                        </div>
                                    </div>

                                    <div id="answer">
                                        {
                                            answers.filter(filterAnswer => filterAnswer.id_question === item.id)
                                                .map((answer, key) => (
                                                    <div className="add-answer">
                                                        <ListAnswer
                                                            key={key}
                                                            idAnswer={answer.idAnswer}
                                                            isTrue={answer.isTrue}
                                                            idQuestion={item.id}
                                                            content={answer.content}
                                                            typeQuestions={answer.selectedType}
                                                            handleAddAnswer={handleAddAnswer}
                                                            handleDeleteAnswer={handleDeleteAnswer}
                                                            handleChangeAnswer={handleChangeAnswer}
                                                            handleChangeTrueAnswer={handleChangeTrueAnswer}
                                                        />
                                                    </div>
                                                ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    {infoQuestions.map(i => (
                        i.id_question === item.id &&
                        <QuestionInfo
                            key={item.id}
                            info={i}
                            idQuestion={item.id}
                            setInfo={setInfoQuestions}
                            hiddenInfo={item.hiddenInfo}
                        />
                    ))}

                </div>
            ))}

        </div>


    )
}