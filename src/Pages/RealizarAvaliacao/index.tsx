import { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
//import { Avaliacao } from "../../components/Avaliacao/";
import { typeAnswer, typeQuestions } from "../../components/Interface";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import SearchIcon from '@material-ui/icons/Search'


import Button from "@material-ui/core/Button";
import { Card, CardHeader, CardContent, Typography, Paper, TextField, TextareaAutosize } from "@material-ui/core";
import { AnswerInput, ButtonIcon, ListAnswerDiv } from "../../components/componetsStypes";
import { getOneQuestions, getQuestionsAnswer } from "../../service/QuestionsService";




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxHeight:800,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    content: {
        display: 'flex',
        justifyContent: 'center',
        
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        
    },
    contentQuestion: {
        textAlign: 'center',
        borderStyle: 'groove',
        borderRadius: 10,
        padding: 20,
        margin: '0px 100px 0px 100px',
        overflow:'auto',
        
    },
    contentAnswer: {
        margin: '0px 0px 0px 100px',

    },
    txtarea: {
        borderColor: '#fff',
        borderBottomColor: '#b3b2b2',
        padding: 30,
        width: '100%',
        overflowY: 'hidden',
        marginBottom: '1%',
    },
    btn: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 20

    }




}));


export function RealizarAvaliacao() {
    const classes = useStyles();
    const [answers, setAnswers] = useState<typeAnswer[]>([])
    const [Questions, setQuestions] = useState<typeQuestions>({ conteudo: '', tipo_resposta: '', id_departamento: 0, senioridade: '', nivel: 'F', id_responsavel: 0 })

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
        RecuperarQuestao('70')
    }
        , [])


    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <div className={classes.root}>
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <h5 className={classes.paper}>Questão 1</h5>
                                </Grid>
                                <Grid item xs={6}>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className={classes.paper}>
                                        <h5 >{`Tempo de Termino \n`}</h5>
                                        <h4>{`12: 00: 11`}</h4>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <h4 className={classes.contentQuestion}>{Questions.conteudo}</h4>
                                </Grid>
                                <Grid item xs={12} sm={8} className={classes.contentAnswer}>
                                    {Questions.tipo_resposta === 'B' ? <TextField placeholder='Digite sua Resposta aqui'
                                        className={classes.txtarea}
                                    />
                                        : Questions.tipo_resposta === 'L' ? <TextareaAutosize
                                            className={classes.txtarea}
                                            placeholder={`Digite sua Resposta aqui`}
                                            onChange={e => {
                                                e.target.style.height = "auto"
                                                e.target.style.height = `${e.target.scrollHeight}px`
                                            }} /> : answers.map(value => (
                                                <ListAnswerDiv>
                                                    {
                                                        Questions.tipo_resposta === 'R' ?
                                                            <div className="form-check">
                                                                <input
                                                                    defaultValue=""
                                                                    className="form-check-input"
                                                                    type="radio" name='correta' id="flexRadioDefault1"
                                                                    //onChange={(e) => handleIsTrue(value.id_respostas)}
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
                                                </ListAnswerDiv>))
                                    }
                                </Grid>
                                <Grid item xs={12} sm={3} className={classes.btn}>
                                    <Button color='default' variant='outlined'>Voltar</Button>
                                    <Button color='primary' variant='outlined'>Responder</Button>
                                </Grid>

                            </Grid>

                        </div>
                    </div>
                </Container>
            </main>
        </div >
    )
}