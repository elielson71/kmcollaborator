
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { ListAnswerLabel } from "../../components/componetsStypes";
import { useStyles } from "./style";
import { useCorrecaoAvaliacao } from '../../Hooks/CorrecaoAvaliacao/useCorrecaoAvaliacao'
import { useParams } from 'react-router-dom';

export function CorrecaoAvaliacao() {
    const classes = useStyles();
    const params = useParams<{ id: string }>()
    const correcaoId = params.id;

    const { backQuestion, nextQuestion, paginacao, itemQuestions,
        answers, setAnswers, setItemQuestions,
        respostaAberta, history, finalizar, podeFinalizar,
        dataQuestions
    } = useCorrecaoAvaliacao(parseInt(correcaoId))

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <div >
                        <Grid container spacing={3}>
                            <Grid container spacing={1}>
                                <Grid container className={classes.header}>
                                    <h5 className={classes.paper}>Questão {paginacao}</h5>

                                    <Button variant="outlined" color="primary" onClick={() => history.push('/correcao')}>x</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <h5 className={classes.contentQuestion}>{itemQuestions.conteudo}</h5>
                            </Grid>
                            <Grid item xs={12} sm={8} className={classes.contentAnswer}>
                                {itemQuestions.tipo_resposta === 'B' ?
                                    respostaAberta.map(value => (
                                        <Grid>
                                            <TextField key={value.id_respostas}
                                                placeholder='Digite sua Resposta aqui'
                                                className={classes.txtarea}
                                                value={value.descricao}
                                                onChange={e => setAnswers(prev => prev.map
                                                    (item => item.id_perguntas === itemQuestions.id_perguntas ?
                                                        { ...item, descricao: e.target.value } : item))}
                                                disabled
                                            />
                                        </Grid>
                                    ))

                                    : itemQuestions.tipo_resposta === 'L' ?
                                        respostaAberta.map(value => (<TextareaAutosize
                                            key={value.id_respostas}
                                            className={classes.txtarea}
                                            placeholder={`Digite sua Resposta aqui`}
                                            value={value.descricao}
                                            onChange={e => setAnswers(prev => prev.map
                                                (item => item.id_perguntas === itemQuestions.id_perguntas ?
                                                    { ...item, descricao: e.target.value } : item))}
                                            disabled
                                        />)) : answers.map(value => (
                                            <ListAnswerLabel key={value.id_respostas} id="flexRadioDefault1" 
                                            className={value.selecao==='S'&& value.correta==='S'?
                                            classes.Rverdeiro:value.selecao==='S'?classes.Rfalse:' '+value.correta==='S'?classes.Rverdeiro:''}
                                            >
                                                {

                                                    itemQuestions.tipo_resposta === 'R' ?
                                                        <div className="form-check">
                                                            <input
                                                                defaultValue=""
                                                                className="form-check-input"
                                                                type="radio" name='correta' id="flexRadioDefault1"
                                                                checked={value.selecao === 'S'}
                                                                disabled
                                                            />
                                                        </div>
                                                        : itemQuestions.tipo_resposta === 'C' ?
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    defaultValue=""
                                                                    type="checkbox"
                                                                    id="flexCheckIndeterminate"
                                                                    name='correta'
                                                                    onChange={e => setAnswers(prev => prev.map
                                                                        (item => item.id_respostas === value.id_respostas ?
                                                                            { ...item, correta: e.target.checked ? 'S' : 'N' } : item))}
                                                                    checked={value.selecao === 'S'}
                                                                    disabled
                                                                />
                                                            </div> : ''
                                                }
                                                <h6 >
                                                    {value.descricao}

                                                </h6>
                                            </ListAnswerLabel>))
                                }

                            </Grid>
                            <Grid item xs={12} sm={3}>

                                <Grid container className={classes.btn} >

                                    <Grid item xs={12} sm={12}>
                                        <input
                                            //label='NOTA'
                                            type='number'
                                            id="nota"
                                            className={classes.MuiInputformControl}
                                            //placeholder="Da nota a Resposta!"
                                            defaultValue={itemQuestions.nota_pergunta !== null ? itemQuestions.nota_pergunta : ''}
                                            value={itemQuestions.nota_pergunta !== null ? itemQuestions.nota_pergunta : ''}
                                            onChange={(e) => setItemQuestions({ ...itemQuestions, nota_pergunta: parseInt(e.target.value) })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >

                                        <Button color='default' variant='outlined' hidden={paginacao < 2} onClick={() => backQuestion(paginacao)}>
                                            Voltar
                                        </Button>
                                        <Button color='primary' variant='outlined' onClick={nextQuestion}>Avaliar</Button>
                                        <Button color='primary' disabled={podeFinalizar()} hidden={dataQuestions.length !== paginacao}
                                            variant='contained' onClick={finalizar}>Processar Correcao</Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </Container>


            </main>
        </div >
    )
}
