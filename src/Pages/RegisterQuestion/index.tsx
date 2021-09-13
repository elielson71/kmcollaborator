import './styles.scss'
import { AnswerInput, ButtonIcon, ListAnswerDiv } from "../../components/componetsStypes";
import { QuestionInfo } from "../../components/QuestionInfo";
import { Link, useHistory, useParams } from "react-router-dom";

import { Container, Grid, Button,makeStyles} from '@material-ui/core/';
import { MenuItens } from "../../components/MenuItens";
import { Save } from "@material-ui/icons";
import { useQuestion } from '../../Hooks/Question/useQuestion';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-evenly',
        //overflow: 'auto',

    },
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 250,

    },
    selectEmpty: {
        marginTop: theme.spacing(6),

        //width: '100%',
    },
    botoes: {
        margin: 10
    },
    textField: {

        width: '100%',
    }
}));
type QuestionParams = {
    id: string
}
export function RegisterQuestion() {
    const params = useParams<QuestionParams>()
    const questionId = params.id;
    const {sendQuestion,handleAddAnswer,handleDeleteAnswer,handleIsTrue,
        descriptionAnswer,setDescriptionAnswer,handleChangeTypeListCard,
        Questions,setQuestions,answers, setAnswers,hiddenInfo, 
        setHiddenInfo,departamentos}=useQuestion(questionId);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuItens titulo='Cadastrar Questão' />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <div id="register-question">
                            <div className="container">
                                <div className="row">
                                    <div className="col-2" id="btn">

                                    </div>
                                    <div className="col-4" id="btn">
                                        <Link to='/avaliacao/new'><button className='btn btn-seccundary' >Voltar</button></Link>
                                        <Button variant='contained' color='primary' startIcon={<Save/>} onClick={sendQuestion} >Salvar</Button>
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
                                                            <button className="button" onClick={() => handleDeleteAnswer(value.id_respostas, value.id_respostas,)}><i className="far fa-times-circle"></i></button>
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
                    </Grid>
                </Container>
            </main>
        </div >
    )
}


