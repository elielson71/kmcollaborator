
import { CardQuestion } from '../../components/CardQuestion';
import { useHistory, useParams } from 'react-router-dom';
import { useAvaliacoes } from '../../Hooks/Avaliacao/useAvaliacoes';
import { Container, Grid, Button, MenuItem, TextField, FormControl, InputLabel, Select, Paper, InputBase, Modal } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import { MenuItens } from '../../components/MenuItens';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './style';
import { useModal } from '../../Hooks/Modal/useModal';
import { RegisterQuestion } from '../RegisterQuestion';
import { useState } from 'react';



export const CadAvaliacao = () => {
    const params = useParams<{ id: string }>()
    const avaliacaoId = params.id;
    const { avaliacao, setAvaliacao, enviarAvaliacao,
        setQuestion, deletarQuestao, departamentos, filterBusca, setBusca,RecuperandoDadosQuestions } = useAvaliacoes(avaliacaoId)
    const history = useHistory()
    const classes = useStyles();
    const { open,setOpen } = useModal()
    const [id_questions,setId_questions]=useState('')
    const handleOpen = (id:string) => {
        setOpen(true);
        setId_questions(id)
    };
    const handleClose = () => {
        setOpen(false);
        RecuperandoDadosQuestions(avaliacaoId)
    };
    return (
        <>
            <div className={classes.root}>
                <MenuItens titulo='Cadastrar Avaliacão' />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.paper}>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            fullWidth
                                            id="titulo"
                                            label="Titulo"
                                            placeholder="Digite Titulo da Avaliação"
                                            value={avaliacao.titulo}
                                            onChange={(e) => setAvaliacao({ ...avaliacao, titulo: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label='Tempo de Execução'
                                            id="tempo"
                                            className="form-control tempo"
                                            placeholder="Tem Máximo Execução"
                                            value={avaliacao.tempo}
                                            onChange={(e) => setAvaliacao({ ...avaliacao, tempo: e.target.value ? e.target.value : '00:00:00' })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>

                                        <FormControl fullWidth >
                                            <InputLabel id="departamento">Departamento</InputLabel>
                                            <Select
                                                label="Departamento"
                                                id="departamento"
                                                className={classes.selectEmpty}
                                                defaultValue=""
                                                value={`${avaliacao.id_departamento ? avaliacao.id_departamento : ''}`}
                                                onChange={(e) => { const v = e.target.value as string; setAvaliacao({ ...avaliacao, id_departamento: parseInt(v) }) }}
                                            >
                                                {departamentos.map((d, key) => (<MenuItem key={key} id="departamento" value={d.id_departamento} >{d.nome}</MenuItem>))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        <Button variant="contained" color="primary" onClick={enviarAvaliacao} startIcon={<SaveIcon />} className={classes.botoes}>Salvar</Button>
                                    </Grid>

                                    <Grid item xs={12} sm={1}>
                                        <Button variant="contained" onClick={() => history.push('/avaliacao/')} className={classes.botoes}> Voltar</Button>

                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid container spacing={2} className={classes.paper}>
                                <Grid sm={12} xs={12} className={classes.headerQuestion}>
                                    <Button variant='contained' color='primary' onClick={() => handleOpen('')}>CRIAR NOVA QUESTÃO </Button>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Pesquisar…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            onChange={e => setBusca(e.target.value)}
                                        />

                                    </div>
                                </Grid>
                                {
                                    filterBusca.map((question, key) => (
                                        <Grid item xs={12} sm={5}>
                                            <CardQuestion
                                                key={key}
                                                id_perguntas={question.id_perguntas as number}
                                                title={question.conteudo}
                                                nivel={question.nivel}
                                                departamento={question.id_departamento}
                                                deletarQuestao={deletarQuestao}
                                                handleOpen={handleOpen}
                                                nota_pergunta={question.nota_pergunta}
                                                situacao={question.situacao}
                                                setQuestions={setQuestion}
                                                id_avaliacao={parseInt(avaliacaoId)}
                                            />
                                        </Grid>
                                    )).sort(() => 1)
                                }

                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {

                    <div className={classes.principal}>
                        <RegisterQuestion id_avaliacao={avaliacaoId} questionId={id_questions} handleClose={handleClose} />

                    </div>

                }
            </Modal>
        </>
    )
};




