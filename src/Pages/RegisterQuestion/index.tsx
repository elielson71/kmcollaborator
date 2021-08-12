import { useEffect, useState } from 'react';
import './styles.scss'
import { Button } from '../../components/Button';
import { QuestionInfo } from '../../components/QuestionInfo';
import { Link, useHistory, useParams } from 'react-router-dom';
import { typeAnswer, typeQuestions } from '../../components/Interface'
import { postQuestions, getOneQuestions, getQuestionsAnswer } from '../../service/QuestionsService';

import { AnswerInput, ButtonIcon, ListAnswerDiv } from '../../components/componetsStypes'
import { validateYupSchema } from 'formik';

type QuestionParams = {
    id: string
}
let countAnswer = 0;
export function RegisterQuestion() {

    const [Questions, setQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_departamento: 0, senioridade: '', nivel: 'F', id_responsavel: 0 })
    const [answers, setAnswers] = useState<typeAnswer[]>([])
    const [hiddenInfo, setHiddenInfo] = useState<boolean>(false)
    const history = useHistory();
    const params = useParams<QuestionParams>()
    const questionId = params.id;

    async function RecuperarQuestao(id: string) {
        const dataQuestion: typeQuestions[] = (await getOneQuestions(parseInt(id))).data
        const dataAnswer: typeAnswer[] = (await getQuestionsAnswer(parseInt(id))).data
        dataQuestion.map(value => {
            setQuestions(value)

        }
        )

        console.log(dataQuestion)
        setAnswers(dataAnswer)

    }
    useEffect(() => {
        RecuperarQuestao(questionId)
    }
        , [questionId])

    async function saveQuestion() {
        if (!(Questions.tipo_resposta === 'B' || Questions.tipo_resposta === 'L')) {
            const resp = {} as any
            answers.forEach(function (ans, index) {
                resp[index] = ans as any

            })
            Questions['answers'] = resp
        }

        function ValidadeDataQuestions(Question: typeQuestions) {

            //validar pergunta
            if (Question.conteudo === "") {
                alert("Conteudo é campo Obrigatório!")
                return
            } else if (Question.tipo_resposta === "") {
                alert("Não é possível salvar Questão sem um tipo de resposta! \nSelecione um tipo de resposta para Salvar!")
                return
            } else if (Question.id_departamento === 0) {
                alert("Selecione o Departamento")
                return
            } else if (Question.senioridade === '') {
                alert("O campo senioridade é Obrigatório")
                return
            } else {
                let nullrespota = false
                let umverdadeiro = false
                answers.map(value => {
                    nullrespota = value.descricao === ""
                    umverdadeiro = value.selectedType === "R" || value.selectedType === "C"
                })
                if (nullrespota) {
                    alert("Não é possível salva com reposta em branco")
                    return
                }

                if (umverdadeiro) {
                    alert("Marque a resposta verdadeira!")
                    return
                }
            }

            return true
        }

        if ((ValidadeDataQuestions(Questions))) {
            const resp = postQuestions(Questions)
            if (await resp) {
                alert("Questões Salvas com Sucesso!")
                history.push('/avaliacao/new')
            } else {
                alert("Erro ao Salvar Questões!")
                console.log(resp)

            }
        }
    }

    function handleChangeTypeListCard(tipo_resposta: string) {
        setQuestions({ ...Questions, tipo_resposta })
        if ((tipo_resposta === 'R' || tipo_resposta === 'C') && answers.length !== 0)
            setAnswers(prev => prev.map(answer => answer.selectedType === 'B' || answer.selectedType === 'L' ? { ...answer, content: "", selectedType: tipo_resposta } : { ...answer, selectedType: tipo_resposta }))
        else
            setAnswers([{ id_respostas: countAnswer++, descricao: tipo_resposta === 'B' ? 'Breve' : tipo_resposta === 'L' ? 'Longa' : "", selectedType: tipo_resposta, correta: false }])
    }
    function handleAddAnswer(index: typeAnswer["id_respostas"], content: typeAnswer["descricao"], selectedType: string) {
        if ((selectedType === "R" || selectedType === "C") && content !== "") {
            const newAnswer:typeAnswer = { id_respostas: countAnswer++, descricao: "", selectedType, correta: false };
            setAnswers(prev => [...prev.slice(0, index + 1), newAnswer, ...prev.slice(index + 1),])
        }

    }
    function handleDeleteAnswer(index: number) {
        if (index !== undefined)
            setAnswers(prev => prev.filter(item => item.id_respostas !== index))
    }
    function handleChangeAnswer(idAnswer: number, content: string) {
        setAnswers(prev => prev.map(answer => answer.id_respostas === idAnswer ? { ...answer, descricao: content } : answer))
    }
    function handleChangeTrueAnswer(idAnswer: number, isTrue: boolean,) {
        setAnswers(prev => prev.map(answer => answer.id_respostas === idAnswer ? { ...answer, correta: isTrue } : answer))
    }
    const [edit, setEdit] = useState<boolean>(false)

    const done = (idAnswer: number, value: string) => {
        setEdit(false)
        handleChangeAnswer(idAnswer, value)
    }
    const handleTypeAnswer = (idAnswer: number, type: string, isTrue: boolean) => {
        switch (type) {
            case "R": return (
                <div className="form-check">
                    <input
                        defaultValue=""
                        className="form-check-input"
                        type="radio" name={`flexRadioDefault`} id="flexRadioDefault1"
                        onChange={e => handleChangeTrueAnswer(idAnswer, e.target.checked)}
                        checked={isTrue}
                    />
                </div>
            );
            case "C": return (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        defaultValue=""
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        onChange={e => handleChangeTrueAnswer(idAnswer, e.target.checked)}
                        checked={isTrue}
                    />
                </div>)
            default: return false;
        }
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
                        <Button onClick={saveQuestion} >Salvar</Button>
                    </div>
                </div>
            </div>

            <div className="questions">

                <div id="Question" className="card shadow mb-6">
                    <div className="card-header py-3">
                        <div>
                            <h6 className="m-0 font-weight-bold text-primary" >Questão</h6>
                        </div>

                        <ButtonIcon>
                            <button ><i className="far fa-images"></i></button>
                            <button ><i className="fas fa-trash-alt"></i></button>
                            <button onClick={() => { setHiddenInfo(prev => !prev) }}><i className="fas fa-info"></i></button>
                        </ButtonIcon >

                    </div>
                    <div>
                        <div className="card-body" >
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Digite sua pergunta aqui!" id="floatingTextarea2"
                                    onChange={e => {
                                        e.target.style.height = "auto"
                                        e.target.style.height = `${e.target.scrollHeight}px`
                                        setQuestions({ ...Questions, conteudo: e.target.value })
                                    }}
                                    value={Questions.conteudo}
                                />
                                <div className="type-question">
                                    <div>
                                        <input checked={Questions.tipo_resposta === 'B'} className="form-check-input" type="radio" id="B" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`} >Breve</label>
                                    </div>
                                    <div>
                                        <input checked={Questions.tipo_resposta === 'L'} className="form-check-input" type="radio" id="L" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`} >Longa</label>
                                    </div>
                                    <div>
                                        <input checked={Questions.tipo_resposta === 'R'} className="form-check-input" type="radio" id="R" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`}  >Multipla Escolha</label>
                                    </div>
                                    <div>
                                        <input checked={Questions.tipo_resposta === 'C'} className="form-check-input" type="radio" id="C" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`} >Caixa de seleção</label>
                                    </div>
                                </div>

                                <div id="answer">
                                    {
                                        answers.map((answer, key) => (

                                            <ListAnswerDiv key={key}>
                                                {handleTypeAnswer(answer.id_respostas, Questions.tipo_resposta, answer.correta)}

                                                <AnswerInput
                                                    name={`${answer.id_respostas}`}
                                                    autoFocus
                                                    className="answer-input"
                                                    type="text"
                                                    disabled={
                                                        Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L"
                                                    }
                                                    placeholder={Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L" ? "" : "Digite a Resposta"}
                                                    onBlur={e => done(answer.id_respostas, e.target.value)}
                                                    defaultValue={Questions.tipo_resposta === "B" ? "Resposta Curta ---" : Questions.tipo_resposta === "L" ? "Resposta Longa ---------" : answer.descricao}
                                                />

                                                <ButtonIcon hidden={Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L"}>

                                                    <button onClick={() => { handleAddAnswer(answer.id_respostas, answer.descricao, Questions.tipo_resposta) }} ><i className="fas fa-plus-circle " aria-hidden="true"></i></button>
                                                    <button ><i className="far fa-images"></i></button>
                                                    <button className="button" onClick={() => handleDeleteAnswer(answer.id_respostas)}><i className="far fa-times-circle"></i></button>

                                                </ButtonIcon>
                                            </ListAnswerDiv>


                                        ))}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <QuestionInfo
                    info={Questions}
                    setInfo={setQuestions}
                    hiddenInfo={hiddenInfo}
                />
            </div>)

        </div>


    )
}