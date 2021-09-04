import { FormEvent, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { AnswerInput, ButtonIcon, ListAnswerDiv } from "../../components/componetsStypes";
import { typeAnswer, typeQuestions } from "../../components/Interface";
import { QuestionInfo } from "../../components/QuestionInfo";
import { getOneQuestions, getQuestionsAnswer, postQuestions, putQuestionsAnswer } from "../../service/QuestionsService";
import './styles.scss'
import { ValidQuestion } from "../../Hooks/Question/ValidQuestion";
import { deleteAnswer, postAnswer } from "../../service/AnswerService";
type QuestionParams = {
    id: string
}
let countAnswer = 1;
export function RegisterQuestion() {
    const [Questions, setQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_departamento: 0, senioridade: '', nivel: 'F', id_responsavel: 0 })
    const [answers, setAnswers] = useState<typeAnswer[]>([])
    const [hiddenInfo, setHiddenInfo] = useState<boolean>(false)
    const history = useHistory()

    if (!(Questions.tipo_resposta === 'B' || Questions.tipo_resposta === 'L')) {
        const resp = {} as any
        answers.forEach(function (ans, index) {
            resp[index] = ans as any
        })
        Questions['answers'] = resp
    }

    async function saveQuestion() {
        if (ValidQuestion(Questions, answers)) {
            const resp = postQuestions(Questions)
            if (await resp) {
                alert("Questões Salvas com Sucesso!")
                history.push('/avaliacao/new')
            } else {
                alert("Erro ao Salvar Questões!")
                console.error(resp)
            }
        }
    }
    async function updateQuestion() {
        if (ValidQuestion(Questions, answers)) {
            const answerNew = answers.filter(answer => answer.status === 'AB')
            if (answerNew.length !== 0)
                postAnswer(answerNew)
            const resp = putQuestionsAnswer(parseInt(questionId), Questions)
            if (await resp) {
                alert("Questões atualizadas com Sucesso!")
                history.push('/avaliacao/new')
            } else {
                alert("Erro ao atualizar Questões!")
                console.error(resp)

            }

        }

    }

    const params = useParams<QuestionParams>()
    const questionId = params.id;
    async function RecuperarQuestao(id: string) {
        const dataQuestion: typeQuestions[] = (await getOneQuestions(parseInt(id))).data
        const dataAnswer: typeAnswer[] = (await getQuestionsAnswer(parseInt(id))).data
        dataQuestion.map(value => {
            setQuestions(value)
            return null
        })
        setAnswers(dataAnswer)
    }
    useEffect(() => {
        RecuperarQuestao(questionId)
    }
        , [questionId])

    function handleChangeTypeListCard(tipo_resposta: string) {
        setQuestions({ ...Questions, tipo_resposta })
        if ((tipo_resposta === 'B' || tipo_resposta === 'L') && answers.length !== 0)
            setAnswers([])
        else
            setAnswers(prev => prev.map(item => ({ ...item, correta: 'N' })))
    }

    const [descriptionAnswer, setDescriptionAnswer] = useState<string>('')

    function handleAddAnswer(e: FormEvent, descriptionAnswer: string, selectedType: string, id_perguntas?: number) {
        e.preventDefault();
        if ((selectedType === "R" || selectedType === "C") && descriptionAnswer !== "") {
            const newAnswer: typeAnswer = { correta: 'N', descricao: descriptionAnswer, id_respostas: countAnswer++, id_perguntas, status: 'AB' }
            setAnswers([...answers, newAnswer])
        }
        setDescriptionAnswer('')
    }

    async function handleDeleteAnswer(index: number, id_resposta: number) {
        if (index !== undefined) {
            if (id_resposta !== undefined) {
                if (await deleteAnswer(id_resposta))
                    setAnswers(prev => prev.filter(item => item.id_respostas !== index))
            } else {
                setAnswers(prev => prev.filter(item => item.id_respostas !== index))
            }
        }
    }
    function handleIsTrue(id_respostas: number) {
        setAnswers(prev => prev.map(item => item.id_respostas === id_respostas ? { ...item, correta: 'S' } : item))
        setAnswers(prev => prev.map(item => item.id_respostas !== id_respostas ? { ...item, correta: 'N' } : item))
    }
    function sendQuestion() {
        if (questionId === 'new')
            saveQuestion()
        else if (questionId !== '')
            updateQuestion()
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
                        <Button onClick={sendQuestion} >Salvar</Button>
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

                                <form onSubmit={(e) => handleAddAnswer(e, descriptionAnswer, Questions.tipo_resposta, Questions.id_perguntas)} id="answer">
                                    <ListAnswerDiv>
                                        <AnswerInput
                                            name="descricao"
                                            autoFocus
                                            type="text"
                                            disabled={
                                                Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L"
                                            }
                                            placeholder={Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L" ? "" : "Digite a Resposta"}
                                            onChange={(e) => setDescriptionAnswer(e.target.value)}
                                            //onBlur={e => done(answer.id_respostas, e.target.value)}
                                            value={Questions.tipo_resposta === "B" ? "Resposta Curta ---" : Questions.tipo_resposta === "L" ? "Resposta Longa ---------" : descriptionAnswer}
                                        />
                                        <ButtonIcon hidden={Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L"}>
                                            <button type="submit" ><i className="fas fa-plus-circle " aria-hidden="true"></i></button>
                                            <button ><i className="far fa-images"></i></button>
                                            <button type="reset"><i className="far fa-times-circle"></i></button>
                                        </ButtonIcon>
                                    </ListAnswerDiv>
                                </form>
                                {answers.map(value => (
                                    <ListAnswerDiv>
                                        {
                                            Questions.tipo_resposta === 'R' ?
                                                <div className="form-check">
                                                    <input
                                                        defaultValue=""
                                                        className="form-check-input"
                                                        type="radio" name='correta' id="flexRadioDefault1"
                                                        onChange={(e) => handleIsTrue(value.id_respostas)}
                                                        checked={value.correta === 'S'}
                                                    />
                                                </div>
                                                : Questions.tipo_resposta === 'C' ?
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            defaultValue=""
                                                            type="checkbox"
                                                            id="flexCheckIndeterminate"
                                                            name='correta'
                                                            onChange={e => setAnswers(prev => prev.map(item => item.id_respostas === value.id_respostas ? { ...item, correta: e.target.checked ? 'S' : 'N' } : item))}
                                                            checked={value.correta === 'S'}
                                                        />
                                                    </div> : ''
                                        }
                                        <AnswerInput
                                            type="text"
                                            value={value.descricao}
                                            onChange={e => setAnswers(prev => prev.map(item => item.id_respostas === value.id_respostas ? { ...item, descricao: e.target.value } : item))}
                                        />
                                        <ButtonIcon hidden={Questions.tipo_resposta === "B" || Questions.tipo_resposta === "L"}>
                                            <button ><i className="far fa-images"></i></button>
                                            <button className="button" onClick={() => handleDeleteAnswer(value.id_respostas,value.id_respostas,)}><i className="far fa-times-circle"></i></button>
                                        </ButtonIcon>
                                    </ListAnswerDiv>))
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <QuestionInfo
                    info={Questions}
                    setInfo={setQuestions}
                    hiddenInfo={hiddenInfo}
                />
            </div>
        </div>
    )
}


