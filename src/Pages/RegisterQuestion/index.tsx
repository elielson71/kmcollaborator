import './styles.scss'
import { AnswerInput, ButtonIcon, ListAnswerDiv } from "../../components/componetsStypes";
import { QuestionInfo } from "../../components/QuestionInfo";
import {  useParams } from "react-router-dom";

import { Radio, Container, Grid, Button, Card, CardHeader, CardContent,  RadioGroup, FormControlLabel } from '@material-ui/core/';
import { MenuItens } from "../../components/MenuItens";
import {  Save } from "@material-ui/icons";
import { useQuestion } from '../../Hooks/Question/useQuestion';
import { useStyles } from './styles';

type QuestionParams = {
    id: string
}
export function RegisterQuestion() {
    const params = useParams<QuestionParams>()
    const questionId = params.id;
    const { sendQuestion, handleAddAnswer, handleDeleteAnswer, handleIsTrue,
        descriptionAnswer, setDescriptionAnswer, handleChangeTypeListCard,
        Questions, setQuestions, answers, setAnswers, hiddenInfo,
        setHiddenInfo, history } = useQuestion(questionId);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuItens titulo='Cadastrar Questão' />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        
                    <Grid container  justifyContent='flex-end' sm={12}>
                        <Button variant='contained' color='primary' startIcon={<Save />} onClick={sendQuestion} >Salvar</Button>
                        <Button onClick={() => history.push('/avaliacao/new')} variant='outlined' className='btn btn-seccundary' >Voltar</Button>
                    </Grid>
                        <Grid item xs={12} sm={hiddenInfo?12:8}>
                            <Card>
                                <CardHeader
                                    title='Questão'
                                    action={
                                        <ButtonIcon>
                                            <button ><i className="far fa-images"></i></button>
                                            <button ><i className="fas fa-trash-alt"></i></button>
                                            <button onClick={() => { setHiddenInfo(prev => !prev) }}><i className="fas fa-info"></i></button>
                                        </ButtonIcon >
                                    }
                                />

                                <CardContent>
                                    <Grid item xs={12} sm={12}>
                                        <Grid item xs={12} sm={12}>
                                            <textarea className="form-control" placeholder="Digite sua pergunta aqui!" id="floatingTextarea2"
                                                onChange={e => {
                                                    e.target.style.height = "auto"
                                                    e.target.style.height = `${e.target.scrollHeight}px`
                                                    setQuestions({ ...Questions, conteudo: e.target.value })
                                                }}
                                                value={Questions.conteudo}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} className={classes.typeQuestion}>
                                            <RadioGroup row aria-label="gender" className={classes.typeQuestion} name="row-radio-buttons-group">
                                                <FormControlLabel label="Breve" control={
                                                    <Radio id="B"
                                                        checked={Questions.tipo_resposta === 'B'}
                                                        onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }}
                                                    />
                                                } />
                                                <FormControlLabel label="Longa" control={
                                                    <Radio id="L"
                                                        checked={Questions.tipo_resposta === 'L'}
                                                        onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }}
                                                    />
                                                } />
                                                <FormControlLabel label="Multiplas Escolhas" control={
                                                    <Radio id="R"
                                                        checked={Questions.tipo_resposta === 'R'}
                                                        onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }}
                                                    />
                                                } />
                                                <FormControlLabel label="Caixa de seleção" control={
                                                    <Radio id="C"
                                                        checked={Questions.tipo_resposta === 'C'}
                                                        onChange={e => { if (e.target.checked) { handleChangeTypeListCard(e.target.id) } }}
                                                    />
                                                } />
                                            </RadioGroup>

                                        </Grid>


                                        <Grid item xs={12} sm={12}>
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
                                        </Grid>
                                        {answers.map(value => (
                                            <ListAnswerDiv>
                                                {
                                                    Questions.tipo_resposta === 'R' ?
                                                        <div className="form-check">
                                                            <input
                                                                defaultValue=""
                                                                className="form-check-input"
                                                                type="radio" name='correta' id="flexRadioDefault1"
                                                                onChange={(e) => handleIsTrue(value.id_respostas?value.id_respostas:0)}
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
                                                    <button className="button" onClick={() => handleDeleteAnswer(value.id_respostas?value.id_respostas:0,value.id_respostas?value.id_respostas:0)}><i className="far fa-times-circle"></i></button>
                                                </ButtonIcon>
                                            </ListAnswerDiv>))
                                        }

                                    </Grid>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <QuestionInfo
                                info={Questions}
                                setInfo={setQuestions}
                                hiddenInfo={hiddenInfo}
                            />
                        </Grid>

                </Grid>
            </Container>
        </main>
        </div >
    )
}


