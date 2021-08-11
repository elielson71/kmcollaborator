import { useEffect, useState } from 'react';
import './styles.scss'
import { Button } from '../../components/Button';
import { ListAnswer } from '../../components/ListAnswer';
import { QuestionInfo } from '../../components/QuestionInfo';
import { Link, useHistory, useParams } from 'react-router-dom';
import { typeAnswer, typeQuestions } from '../../components/Interface'
import { postQuestions, getOneQuestions,getQuestionsAnswer } from '../../service/QuestionsService';

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
        const dataQuestion:typeQuestions = (await getOneQuestions(parseInt(id))).data
        const dataAnswer:typeAnswer[] = (await getQuestionsAnswer(parseInt(id))).data
        console.log({dataQuestion,dataAnswer})
        setQuestions(dataQuestion)
            
            setAnswers(dataAnswer)
        
    }
    useEffect(() => {
        RecuperarQuestao('321')
    }
        , [questionId])

    async function saveQuestion() {
        if (!(Questions.tipo_resposta==='B' || Questions.tipo_resposta==='L')) {
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
                    umverdadeiro = value.selectedType==="R" || value.selectedType==="C"
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
            setAnswers([{ idAnswer: countAnswer++, descricao: tipo_resposta === 'B' ? 'Breve' : tipo_resposta === 'L' ? 'Longa' : "", selectedType: tipo_resposta, isTrue: false }])
    }
    function handleAddAnswer(index: typeAnswer["idAnswer"], content: typeAnswer["descricao"], selectedType: string) {
        if ((selectedType === "R" || selectedType === "C") && content !== "") {
            const newAnswer = { idAnswer: countAnswer++, descricao: "", selectedType, isTrue: false };
            setAnswers(prev => [...prev.slice(0, index + 1), newAnswer, ...prev.slice(index + 1),])
        }

    }
    function handleDeleteAnswer(index: number) {
        setAnswers(prev => prev.filter(item => item.idAnswer !== index))
    }
    function handleChangeAnswer(idAnswer: number, content: string) {
        setAnswers(prev => prev.map(answer => answer.idAnswer === idAnswer ? { ...answer, descricao: content } : answer))
    }
    function handleChangeTrueAnswer(idAnswer: number, isTrue: boolean,) {
        setAnswers(prev => prev.map(answer => answer.idAnswer === idAnswer ? { ...answer, isTrue } : answer))
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

                        <div className="button">
                            <button ><i className="far fa-images"></i></button>
                            <button ><i className="fas fa-trash-alt"></i></button>
                            <button onClick={() => { setHiddenInfo(prev => !prev) }}><i className="fas fa-info"></i></button>
                        </div >

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
                                        <input className="form-check-input" type="radio" id="B" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`} >Breve</label>
                                    </div>
                                    <div>
                                        <input className="form-check-input" type="radio" id="L" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`} >Longa</label>
                                    </div>
                                    <div>
                                        <input className="form-check-input" type="radio" id="R" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`}  >Multipla Escolha</label>
                                    </div>
                                    <div>
                                        <input className="form-check-input" type="radio" id="C" onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }} name={`radio`} />
                                        <label className="form-check-label" htmlFor={`radio`} >Caixa de seleção</label>
                                    </div>
                                </div>

                                <div id="answer">
                                    {
                                        answers.map((answer, key) => (
                                            
                                                <ListAnswer
                                                key={key}
                                                    answer={answer}
                                                    setAnswer={setAnswers}
                                                    typeQuestions={Questions.tipo_resposta}
                                                    handleAddAnswer={handleAddAnswer}
                                                    handleDeleteAnswer={handleDeleteAnswer}
                                                    handleChangeAnswer={handleChangeAnswer}
                                                    handleChangeTrueAnswer={handleChangeTrueAnswer}
                                                />
                                            
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