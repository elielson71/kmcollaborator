
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
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from './style';
import { useUsuario } from '../../Hooks/Usuario/useUsuario';
import { useGrupo } from '../../Hooks/Grupo/useGrupo';
import { useParams } from 'react-router-dom';
import { validarEmail } from '../../functions/validarEmail';
import { ButtonGroup } from '@material-ui/core';
import { useRef, useState } from 'react';

type typeparams = {
  id: string
}

export function RegistrarUsuario() {
  const classes = useStyles();
  const parms = useParams<typeparams>();
  const id_usuario = parms.id
  const { login, setLogin, senha, setSenha, nome,
    setNome, administrador, setAdministrador,
    email, setEmail, history, handleSubmint } = useUsuario(id_usuario)

  const { grupos } = useGrupo('')
  const [grupo, setGrupo] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
function focusEmail (){
  emailRef.current?.focus()
}
  return (
    <div className={classes.root}>
      <MenuItens titulo='Usuario' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h3>Formulario de Usuario</h3>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      id="login"
                      name="login"
                      label="Login"
                      fullWidth
                      autoComplete="given-name"
                      value={login}
                      onChange={e => setLogin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="senha"
                      name="senha"
                      label="senha"
                      type="password"
                      fullWidth
                      autoComplete="given-name"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="grupo-label">Administrador</InputLabel>
                      <Select
                        labelId="grupo-label"
                        id="administrador"
                        value={administrador}
                        onChange={e => { const a = e.target.value as string; setAdministrador(a) }}
                      >
                        <MenuItem value='S'>Sim</MenuItem>
                        <MenuItem value='N'>Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome_completo"
                      name="nome_completo"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome_completo"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      ref={emailRef}
                      onChange={e => setEmail(e.target.value)}
                      onBlur={e => validarEmail(e.target.value,focusEmail)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} >
                  <Grid container alignItems='flex-end'  direction='row'>
                    <Grid item xs={12} sm={5}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="grupo-label" >Grupo</InputLabel>
                        <Select fullWidth labelId="grupo-label" id="grupo"
                          value={grupo}
                          onChange={e => setGrupo(e.target.value as string)}>
                          {grupos.map((g) => (
                            <MenuItem id="grupo" key={g.id_grupo}
                              value={g.id_grupo}>{g.nome}</MenuItem>
                          ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Button variant='contained' color='primary' onClick={() => { }}>Adicionar</Button>

                    </Grid>
                  </Grid>
                  </Grid>

                  <Grid item xs={12} sm={8} >
                    <TableContainer component={Paper} hidden={id_usuario === 'new'}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead className={classes.tablehead}>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {grupos.map((grupo, key) => (
                            <TableRow key={grupo.id_grupo}>
                              <TableCell component="th" scope="grupo">
                                {key + 1}</TableCell>
                              <TableCell align="center">{grupo.nome}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup arial-label=''>
                                  <Button color='secondary' onClick={() => alert('excluir')}>Delete</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12} sm={12} >
                    <Button variant="contained" onClick={() => history.push('/usuario')} startIcon={<ArrowBack />} className={classes.botoes}>
                      Volta
                    </Button>
                    <Button variant="contained" color="primary" onClick={()=>handleSubmint(focusEmail)} startIcon={<SaveIcon />} className={classes.botoes}>
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
  );
}

