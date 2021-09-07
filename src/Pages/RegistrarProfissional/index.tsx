import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import { api } from '../../service/Api';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';





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
        padding: 15,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
        minWidth: 120,
    },
    selectEmpty: {
        //marginTop: theme.spacing(6),
        width: '100%',
    },
    botoes: {
        margin: 15
    }
}));

const usuario = ['elielson', 'santos']
export function RegistrarProfissional() {
    const classes = useStyles();
    const history = useHistory();


    const [nome_completo, setNome_completo] = useState('')
    const [cpf, setCpf] = useState('')
    const [endereco, setEndereco] = useState('')
    const [bairro, setBairro] = useState('')
    const [complementar, setComplementar] = useState('')
    const [data_nascimento, setData_nascimento] = useState('')
    const [telefone, setTelefone] = useState('')
    const [celular, setCelular] = useState('')
    const [cargo, setCargo] = useState('')
    const [id_departamento, setId_departamento] = useState('')
    const [nivel_senioridade, setNivel_senioridade] = useState('')
    const [id_usuario, setId_usuario] = useState('')
    useEffect(() => {
        console.log('ok')

    }, [])
    return (
        <div className={classes.root}>
            <MenuItens titulo='Profissional' />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h3>Cadastro Profissional</h3>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="nome"
                                            name="nome"
                                            label="Nome Completo"
                                            fullWidth
                                            autoComplete="given-name"
                                            value={nome_completo}
                                            onChange={e => setNome_completo(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            //required
                                            id="cpf"
                                            name="cpf"
                                            label="CPF"
                                            fullWidth
                                            autoComplete="given-name"
                                            value={cpf}
                                            onChange={e => setCpf(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel id="ativo">Data de Nascimento</InputLabel>
                                        <TextField
                                            type='date'
                                            id="data_nascimento"
                                            name="data_nascimento"
                                            fullWidth
                                            autoComplete="data_nascimento"
                                            value={data_nascimento}
                                            onChange={e => setData_nascimento(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            id="endereco"
                                            name="endereco"
                                            label="Endereco"
                                            fullWidth
                                            autoComplete="endereco"
                                            value={endereco}
                                            onChange={e => setEndereco(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            id="bairro"
                                            name="bairro"
                                            label="Bairro"
                                            fullWidth
                                            autoComplete="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="complementar"
                                            name="complementar"
                                            label="Complementar"
                                            fullWidth
                                            autoComplete="complementar"
                                            value={complementar}
                                            onChange={e => setComplementar(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            id="telefone"
                                            name="telefone"
                                            label="Telefone"
                                            fullWidth
                                            autoComplete="telefone"
                                            value={telefone}
                                            onChange={e => setTelefone(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            id="celular"
                                            name="celular"
                                            label="Celular"

                                            autoComplete="celular"
                                            value={celular}
                                            onChange={e => setCelular(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="cargo"
                                            name="cargo"
                                            label="Cargo"
                                            fullWidth
                                            autoComplete="cargo"
                                            value={cargo}
                                            onChange={e => setCargo(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel shrink id="id_departamento-label">Departamento</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.selectEmpty}
                                                label="id_departamento-label"
                                                id="id_departamento"
                                                value={id_departamento}
                                                onChange={e => { const a = e.target.value as string; setId_departamento(a) }}
                                            >
                                                <MenuItem value='S'>Departamento</MenuItem>
                                                <MenuItem value='N'>Departamento12</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel shrink id="nivel_senioridade-label">Senioridade</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.selectEmpty}
                                                label="nivel_senioridade-label"
                                                id="nivel_senioridade"
                                                value={nivel_senioridade}
                                                onChange={e => { const a = e.target.value as string; setNivel_senioridade(a) }}
                                            >
                                                <MenuItem value='J'>Junior</MenuItem>
                                                <MenuItem value='P'>Pleno</MenuItem>
                                                <MenuItem value='S'>Senior</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel shrink id="usuario-label">Usuario</InputLabel>
                                            <Select
                                                fullWidth
                                                className={classes.selectEmpty}
                                                label="usuario-label"
                                                id="usuario"
                                                value={id_usuario}
                                                onChange={e => { const a = e.target.value as string; setId_usuario(a) }}
                                            >
                                                {usuario.map((user) => (
                                                    <MenuItem key={user} value={user}>
                                                        {user}
                                                    </MenuItem>
                                                )
                                                )}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Button variant="contained" onClick={() => history.push('/profissionais')} startIcon={<ArrowBack />} className={classes.botoes}>
                                            Volta
                                        </Button>
                                        <Button variant="contained" color="primary" startIcon={<SaveIcon />} className={classes.botoes}>
                                            Salvar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

/*  id_profissional number,
  nome_completo string,
  cpf VARCHAR(13),
  endereco VARCHAR(100),
  bairro VARCHAR(50),
  complementar VARCHAR(100),
  data_nascimento DATE,
  telefone VARCHAR(20),
  celular VARCHAR(20),
  cargo VARCHAR(50),
  id_departamento INTEGER,
  nivel_senioridade VARCHAR(1) DEFAULT 'J'::character varying,
  id_usuario INTEGER,*/


/*
 id_profissional

 cpf
 endereco
 bairro
 complementar
 data_nascimento
 telefone
 celular
 cargo
 id_departamento
 nivel_senioridade
 id_usuario
 */