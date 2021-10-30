
import { MenuItens } from '../../components/MenuItens';
import { Copyright } from '../../components/Footer';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Container, Grid, Box, Button, MenuItem, TextField, FormControl, InputLabel, Select, Paper } from '@material-ui/core/';
import { useParams } from 'react-router-dom'
import { useStyles } from './style';
import { useProfissional } from '../../Hooks/Profissional/useProfissional';
import { validarCpf } from '../../functions/validarCpf';
import { mascararNumeros } from '../../functions/mascararNumeros';
type params = {
    id: string
}

export function RegistrarProfissional() {
    const classes = useStyles();
    const params = useParams<params>()
    const id_profissional = params.id
    const { departamentos, profissional, setProfissional,
        history, handleSubmint, allUsuario } = useProfissional(id_profissional)
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
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            required
                                            id="nome"
                                            name="nome"
                                            label="Nome Completo"
                                            fullWidth
                                            autoComplete="given-name"
                                            value={profissional.nome_completo}
                                            onChange={e => setProfissional({ ...profissional, nome_completo: e.target.value })}
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
                                            value={profissional.cpf}
                                            onBlur={(e) => setProfissional({ ...profissional, cpf: validarCpf(e.target.value) })}
                                            onChange={e => setProfissional({ ...profissional, cpf: e.target.value })}
                                        />
                                    </Grid>
                                    {/*<Grid item xs={12} sm={2}>
                                        <InputLabel id="data_nascimento">Data de Nascimento</InputLabel>
                                        <TextField
                                            type='date'
                                            id="data_nascimento"
                                            name="data_nascimento"
                                            fullWidth
                                            autoComplete="data_nascimento"
                                            value={profissional.data_nascimento}
                                            defaultValue={profissional.data_nascimento}
                                            onChange={e =>setProfissional({...profissional,data_nascimento:e.target.value })}
                                        />
                                    </*Grid>*/}

                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            id="endereco"
                                            name="endereco"
                                            label="Endereco"
                                            fullWidth
                                            autoComplete="endereco"
                                            value={profissional.endereco}
                                            onChange={e => setProfissional({ ...profissional, endereco: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            id="bairro"
                                            name="bairro"
                                            label="Bairro"
                                            fullWidth
                                            autoComplete="bairro"
                                            value={profissional.bairro}
                                            onChange={e => setProfissional({ ...profissional, bairro: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="complementar"
                                            name="complementar"
                                            label="Complementar"
                                            fullWidth
                                            autoComplete="complementar"
                                            value={profissional.complementar}
                                            onChange={e => setProfissional({ ...profissional, complementar: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            id="telefone"
                                            name="telefone"
                                            label="Telefone"
                                            fullWidth
                                            autoComplete="telefone"
                                            value={profissional.telefone}
                                            onBlur={(e) => setProfissional({ ...profissional, telefone: mascararNumeros(e.target.value) })}
                                            onChange={e => setProfissional({ ...profissional, telefone: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            id="celular"
                                            name="celular"
                                            label="Celular"

                                            autoComplete="celular"
                                            value={profissional.celular}
                                            onChange={e => setProfissional({ ...profissional, celular: e.target.value })}
                                            onBlur={(e) => setProfissional({ ...profissional, celular: mascararNumeros(e.target.value) })}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="cargo"
                                            name="cargo"
                                            label="Cargo"
                                            fullWidth
                                            autoComplete="cargo"
                                            value={profissional.cargo}
                                            onChange={e => setProfissional({ ...profissional, cargo: e.target.value })}
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
                                                value={profissional.id_departamento}
                                                onChange={e => { const a = e.target.value as number; setProfissional({ ...profissional, id_departamento: a }) }}
                                            >

                                                <MenuItem id="departamento">
                                                    </MenuItem>
                                                {departamentos.map(d => (
                                                    <MenuItem id="departamento" value={d.id_departamento} >
                                                        {d.nome}
                                                    </MenuItem>))}
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
                                                value={profissional.nivel_senioridade}
                                                onChange={e => { const a = e.target.value as string; setProfissional({ ...profissional, nivel_senioridade: a }) }}
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
                                                value={profissional.id_usuario}
                                                onChange={e => { const a = e.target.value as number; setProfissional({ ...profissional, id_usuario: a }) }}
                                            >

                                                {allUsuario.map((user) => (
                                                    <MenuItem key={user.id_usuario} id="usuario" value={user.id_usuario}>
                                                        {user.login}
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
                                        <Button variant="contained" color="primary" onClick={handleSubmint}
                                            startIcon={<SaveIcon />} className={classes.botoes}>
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
