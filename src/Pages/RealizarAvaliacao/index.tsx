
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { ListAnswerLabel } from "../../components/componetsStypes";
import { useStyles } from "./style";
import { useRealizarAvaliacao } from '../../Hooks/RealizarAvaliacao/useRealizarAvaliacao'
import Temporarizador, { FormRef } from '../../components/Temporizador';
import { useRef } from 'react';

type props = {
    avaliacaoId: string
}

export function RealizarAvaliacao({ avaliacaoId }: props) {
    const classes = useStyles();

    const { backQuestion, nextQuestion, paginacao, itemQuestions,
        dataQuestions, answers, setAnswers,
        statusAtividade, setStatusAtividade, avaliacao,
        finalizar, handleIsTrue, respostaAberta, tempo,
        podeFinalizar
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
                                    <Grid container alignContent='center' justifyContent='center'>
                                        <div className={classes.msg}><h4>
                                            Realize a atividade respondendo as questões e 
                                            clicando no botão <b>Responder</b>, apenas 
                                            na ultima pergunta aparecerá o botão <b>Finalizar </b> 
                                            para concluír.<br/><br /> Fique atento ao tempo determidado ao finaliza esse a avaliação concluirá
                                            automaticamente. <br /> <br /> O tempo para realizar essa avaliação é de {tempo}
                                            <br /> <br /> <br />Boa Avaliação!</h4></div>
                                            
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='contained' color='primary' onClick={() => { setStatusAtividade('I'); }}>Iniciar a Avaliação</Button>
                                </Grid>
                            </Grid>
                        </div>
                        : statusAtividade === 'I' ?
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <h5 className={classes.paper}>Questão{paginacao}</h5>
                                    </Grid>
                                    <Grid item xs={6}>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className={classes.paper}>
                                            <h5 >{`Tempo de Termino`}</h5>
                                            <br />
                                            <Temporarizador quandoStop={finalizar} tempo={tempo} />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <h5 className={classes.contentQuestion}>{itemQuestions.conteudo}</h5>
                                    </Grid>
                                    <Grid item xs={12} sm={8} className={classes.contentAnswer}>
                                        {itemQuestions.tipo_resposta === 'B' ?
                                            respostaAberta.map(value => (
                                                <TextField key={value.id_respostas}
                                                    placeholder='Digite sua Resposta aqui'
                                                    className={classes.txtarea}
                                                    value={value.descricao}
                                                    onChange={e => setAnswers(prev => prev.map
                                                        (item => item.id_perguntas === itemQuestions.id_perguntas ?
                                                            { ...item, descricao: e.target.value } : item))}
                                                />))
                                            : itemQuestions.tipo_resposta === 'L' ?
                                                respostaAberta.map(value => (<TextareaAutosize
                                                    key={value.id_respostas}
                                                    className={classes.txtarea}
                                                    placeholder={`Digite sua Resposta aqui`}
                                                    value={value.descricao}
                                                    onChange={e => setAnswers(prev => prev.map
                                                        (item => item.id_perguntas === itemQuestions.id_perguntas ?
                                                            { ...item, descricao: e.target.value } : item))}

                                                />)) : answers.map(value => (
                                                    <ListAnswerLabel key={value.id_respostas} id="flexRadioDefault1">
                                                        {

                                                            itemQuestions.tipo_resposta === 'R' ?
                                                                <div className="form-check">
                                                                    <input
                                                                        defaultValue=""
                                                                        className="form-check-input"
                                                                        type="radio" name='correta' id="flexRadioDefault1"
                                                                        onChange={(e) => handleIsTrue(value.id_respostas ? value.id_respostas : 0)}
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
                                                                            onChange={e => setAnswers(prev => prev.map
                                                                                (item => item.id_respostas === value.id_respostas ?
                                                                                    { ...item, correta: e.target.checked ? 'S' : 'N' } : item))}
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
                                        <Button color='primary' variant='outlined' onClick={nextQuestion}>Responder</Button>
                                        <Button color='primary' variant='contained' disabled={podeFinalizar()} hidden={dataQuestions.length !== paginacao} onClick={finalizar}>Finalizar</Button>

                                    </Grid>

                                </Grid>
                            </div>
                            : statusAtividade === 'F' &&
                            <Grid container className={classes.paper} alignContent="center">
                                <Grid item sm={12} xl={12}>
                                    <h1>Avialiação concluida</h1>
                                    <br/>
                                    <Grid container justifyContent="center">
                                    <div className={classes.msg}><h3> Aguarde a correção da Avaliação e acompanhe seu desempenho pela tela de <b>Dashboard</b>!</h3></div>
                                    </Grid>
                                </Grid>
                            </Grid>
                    }
                </Container>
            </main>
        </div >
    )
}
