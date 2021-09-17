
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { ListAnswerLabel } from "../../components/componetsStypes";

import { useStyles } from "./style";
import { useRealizarAvaliacao } from '../../Hooks/RealizarAvaliacao/useRealizarAvaliacao'


type props = {
    avaliacaoId: string
}

export function RealizarAvaliacao({ avaliacaoId }: props) {

    const classes = useStyles();
    const { backQuestion, nextQuestion, paginacao, itemQuestions, 
        dataQuestions, handleIsTrue, answers, setAnswers, 
         statusAtividade, setStatusAtividade,avaliacao,
     } = useRealizarAvaliacao(parseInt(avaliacaoId))


    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    {statusAtividade === 'N' ?
                        <div className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h1>{avaliacao.titulo}</h1>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    Testo explicativo
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='contained' color='primary' onClick={()=>setStatusAtividade('I')}>Iniciar a Avaliação</Button>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <h5 className={classes.paper}>Questão {paginacao}</h5>
                                </Grid>
                                <Grid item xs={6}>
                                </Grid>
                                <Grid item xs={3}>
                                    <div className={classes.paper}>
                                        <h5 >{`Tempo de Termino${avaliacaoId}`}</h5>
                                        <h4>{`12: 00: 11`}</h4>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <h5 className={classes.contentQuestion}>{itemQuestions.conteudo}</h5>
                                </Grid>
                                <Grid item xs={12} sm={8} className={classes.contentAnswer}>
                                    {itemQuestions.tipo_resposta === 'B' ?
                                        <TextField placeholder='Digite sua Resposta aqui'
                                            className={classes.txtarea}
                                        /* onChange={e => handleAddAnswer(e, e.target.value, 'B', itemQuestions.id_perguntas)}
                                     //value={answer()}*/
                                        />
                                        : itemQuestions.tipo_resposta === 'L' ? <TextareaAutosize
                                            className={classes.txtarea}
                                            placeholder={`Digite sua Resposta aqui`}
                                        /*onChange={e => {
                                            e.target.style.height = "auto"
                                            e.target.style.height = `${e.target.scrollHeight}px`
                                            handleAddAnswer(e, e.target.value, 'B', itemQuestions.id_perguntas)
                                        }}
                                   // value={answer()}*/
                                        /> : answers.map(value => (
                                            <ListAnswerLabel id="flexRadioDefault1">
                                                {
                                                    itemQuestions.tipo_resposta === 'R' ?
                                                        <div className="form-check">
                                                            <input
                                                                defaultValue=""
                                                                className="form-check-input"
                                                                type="radio" name='correta' id="flexRadioDefault1"
                                                                onChange={(e) => handleIsTrue(value.id_respostas)}
                                                                checked={value.correta === 'S'}
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
                                                                    onChange={e => setAnswers(prev => prev.map(item => item.id_respostas === value.id_respostas ? { ...item, correta: e.target.checked ? 'S' : 'N' } : item))}
                                                                    checked={value.correta === 'S'}
                                                                />
                                                            </div> : ''
                                                }
                                                <h6>
                                                    {value.descricao}

                                                </h6>
                                            </ListAnswerLabel>))
                                    }
                                </Grid>
                                <Grid item xs={12} sm={3} className={classes.btn}>

                                    <Button color='default' variant='outlined' hidden={paginacao < 2} onClick={() => backQuestion(paginacao)}>
                                        Voltar
                                    </Button>
                                    <Button color='primary' variant='outlined' hidden={dataQuestions.length === paginacao} onClick={nextQuestion}>Responder</Button>
                                    <Button color='primary' variant='contained' hidden={dataQuestions.length !== paginacao} onClick={nextQuestion}>Finalizar</Button>

                                </Grid>

                            </Grid>
                        </div>}
                </Container>
            </main>
        </div >
    )
}
